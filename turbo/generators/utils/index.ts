import path from 'node:path';
import { existsSync, readFileSync } from 'fs';
import { PlopTypes } from '@turbo/gen';

/**
 * Hakee absoluuttisen polun generaattorin mallipohjahakemistoon.
 * @param generatorName Generaattorin nimi (vastaa alihakemiston nimeä `templates`-kansiossa).
 * @returns Absoluuttinen polku mallipohjahakemistoon.
 */
export function getTemplate(generatorName: string): string {
  return path.join(__dirname, '../templates', generatorName);
}

/**
 * Apufunktio muuttamaan merkkijono isoksi alkukirjaimeksi (Capital Case).
 * Esim. 'helloWorld' -> 'HelloWorld'.
 * @param value Muunnettava merkkijono.
 * @returns Muunnettu merkkijono.
 */
export function toCapitalCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Apufunktio rekisteröimään Handlebars-avustajia Plop-instanssiin.
 * Rekisteröi `capitalCase`-avustajan.
 * @param plop Plop-instanssi.
 */
export function registerHelpers(plop: PlopTypes.NodePlopAPI) {
  plop.setHelper('capitalCase', toCapitalCase);
}

// Esimerkkifunktioita ympäristömuuttujien lataamiseen (voidaan poistaa, jos ei käytössä)

function loadEnvironmentVariables(filePath: string) {
  if (!existsSync(filePath)) {
    return {};
  }

  const file = readFileSync(filePath, 'utf8');
  const lines = file.split('\n');
  const env = {};

  for (const line of lines) {
    if (line.startsWith('#') || !line.includes('=')) {
      continue;
    }

    const [key, value] = line.split('=');
    (env as any)[key] = value;
  }

  return env;
}

function loadAllEnvironmentVariables(appPath: string) {
  return {
    ...loadEnvironmentVariables(path.join(appPath, '.env')),
    ...loadEnvironmentVariables(path.join(appPath, '.env.local')),
  };
}

// Viedään generaattorin apufunktiot käyttöön
export const generator = {
  loadEnvironmentVariables,
  loadAllEnvironmentVariables,
};
