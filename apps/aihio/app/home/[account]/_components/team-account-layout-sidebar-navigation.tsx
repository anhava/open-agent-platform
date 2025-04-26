import { z } from 'zod';

import { NavigationConfigSchema } from '@aihio/ui/navigation-schema';
import { SidebarNavigation } from '@aihio/ui/components-sidebar';

export function TeamAccountLayoutSidebarNavigation({
  config,
}: React.PropsWithChildren<{
  config: z.infer<typeof NavigationConfigSchema>;
}>) {
  return <SidebarNavigation config={config} />;
}
