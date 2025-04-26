import path from 'node:path';

import type { PlopTypes } from '@turbo/gen';
import { execSync } from 'node:child_process';

// Korjattu polku utils-hakemistoon
import { getTemplate } from '../../utils/index';

// Generaattorin nimi, käytetään komennossa `turbo gen package`
const GENERATOR_NAME = 'package';

/**
 * Luo generaattorin uuden paketin luomiseen `packages`-hakemistoon.
 * Kysyy käyttäjältä paketin nimen ja kopioi mallipohjatiedostot uuteen pakettihakemistoon.
 * @param plop Plop-instanssi.
 */
export function createPackageGenerator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator(GENERATOR_NAME, {
    description: 'Create a new package',
    // Kysymykset käyttäjälle
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Package name? (e.g. ui, utils, hooks)',
      },
    ],
    // Suoritettavat toimenpiteet
    actions: (
      answers: Record<string, unknown>,
    ): PlopTypes.ActionType[] => {
      // Haetaan käyttäjän antama paketin nimi
      const name = answers.name as string;
      // Muodostetaan polku uuteen pakettiin
      const destination = path.join('packages', name);

      return [
        {
          // Lisää tiedostoja
          type: 'addMany',
          // Kohdehakemisto
          destination,
          // Mallipohjien sijainti
          base: getTemplate(GENERATOR_NAME),
          // Kopioitavat tiedostot (kaikki)
          templateFiles: getTemplate(GENERATOR_NAME),
          // Välitetään käyttäjän antama nimi mallipohjille
          data: {
            name,
          },
        },
      ];
    },
  });
}
