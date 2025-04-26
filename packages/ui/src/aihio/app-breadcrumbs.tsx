'use client';

import { Fragment, memo, useMemo } from 'react';
import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../components/breadcrumb';
import { If } from './if';
import { Trans } from './trans';

/**
 * Muuntaa URL-slugin luettavaksi tekstiksi korvaamalla väliviivat välilyönneillä
 * @param {string} slug - URL-slugi joka halutaan muuntaa
 * @returns {string} Muunnettu, luettavampi teksti
 */
const unslugify = (slug: string) => slug.replace(/-/g, ' ');

/**
 * AppBreadcrumbs-komponentin propsi-rajapinta
 */
interface AppBreadcrumbsProps {
  /** 
   * Valinnainen objekti, joka sisältää avain-arvo-pareja reitin osan korvaamiseksi mukautetulla tekstillä.
   * Esim: { "settings": "Asetukset" } korvaa polun /settings-osan tekstillä "Asetukset"
   */
  values?: Record<string, string>;
  
  /**
   * Suurin näytettävien polkutasojen määrä. Jos polku on pidempi kuin tämä arvo,
   * keskellä olevat tasot korvataan ellipsiksellä (...). Oletusarvo on 6.
   */
  maxDepth?: number;
}

/**
 * `AppBreadcrumbs` - Murupolku-komponentti
 * 
 * Näyttää nykyisen sivun sijainnin murupolkuna, mikä auttaa käyttäjää navigoimaan sivuston rakenteessa.
 * Tukee automaattista lyhennystä pitkille poluille, i18n-käännöksiä ja mukautettuja nimiä.
 * 
 * Komponentti jäsentää automaattisesti nykyisen URL-osoitteen ja luo siitä navigoitavan murupolun.
 * 
 * @example
 * // Peruskäyttö ilman muokkauksia
 * <AppBreadcrumbs />
 * 
 * @example
 * // Mukautetuilla nimillä tietyille reittiosille
 * <AppBreadcrumbs 
 *   values={{ 
 *     "settings": "Asetukset",
 *     "account": "Käyttäjätili"
 *   }} 
 * />
 * 
 * @example
 * // Rajoittaa näkyviin maksimissaan 3 tasoa
 * <AppBreadcrumbs maxDepth={3} />
 * 
 * @param {AppBreadcrumbsProps} props - Komponentin parametrit
 * @returns {JSX.Element} Renderöity murupolku-komponentti
 */
export const AppBreadcrumbs = memo(function AppBreadcrumbs(props: AppBreadcrumbsProps) {
  const pathName = usePathname();
  const splitPath = pathName.split('/').filter(Boolean);
  const values = props.values ?? {};
  const maxDepth = props.maxDepth ?? 6;

  // Ellipsi-elementti keskellä murupolkua
  const Ellipsis = (
    <BreadcrumbItem>
      <BreadcrumbEllipsis className="h-4 w-4" aria-label="Välistä jätetty polkuosia" />
    </BreadcrumbItem>
  );

  const showEllipsis = splitPath.length > maxDepth;

  // Laskemme näytettävät polkuosat vain kerran
  const visiblePaths = useMemo(() => {
    if (showEllipsis) {
      // Näytä ensimmäinen osa ja loput maxDepth-1 osaa
      return [splitPath[0], ...splitPath.slice(-maxDepth + 1)] as string[];
    }
    return splitPath;
  }, [splitPath, showEllipsis, maxDepth]);

  return (
    <Breadcrumb aria-label="Sivuston navigaatiopolku">
      <BreadcrumbList>
        {visiblePaths.map((path, index) => {
          // Määritä näytettävä teksti: käytä mukautettua nimeä tai käännöstä, tai muunna URL-slugi
          const label =
            path in values ? (
              values[path]
            ) : (
              <Trans
                i18nKey={`common:routes.${unslugify(path)}`}
                defaults={unslugify(path)}
              />
            );

          // Rakenna täydellinen polku tähän osaan asti
          const fullPathUpToHere = '/' + splitPath.slice(0, splitPath.indexOf(path) + 1).join('/');
          const isLastItem = index === visiblePaths.length - 1;

          return (
            <Fragment key={index}>
              <BreadcrumbItem 
                className="capitalize lg:text-xs"
                aria-current={isLastItem ? "page" : undefined}
              >
                <If
                  condition={!isLastItem}
                  fallback={<span className="font-medium">{label}</span>}
                >
                  <BreadcrumbLink
                    href={fullPathUpToHere}
                    className="hover:text-primary transition-colors"
                  >
                    {label}
                  </BreadcrumbLink>
                </If>
              </BreadcrumbItem>

              {/* Näytä ellipsi ensimmäisen elementin jälkeen, jos polku on pitkä */}
              {index === 0 && showEllipsis && (
                <>
                  <BreadcrumbSeparator />
                  {Ellipsis}
                </>
              )}

              {/* Näytä erotin, paitsi viimeisen elementin jälkeen */}
              <If condition={!isLastItem}>
                <BreadcrumbSeparator />
              </If>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
});

AppBreadcrumbs.displayName = 'AppBreadcrumbs';
