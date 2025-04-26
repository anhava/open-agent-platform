/**
 * -------------------------------------------------------
 * Section: Orders
 * We create the schema for the subscription items. Subscription items are the items in a subscription.
 * For example, a subscription might have a subscription item with the product ID 'prod_123' and the variant ID 'var_123'.
 * -------------------------------------------------------
 */

/*
 * -------------------------------------------------------
 * Osa: Tilaukset (Kertaluontoiset) / Maksutapahtumat
 * Määrittelee kertaluontoiset tilaukset tai maksutapahtumat, jotka liittyvät tileihin.
 * Esimerkiksi lisäominaisuuksien ostot tai manuaaliset laskut.
 * -------------------------------------------------------
 */

create table if not exists
  public.orders (
    id text not null primary key,
    account_id uuid references public.accounts (id) on delete cascade not null,
    billing_customer_id uuid references public.billing_customers (id) on delete set null,
    status public.payment_status not null,
    billing_provider public.billing_provider not null,
    total_amount numeric not null check (total_amount >= 0),
    currency varchar(3) not null,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null,
    created_by uuid references auth.users (id) on delete set null,
    updated_by uuid references auth.users (id) on delete set null
  );

comment on table public.orders is 'Kertaluontoiset tilaukset tai maksutapahtumat tileille.';

comment on column public.orders.id is 'Tilauksen/maksun tunniste ulkoisessa laskutusjärjestelmässä.';

comment on column public.orders.account_id is 'Tili, johon tilaus liittyy.';

comment on column public.orders.billing_customer_id is 'Viittaus laskutusasiakkaaseen public.billing_customers-taulussa.';

comment on column public.orders.status is 'Tilauksen/maksun tila.';

comment on column public.orders.billing_provider is 'Laskutusjärjestelmän tarjoaja.';

comment on column public.orders.total_amount is 'Tilauksen/maksun kokonaissumma.';

comment on column public.orders.currency is 'Valuutta (esim. EUR, USD).';

-- Revoke all access to orders table for authenticated users and service_role
revoke all on public.orders
from
  authenticated,
  service_role;

-- Open up access to orders table for authenticated users and service_role
grant
select
  on table public.orders to authenticated;

grant
select
,
  insert,
update,
delete on table public.orders to service_role;

-- Indexes
-- Indexes on the orders table
create index ix_orders_account_id on public.orders (account_id);
create index ix_orders_billing_customer_id on public.orders (billing_customer_id);

-- RLS
alter table public.orders enable row level security;

-- SELECT(orders)
-- Users can read orders on an account they are a member of or the account is their own
create policy orders_read_self on public.orders for
select
  to authenticated using (
    (
      account_id = (
        select
          auth.uid ()
      )
      and public.is_set ('enable_account_billing')
    )
    or (
      has_role_on_account (account_id)
      and public.is_set ('enable_team_account_billing')
    )
  );

/**
 * -------------------------------------------------------
 * Section: Order Items
 * We create the schema for the order items. Order items are the items in an order.
 * -------------------------------------------------------
 */
create table if not exists
  public.order_items (
    id text not null primary key,
    order_id text references public.orders (id) on delete cascade not null,
    product_id text not null,
    variant_id text not null,
    price_amount numeric check (price_amount >= 0),
    quantity integer not null default 1 check (quantity > 0),
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null,
    created_by uuid references auth.users (id) on delete set null,
    updated_by uuid references auth.users (id) on delete set null,
    unique (order_id, product_id, variant_id)
  );

comment on table public.order_items is 'Kertaluontoisen tilauksen yksittäiset rivit/tuotteet.';

comment on column public.order_items.id is 'Tilausrivin tunniste ulkoisessa laskutusjärjestelmässä.';

comment on column public.order_items.order_id is 'Viittaus tilaukseen, johon rivi kuuluu.';

comment on column public.order_items.product_id is 'Tuotteen tunniste ulkoisessa laskutusjärjestelmässä.';

comment on column public.order_items.variant_id is 'Tuotevariantin/hinnan tunniste ulkoisessa laskutusjärjestelmässä.';

comment on column public.order_items.price_amount is 'Yksikköhinta tälle riville.';

comment on column public.order_items.quantity is 'Tuotteiden/yksiköiden määrä tällä rivillä.';

-- Revoke all access to order_items table for authenticated users and service_role
revoke all on public.order_items
from
  authenticated,
  service_role;

