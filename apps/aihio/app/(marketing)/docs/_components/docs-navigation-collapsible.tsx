'use client';

import { usePathname } from 'next/navigation';

import { Cms } from '@aihio/cms';
import { Collapsible } from '@aihio/ui/collapsible';
import { isRouteActive } from '@aihio/ui/utils';

export function DocsNavigationCollapsible(
  props: React.PropsWithChildren<{
    node: Cms.ContentItem;
    prefix: string;
  }>,
) {
  const currentPath = usePathname();
  const prefix = props.prefix;

  const isChildActive = props.node.children.some((child) =>
    isRouteActive(prefix + '/' + child.url, currentPath, false),
  );

  return (
    <Collapsible
      className={'group/collapsible'}
      defaultOpen={isChildActive ? true : !props.node.collapsed}
    >
      {props.children}
    </Collapsible>
  );
}
