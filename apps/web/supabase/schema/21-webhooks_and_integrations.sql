-- API-avaintaulu ulkoisia integraatioita varten
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  key VARCHAR(255) NOT NULL UNIQUE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE NOT NULL
);

-- Indeksi API-avaimille
CREATE INDEX ix_api_keys_account_id ON public.api_keys(account_id);
CREATE INDEX ix_api_keys_key ON public.api_keys(key);

-- Käyttöoikeudet
GRANT SELECT, INSERT, UPDATE, DELETE ON public.api_keys TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.api_keys TO service_role;

-- RLS API-avaimille
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- SELECT(public.api_keys)
CREATE POLICY select_api_keys
ON public.api_keys
FOR SELECT
TO authenticated
USING (
  public.has_role_on_account(account_id)
);

-- INSERT(public.api_keys)
CREATE POLICY insert_api_keys
ON public.api_keys
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role_on_account(account_id)
);

-- UPDATE(public.api_keys)
CREATE POLICY update_api_keys
ON public.api_keys
FOR UPDATE
TO authenticated
USING (
  public.has_role_on_account(account_id)
) WITH CHECK (
  public.has_role_on_account(account_id)
);

-- DELETE(public.api_keys)
CREATE POLICY delete_api_keys
ON public.api_keys
FOR DELETE
TO authenticated
USING (
  public.has_role_on_account(account_id)
);

-- Webhooks-taulu integraatioita varten
CREATE TABLE IF NOT EXISTS public.webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  chatbot_id UUID NOT NULL REFERENCES public.chatbots(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  secret VARCHAR(255),
  events TEXT[] NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_by UUID REFERENCES auth.users(id)
);

-- Indeksit webhookeille
CREATE INDEX ix_webhooks_account_id ON public.webhooks(account_id);
CREATE INDEX ix_webhooks_chatbot_id ON public.webhooks(chatbot_id);

-- Käyttöoikeudet
GRANT SELECT, INSERT, UPDATE, DELETE ON public.webhooks TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.webhooks TO service_role;

-- RLS webhookeille
ALTER TABLE public.webhooks ENABLE ROW LEVEL SECURITY;

-- SELECT(public.webhooks)
CREATE POLICY select_webhooks
ON public.webhooks
FOR SELECT
TO authenticated
USING (
  public.has_role_on_account(account_id)
);

-- INSERT(public.webhooks)
CREATE POLICY insert_webhooks
ON public.webhooks
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role_on_account(account_id)
);

-- UPDATE(public.webhooks)
CREATE POLICY update_webhooks
ON public.webhooks
FOR UPDATE
TO authenticated
USING (
  public.has_role_on_account(account_id)
) WITH CHECK (
  public.has_role_on_account(account_id)
);

-- DELETE(public.webhooks)
CREATE POLICY delete_webhooks
ON public.webhooks
FOR DELETE
TO authenticated
USING (
  public.has_role_on_account(account_id)
);

-- Funktio webhooks-käsittelyyn (esim. uusi keskustelu)
CREATE OR REPLACE FUNCTION public.handle_webhook_event()
RETURNS TRIGGER AS $$
DECLARE
  webhook_record RECORD;
  payload JSONB;
BEGIN
  -- Payload riippuu triggerin tyypistä
  IF TG_TABLE_NAME = 'conversations' AND TG_OP = 'INSERT' THEN
    payload = jsonb_build_object(
      'event', 'conversation.created',
      'conversation_id', NEW.id,
      'chatbot_id', NEW.chatbot_id,
      'reference_id', NEW.reference_id,
      'created_at', NEW.created_at
    );
  
  ELSIF TG_TABLE_NAME = 'messages' AND TG_OP = 'INSERT' THEN
    payload = jsonb_build_object(
      'event', 'message.created',
      'message_id', NEW.id,
      'conversation_id', NEW.conversation_id,
      'chatbot_id', NEW.chatbot_id,
      'text', NEW.text,
      'sender', NEW.sender,
      'type', NEW.type,
      'created_at', NEW.created_at
    );
  ELSE
    RETURN NEW;
  END IF;

  -- Suoritetaan asynkroninen webhook-kutsu pg_net-laajennuksen avulla
  -- Tämä on vain esimerkki - pg_net pitää asentaa erikseen
  /*
  FOR webhook_record IN 
    SELECT w.* FROM public.webhooks w 
    WHERE w.chatbot_id = NEW.chatbot_id 
    AND w.is_active = TRUE 
    AND (
      TG_TABLE_NAME = 'conversations' AND 'conversation.created' = ANY(w.events)
      OR 
      TG_TABLE_NAME = 'messages' AND 'message.created' = ANY(w.events)
    )
  LOOP
    PERFORM net.http_post(
      url := webhook_record.url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'X-Webhook-Signature', public.hmac_sha256(webhook_record.secret, payload::text)
      ),
      body := payload
    );
  END LOOP;
  */
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger webhookeille
CREATE TRIGGER on_conversation_created
AFTER INSERT ON public.conversations
FOR EACH ROW
EXECUTE PROCEDURE public.handle_webhook_event();

CREATE TRIGGER on_message_created_webhook
AFTER INSERT ON public.messages
FOR EACH ROW
EXECUTE PROCEDURE public.handle_webhook_event();