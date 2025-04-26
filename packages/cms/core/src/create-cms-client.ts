import { CmsClient, CmsType } from '@aihioio/cms-types';
import { createRegistry } from '@aihio/shared/registry';

/**
 * The type of CMS client to use.
 */
const CMS_CLIENT = process.env.CMS_CLIENT as CmsType;

// Create a registry for CMS client implementations
const cmsRegistry = createRegistry<CmsClient, CmsType>();

// Register the WordPress CMS client implementation
cmsRegistry.register('wordpress', async () => {
  const { createWordpressClient } = await import('@aihio/wordpress');
  return createWordpressClient();
});

// Register the Keystatic CMS client implementation
cmsRegistry.register('keystatic', async () => {
  const { createKeystaticClient } = await import('@aihio/keystatic');
  return createKeystaticClient();
});

/**
 * Creates a CMS client based on the specified type.
 *
 * @param {CmsType} type - The type of CMS client to create. Defaults to the value of the CMS_CLIENT environment variable.
 * @returns {Promise<CmsClient>} A Promise that resolves to the created CMS client.
 * @throws {Error} If the specified CMS type is unknown.
 */
export async function createCmsClient(type: CmsType = CMS_CLIENT) {
  return cmsRegistry.get(type);
}
