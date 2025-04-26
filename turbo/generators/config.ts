import type { PlopTypes } from '@turbo/gen';

// Tuodaan generaattorien luontifunktiot templates-kansiosta
import { createEnvironmentVariablesGenerator } from './templates/env/generator';
import { createKeystaticAdminGenerator } from './templates/keystatic/generator';
import { createPackageGenerator } from './templates/package/generator';
import { createSetupGenerator } from './templates/setup/generator';
import { createEnvironmentVariablesValidatorGenerator } from './templates/validate-env/generator';

// Lista kaikista rekisteröitävistä generaattoreista
const generators = [
  createPackageGenerator, // Uuden paketin luonti
  createKeystaticAdminGenerator, // Keystatic CMS:n pystytys
  createEnvironmentVariablesGenerator, // .env-tiedostojen generointi
  createEnvironmentVariablesValidatorGenerator, // Ympäristömuuttujien validointi
  createSetupGenerator, // Projektin alkuasetukset (mahdollisesti)
];

/**
 * Rekisteröi kaikki määritellyt generaattorit Plop-työkaluun,
 * jotta niitä voidaan käyttää `turbo gen <generaattori>` -komennolla.
 * @param plop Plop-instanssi, johon generaattorit rekisteröidään.
 */
export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // Käydään läpi kaikki generaattorit ja rekisteröidään ne
  generators.forEach((gen) => gen(plop));
}
