import type { PlopTypes } from '@turbo/gen';
import { execSync } from 'node:child_process';

// Korjattu polku utils-hakemistoon
import { getTemplate } from '../../utils/index';

// Generaattorin nimi, käytetään komennossa `turbo gen keystatic`
const GENERATOR_NAME = 'keystatic';

/**
 * Luo generaattorin Keystatic CMS:n pystyttämiseksi projektiin.
 * Kopioi Keystatic-konfiguraatiotiedostot ja mallipohjat.
 * @param plop Plop-instanssi.
 */
export function createKeystaticAdminGenerator(
  plop: PlopTypes.NodePlopAPI,
): void {
  plop.setGenerator(GENERATOR_NAME, {
    description: 'Create Keystatic configuration files',
    // Tässä vaiheessa ei kysytä käyttäjältä mitään
    prompts: [],
    // Suoritettavat toimenpiteet
    actions: [
      {
        // Lisää tiedostoja nykyiseen hakemistoon
        type: 'addMany',
        // Kohdehakemisto
        destination: '.',
        // Mallipohjien sijainti
        base: getTemplate(GENERATOR_NAME),
        // Kopioitavat tiedostot (kaikki)
        templateFiles: getTemplate(GENERATOR_NAME),
        // Pakota ylikirjoitus
        force: true,
      },
      {
        type: 'modify',
        path: 'apps/web/package.json',
        async transform(content) {
          const pkg = JSON.parse(content);
          const dep = `@keystatic/next`;

          const version = await fetch(
            `https://registry.npmjs.org/-/package/${dep}/dist-tags`,
          )
            .then((res) => res.json())
            .then((json) => json.latest);

          pkg.dependencies![dep] = `^${version}`;
          pkg.dependencies!['@kit/keystatic'] = `workspace:*`;

          return JSON.stringify(pkg, null, 2);
        },
      },
      async () => {
        /**
         * Install deps and format everything
         */
        execSync('pnpm manypkg fix', {
          stdio: 'inherit',
        });

        execSync('pnpm i', {
          stdio: 'inherit',
        });

        return `Keystatic admin generated!`;
      },
    ],
  });
}
