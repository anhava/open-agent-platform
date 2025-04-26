import { PageBody, PageHeader } from '@aihio/ui/page';
import { Trans } from '@aihio/ui/trans';
import { Button } from '@aihio/ui/button';
import Link from 'next/link';
import { getSupabaseServerClient } from '@aihio/supabase/server-client';
import { Tables } from '@/lib/database.types';

async function fetchChatbots(): Promise<Tables<'chatbots'>[]> {
  const client = getSupabaseServerClient();
  // TODO: Rajaa tilin/käyttäjän mukaan, nyt haetaan kaikki (demo)
  const { data, error } = await client.from('chatbots').select('*').order('created_at', { ascending: false });
  if (error) return [];
  return data as Tables<'chatbots'>[];
}

export default async function DashboardPage() {
  const chatbots = await fetchChatbots();

  return (
    <>
      <PageHeader description={<Trans i18nKey="dashboard:description">Luo ja hallitse Aihio AI -chatbotteja, seuraa käyttöä ja hallinnoi asetuksia.</Trans>}>
        <Trans i18nKey="dashboard:title">Aihio AI - Hallintapaneeli</Trans>
      </PageHeader>
      <PageBody>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-background p-6 shadow flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Chatbotit</h2>
              <Button asChild size="sm">
                <Link href="/chatbots/new">
                  <Trans i18nKey="dashboard:createBot">Luo uusi botti</Trans>
                </Link>
              </Button>
            </div>
            {chatbots.length === 0 ? (
              <div className="text-muted-foreground text-sm">Ei vielä yhtään bottia.</div>
            ) : (
              <ul className="space-y-3">
                {chatbots.map((bot) => (
                  <li key={bot.id} className="rounded border px-4 py-3 bg-card hover:bg-accent transition">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{bot.name}</span>
                      <span className="text-xs text-muted-foreground truncate">{bot.description}</span>
                      <span className="text-xs text-primary/70">ID: {bot.public_id}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-lg border bg-background p-6 shadow">
            <h2 className="mb-2 text-lg font-semibold">Käyttö & Analytiikka</h2>
            <p className="text-muted-foreground text-sm mb-4">Seuraa bottien käyttöä ja suorituskykyä.</p>
            {/* TODO: Lisää analytiikka-widgetit */}
          </div>
          <div className="rounded-lg border bg-background p-6 shadow">
            <h2 className="mb-2 text-lg font-semibold">Asetukset</h2>
            <p className="text-muted-foreground text-sm mb-4">Hallinnoi tiliäsi ja palvelun asetuksia.</p>
            {/* TODO: Lisää asetusten hallinta */}
          </div>
        </div>
      </PageBody>
    </>
  );
} 