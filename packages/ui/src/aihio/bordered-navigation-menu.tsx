'use client';

import { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn, isRouteActive } from '../lib/utils';
import { Button } from '../components/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '../components/navigation-menu';
import { Trans } from './trans';

/**
 * BorderedNavigationMenu-komponentin propsit
 */
interface BorderedNavigationMenuProps {
  /** Lapsikomponentit (tyypillisesti BorderedNavigationMenuItem) */
  children: React.ReactNode;
  /** Valinnainen CSS-luokka valikkolistalle */
  className?: string;
}

/**
 * BorderedNavigationMenuItem-komponentin propsit
 */
interface BorderedNavigationMenuItemProps {
  /** Linkki, johon navigoidaan klikattaessa */
  path: string;
  /** Näytettävä teksti tai i18n-avain */
  label: React.ReactNode | string;
  /** 
   * Määrittää, mikä osa polusta otetaan huomioon aktiivisuutta määritettäessä.
   * - Jos true (default): tarkistaa, että reitti on täsmälleen sama.
   * - Jos false: tarkistaa, että reitti alkaa samalla polulla.
   * - Jos funktio: käyttää mukautettua funktiota tarkistukseen.
   */
  end?: boolean | ((path: string) => boolean);
  /** Pakottaa valikkokohteen aktiiviseksi riippumatta nykyisestä polusta */
  active?: boolean;
  /** Valinnainen CSS-luokka MenuItem-komponentille */
  className?: string;
  /** Valinnainen CSS-luokka Button-komponentille */
  buttonClassName?: string;
}

/**
 * `BorderedNavigationMenu` - Rajattu navigaatiovalikko
 * 
 * Komponentti luo tyylikkään vaakasuuntaisen navigaatiovalikon,
 * jossa aktiivinen osio korostetaan pohjaviivalla. Tukee i18n-käännöksiä.
 * 
 * @example
 * // Peruskäyttö navigaatiossa
 * <BorderedNavigationMenu>
 *   <BorderedNavigationMenuItem path="/" label="Etusivu" />
 *   <BorderedNavigationMenuItem path="/palvelut" label="Palvelut" />
 *   <BorderedNavigationMenuItem path="/yhteystiedot" label="Yhteystiedot" />
 * </BorderedNavigationMenu>
 * 
 * @example
 * // Käännösavaimilla
 * <BorderedNavigationMenu>
 *   <BorderedNavigationMenuItem path="/" label="nav.home" />
 *   <BorderedNavigationMenuItem path="/palvelut" label="nav.services" />
 * </BorderedNavigationMenu>
 * 
 * @param {BorderedNavigationMenuProps} props - Komponentin propsit
 * @returns {JSX.Element} Renderöity navigaatiovalikko
 */
export const BorderedNavigationMenu = memo(function BorderedNavigationMenu({ 
  children, 
  className 
}: BorderedNavigationMenuProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList className={cn('relative h-full space-x-2', className)}>
        {children}
      </NavigationMenuList>
    </NavigationMenu>
  );
});

BorderedNavigationMenu.displayName = 'BorderedNavigationMenu';

/**
 * `BorderedNavigationMenuItem` - Navigaatiovalikon kohde
 * 
 * Navigaatiovalikon yksittäinen kohde, joka näyttää linkin ja
 * korostaa aktiivisen osion pohjaviivalla. Tukee i18n-käännöksiä.
 * 
 * @example
 * // Perusesimerkki aktiivisesta kohteesta
 * <BorderedNavigationMenuItem 
 *   path="/asetukset" 
 *   label="Asetukset" 
 *   active={true} 
 * />
 * 
 * @example
 * // Mukautetulla tyylillä
 * <BorderedNavigationMenuItem 
 *   path="/profiili" 
 *   label="Profiili" 
 *   className="font-bold"
 *   buttonClassName="px-4 py-2"
 * />
 * 
 * @param {BorderedNavigationMenuItemProps} props - Komponentin propsit
 * @returns {JSX.Element} Renderöity navigaatiovalikon kohde
 */
export const BorderedNavigationMenuItem = memo(function BorderedNavigationMenuItem(props: BorderedNavigationMenuItemProps) {
  const pathname = usePathname();

  // Määritellään onko tämä kohde aktiivinen
  const active = props.active ?? isRouteActive(props.path, pathname, props.end);

  return (
    <NavigationMenuItem className={props.className}>
      <Button
        asChild
        variant="ghost"
        className={cn(
          'relative transition-all hover:bg-secondary/20 active:shadow-xs', 
          props.buttonClassName
        )}
      >
        <Link
          href={props.path}
          className={cn('text-sm', {
            'text-secondary-foreground font-medium': active,
            'text-secondary-foreground/80 hover:text-secondary-foreground':
              !active,
          })}
          aria-current={active ? 'page' : undefined}
        >
          {typeof props.label === 'string' ? (
            <Trans i18nKey={props.label} defaults={props.label} />
          ) : (
            props.label
          )}

          {active && (
            <span
              className={cn(
                'absolute -bottom-2.5 left-0 h-0.5 w-full bg-primary',
                'animate-in fade-in zoom-in-90',
              )}
              aria-hidden="true"
            />
          )}
        </Link>
      </Button>
    </NavigationMenuItem>
  );
});

BorderedNavigationMenuItem.displayName = 'BorderedNavigationMenuItem';
