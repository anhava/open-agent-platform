import type {PlopTypes} from '@turbo/gen';
import {execSync} from 'node:child_process';

// Generaattorin nimi, käytetään komennossa `turbo gen setup`
const GENERATOR_NAME = 'setup';

/**
 * Luo generaattorin projektin alkuasetuksia varten (toiminnallisuus ei tarkkaan määritelty tässä).
 * Tarkoituksena voi olla esimerkiksi riippuvuuksien asennus tai konfiguraatiotiedostojen luonti.
 * @param plop Plop-instanssi.
 */
export function createSetupGenerator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator(GENERATOR_NAME, {
    description: 'Setup project dependencies and configuration',
    // Tässä vaiheessa ei kysytä käyttäjältä mitään
    prompts: [],
    // Suoritettavat toimenpiteet (tässä tyhjä, eli ei tee mitään oletuksena)
    actions: [],
  });
}

function setupPreCommit(params: {
  setupHealthCheck: boolean;
}) {
  try {
    const filePath = '.git/hooks/pre-commit';

    const healthCheckCommands = params.setupHealthCheck
        ? `pnpm run lint:fix\npnpm run typecheck\n`.trim()
        : ``;

    const licenseCommand = `pnpm run --filter license dev`;
    const fileContent = `#!/bin/bash\n${healthCheckCommands}${licenseCommand}`;

    // write file
    execSync(`echo "${fileContent}" > ${filePath}`, {
      stdio: 'inherit',
    });

    // make file executable
    execSync(`chmod +x ${filePath}`, {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error('Pre-commit hook setup failed. Aborting package generation.');
    process.exit(1);
  }
}

function setupRemote() {
  try {
    // Setup remote upstream
    const getRemoteUrl = execSync('git remote get-url origin', {
      stdio: 'inherit',
    });

    const currentRemote = getRemoteUrl.toString().trim();

    console.log(`Setting upstream remote to ${currentRemote} ...`);

    if (currentRemote && currentRemote.includes('github.com')) {

      execSync(`git remote remove origin`, {
        stdio: 'inherit',
      });

      execSync(`git remote set-url upstream ${currentRemote}`, {
        stdio: 'inherit',
      });
    } else {
      console.error('Your current remote is not GitHub');
    }
  } catch (error) {
    console.info('No current remote found. Skipping upstream remote setup.');
  }

  // Run license script
  try {
    execSync('turbo run --filter license dev', {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error(`License script failed. Aborting package generation. Error: ${error}`);
    process.exit(1);
  }
}