-- Open up relevant access to order_items table for authenticated users and service_role
grant
select
  on table public.order_items to authenticated,
  service_role;

grant insert, update, delete on table public.order_items to service_role;

-- Indexes on the order_items table
create index ix_order_items_order_id on public.order_items (order_id);

-- RLS
alter table public.order_items enable row level security;

-- SELECT(order_items):
-- Users can read order items on an order they are a member of
create policy order_items_read_self on public.order_items for
select
  to authenticated using (
    exists (
      select
        1
      from
        public.orders
      where
        id = order_id
        and (
          account_id = (
            select
              auth.uid ()
          )
          or has_role_on_account (account_id)
        )
    )
  );

-- Function "public.upsert_order"
-- Insert or update an order and its items when receiving a webhook from the billing provider
create
or replace function public.upsert_order (
  target_account_id uuid,
  target_customer_id varchar(255),
  target_order_id text,
  target_status public.payment_status,
  target_billing_provider public.billing_provider,
  target_total_amount numeric,
  target_currency varchar(3),
  target_line_items jsonb
) returns public.orders
set
  search_path = '' as $$
declare
    upserted_order public.orders;
    billing_customer_rec record;
    line_item jsonb;
    item_id text;
    product_id text;
    variant_id text;
    price_amount numeric;
    quantity int;
    item_ids_in_payload text[] := array[]::text[];
begin
    -- 1. Etsi tai luo/päivitä laskutusasiakas
    select id into billing_customer_rec
    from public.billing_customers
    where account_id = target_account_id
      and provider = target_billing_provider;

    if billing_customer_rec is null then
       -- Jos asiakasta ei löydy tälle tilille/providerille, heitetään virhe?
       -- Tai luodaan se? Oletetaan, että sen pitäisi olla jo olemassa.
       raise exception 'Billing customer not found for account % and provider %', target_account_id, target_billing_provider;
    end if;

    -- 2. Lisää tai päivitä tilaus (orders)
    insert into public.orders(
        id,
        account_id,
        billing_customer_id,
        status,
        billing_provider,
        total_amount,
        currency)
    values (
        target_order_id,
        target_account_id,
        billing_customer_rec.id,
        target_status,
        target_billing_provider,
        target_total_amount,
        target_currency)
    on conflict (id)
    do update set
        status = excluded.status,
        total_amount = excluded.total_amount,
        currency = excluded.currency,
        billing_customer_id = excluded.billing_customer_id
    returning * into upserted_order;

    -- 3. Käsitellään tilausrivit (order_items)
    -- Kerätään ensin payloadissa olevien rivien ID:t
    for line_item in select * from jsonb_array_elements(target_line_items)
    loop
        item_id := line_item ->> 'id';
        item_ids_in_payload := array_append(item_ids_in_payload, item_id);
    end loop;

    -- Poistetaan rivit, joita EI ollut payloadissa
    delete from public.order_items as oi
    where oi.order_id = upserted_order.id
      and oi.id <> all(item_ids_in_payload);

    -- Lisätään tai päivitetään rivit payloadista
    for line_item in select * from jsonb_array_elements(target_line_items)
    loop
        item_id := line_item ->> 'id';
        product_id := line_item ->> 'product_id';
        variant_id := line_item ->> 'variant_id';
        price_amount := (line_item ->> 'price_amount')::numeric;
        quantity := (line_item ->> 'quantity')::int;

        insert into public.order_items(
            id,
            order_id,
            product_id,
            variant_id,
            price_amount,
            quantity)
        values (
            item_id,
            upserted_order.id,
            product_id,
            variant_id,
            price_amount,
            quantity)
        on conflict (id)
        do update set
            price_amount = excluded.price_amount,
            product_id = excluded.product_id,
            variant_id = excluded.variant_id,
            quantity = excluded.quantity;
    end loop;

    return upserted_order;
end;

$$ language plpgsql;

grant
execute on function public.upsert_order (
  uuid,
  varchar,
  text,
  public.payment_status,
  public.billing_provider,
  numeric,
  varchar,
  jsonb
) to service_role;

-- Triggerit
drop trigger if exists set_orders_timestamps on public.orders;
create trigger set_orders_timestamps
  before insert or update on public.orders
  for each row execute procedure public.trigger_set_timestamps();

drop trigger if exists set_orders_user_tracking on public.orders;
create trigger set_orders_user_tracking
  before insert or update on public.orders
  for each row execute procedure public.trigger_set_user_tracking();