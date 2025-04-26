'use client';

import { memo, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu as MenuIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/dropdown-menu';
import { Trans } from './trans';

/**
 * Navigaatiolinkin tyyppi
 */
export interface MobileNavLink {
  path: string;
  label: string; // Joko suora teksti tai i18n-avain
  icon?: React.ComponentType<{ className?: string }>;
}

/**
 * MobileNavigationDropdown-komponentin propsit
 */
interface MobileNavigationDropdownProps {
  /** Lista navigaatiolinkeistä */
  links: MobileNavLink[];
  /** Valinnainen otsikko valikolle */
  menuLabel?: string; 
  /** Valinnainen ikoni trigger-painikkeelle */
  triggerIcon?: React.ComponentType<{ className?: string }>;
  /** Valinnainen luokka trigger-painikkeelle */
  triggerClassName?: string;
  /** Valinnainen luokka sisältöalueelle */
  contentClassName?: string;
}

/**
 * `MobileNavigationDropdown` - Mobiilinavigaation pudotusvalikko
 * 
 * Komponentti luo pudotusvalikon, joka on suunniteltu erityisesti mobiililaitteiden 
 * navigaatioon. Se näyttää nykyisen sivun nimen (tai oletusikoni) ja avaa 
 * valikon, jossa on linkit muille sivuille.
 * 
 * @example
 * const navLinks: MobileNavLink[] = [
 *   { path: '/', label: 'Etusivu', icon: Home },
 *   { path: '/profiili', label: 'Profiili', icon: User },
 *   { path: '/asetukset', label: 'Asetukset', icon: Settings },
 * ];
 * 
 * <MobileNavigationDropdown links={navLinks} menuLabel="Valikko" />
 * 
 * @param {MobileNavigationDropdownProps} props - Komponentin propsit
 * @returns {JSX.Element} Renderöity mobiilinavigaatiovalikko
 */
export const MobileNavigationDropdown = memo(function MobileNavigationDropdown({
  links,
  menuLabel,
  triggerIcon: TriggerIcon = MenuIcon,
  triggerClassName,
  contentClassName,
}: MobileNavigationDropdownProps) {
  const pathname = usePathname();

  // Etsi nykyistä polkua vastaava linkki
  const currentLink = useMemo(() => 
    links.find((link) => pathname === link.path || pathname.startsWith(link.path + '/') && link.path !== '/'), 
    [links, pathname]
  );

  const currentLabel = currentLink?.label ?? menuLabel ?? 'Valikko'; // Käytä linkin labelia, menun labelia tai oletusta

  // Muodosta valikon kohdat
  const menuItems = useMemo(() => links.map((link) => {
    const LinkIcon = link.icon;
    const isActive = currentLink?.path === link.path;

    return (
      <DropdownMenuItem key={link.path} asChild disabled={isActive} className={cn('focus:bg-accent', isActive && 'bg-accent')}>
        <Link href={link.path} className="flex items-center gap-2 cursor-pointer">
          {LinkIcon && <LinkIcon className="h-4 w-4 text-muted-foreground" />}
          <Trans i18nKey={link.label} defaults={link.label} />
        </Link>
      </DropdownMenuItem>
    );
  }), [links, currentLink]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'flex w-full items-center justify-between gap-2 px-3',
            triggerClassName
          )}
          aria-label={menuLabel ?? 'Avaa navigaatio'}
        >
          {/* Triggerin sisältö: Ikoni + Nykyinen sivu/Label + Nuoli */}
          <div className="flex items-center gap-2 overflow-hidden">
             {TriggerIcon && <TriggerIcon className="h-5 w-5 flex-shrink-0" />}
             <span className="truncate text-sm font-medium">
               <Trans i18nKey={currentLabel} defaults={currentLabel} />
             </span>
          </div>
          <ChevronDown className="h-4 w-4 flex-shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="start" 
        className={cn('w-56', contentClassName)} // Oletusleveys
      >
        {menuLabel && (
          <>
            <DropdownMenuLabel>
              <Trans i18nKey={menuLabel} defaults={menuLabel} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {menuItems}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

MobileNavigationDropdown.displayName = 'MobileNavigationDropdown';
