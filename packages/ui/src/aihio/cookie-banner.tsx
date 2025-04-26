'use client';

import { useCallback, useMemo, useState, memo, forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Button } from '../components/button';
import { Heading } from '../components/heading';
import { Trans } from './trans';
import { cn } from '../lib/utils';
import { X } from 'lucide-react';

// Local storage key for cookie consent status
const COOKIE_CONSENT_STATUS = 'cookie_consent_status';

/**
 * Suostumuksen tila -enum
 */
enum ConsentStatus {
  Accepted = 'accepted',
  Rejected = 'rejected',
  Unknown = 'unknown',
}

/**
 * CookieBanner-komponentin propsit
 */
interface CookieBannerProps {
  /** Otsikko (i18n-avain), oletuksena 'cookieBanner.title' */
  titleKey?: string;
  /** Kuvausteksti (i18n-avain), oletuksena 'cookieBanner.description' */
  descriptionKey?: string;
  /** Hyväksy-napin teksti (i18n-avain), oletuksena 'cookieBanner.accept' */
  acceptKey?: string;
  /** Hylkää-napin teksti (i18n-avain), oletuksena 'cookieBanner.reject' */
  rejectKey?: string;
  /** Position, oletuksena 'bottom' */
  position?: 'bottom' | 'top' | 'bottom-left' | 'bottom-right';
  /** Maksimileveys, oletuksena 'lg' */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Näytä close-painike, oletuksena false */
  showCloseButton?: boolean;
  /** Aseta automaattinen focus hyväksy-napille, oletuksena true */
  autoFocusAccept?: boolean;
}

/**
 * `CookieBanner` - Evästeilmoitus käyttäjälle
 * 
 * Tämä komponentti näyttää evästeilmoituksen käyttäjälle ja tallentaa 
 * käyttäjän valinnan local storageen. Ilmoitus näytetään vain kerran, 
 * kunnes käyttäjä on tehnyt valinnan.
 * 
 * @example
 * // Peruskäyttö
 * <CookieBanner />
 * 
 * @example
 * // Muokattu sijainti ja koko
 * <CookieBanner 
 *   position="bottom-right" 
 *   maxWidth="md" 
 *   showCloseButton={true}
 * />
 * 
 * @example
 * // Muokatut tekstit
 * <CookieBanner 
 *   titleKey="customMessages.cookieTitle"
 *   descriptionKey="customMessages.cookieDescription"
 *   acceptKey="customMessages.accept"
 *   rejectKey="customMessages.decline"
 * />
 * 
 * @param {CookieBannerProps} props - Komponentin propsit
 * @returns {JSX.Element | null} Renderöity evästeilmoitus tai null jos ilmoitusta ei tarvitse näyttää
 */
export const CookieBanner = memo(function CookieBanner({
  titleKey = 'cookieBanner.title',
  descriptionKey = 'cookieBanner.description',
  acceptKey = 'cookieBanner.accept',
  rejectKey = 'cookieBanner.reject',
  position = 'bottom',
  maxWidth = 'lg',
  showCloseButton = false,
  autoFocusAccept = true,
}: CookieBannerProps) {
  const { status, accept, reject } = useCookieConsent();

  // Älä renderöi palvelimella tai jos käyttäjä on jo tehnyt valinnan
  if (!isBrowser() || status !== ConsentStatus.Unknown) {
    return null;
  }

  // Luo position-luokka position-parametrin perusteella
  const positionClasses = {
    'bottom': 'bottom-0 left-0 right-0 mx-auto',
    'top': 'top-0 left-0 right-0 mx-auto',
    'bottom-left': 'bottom-[2rem] left-[2rem]',
    'bottom-right': 'bottom-[2rem] right-[2rem]',
  };

  // Luo maxWidth-luokka maxWidth-parametrin perusteella
  const maxWidthClasses = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    'full': 'max-w-full',
  };

  return (
    <DialogPrimitive.Root open modal={false}>
      <DialogPrimitive.Content
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          'fixed bg-card text-card-foreground z-50 border shadow-lg',
          'animate-in fade-in zoom-in-95 slide-in-from-bottom-4 fill-mode-both',
          'p-6 delay-500 duration-700',
          'rounded-lg md:rounded-xl',
          positionClasses[position],
          maxWidthClasses[maxWidth],
          position === 'bottom' && 'mb-0 sm:mb-4 mx-4 sm:mx-auto',
          position === 'top' && 'mt-0 sm:mt-4 mx-4 sm:mx-auto',
        )}
        aria-labelledby="cookie-banner-title"
        data-state="open"
      >
        <div className="flex flex-col space-y-4">
          <div className="flex items-start justify-between">
            <Heading level={3} id="cookie-banner-title" className="text-xl font-semibold">
              <Trans i18nKey={titleKey} />
            </Heading>
            
            {showCloseButton && (
              <Button
                onClick={reject}
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full"
                aria-label="Sulje evästeilmoitus"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="text-muted-foreground text-sm">
            <Trans i18nKey={descriptionKey} />
          </div>

          <div className="flex flex-wrap justify-end gap-2 pt-2">
            <Button 
              variant="outline" 
              onClick={reject}
              size="sm"
              className="border-muted-foreground/20 hover:border-muted-foreground/30 hover:bg-muted/50"
            >
              <Trans i18nKey={rejectKey} />
            </Button>

            <Button 
              autoFocus={autoFocusAccept}
              onClick={accept}
              size="sm"
              className="font-medium"
            >
              <Trans i18nKey={acceptKey} />
            </Button>
          </div>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Root>
  );
});

CookieBanner.displayName = 'CookieBanner';

/**
 * Evästeiden hyväksyntätila ja -toiminnot
 * 
 * @returns {Object} Objekti, joka sisältää evästeiden hyväksyntätilan ja siihen liittyvät toiminnot
 */
export function useCookieConsent() {
  const initialState = getStatusFromLocalStorage();
  const [status, setStatus] = useState<ConsentStatus>(initialState);

  // Evästesuostumuksen hyväksyminen
  const accept = useCallback(() => {
    const status = ConsentStatus.Accepted;
    setStatus(status);
    storeStatusInLocalStorage(status);
  }, []);

  // Evästesuostumuksen hylkääminen
  const reject = useCallback(() => {
    const status = ConsentStatus.Rejected;
    setStatus(status);
    storeStatusInLocalStorage(status);
  }, []);

  // Evästesuostumuksen nollaaminen
  const clear = useCallback(() => {
    const status = ConsentStatus.Unknown;
    setStatus(status);
    storeStatusInLocalStorage(status);
  }, []);

  // Memoize the return value for better performance
  return useMemo(() => ({
    status,
    accept,
    reject,
    clear,
  }), [status, accept, reject, clear]);
}

/**
 * Tallentaa evästeiden hyväksyntätilan local storageen
 * 
 * @param {ConsentStatus} status - Tallennetttava tila
 */
function storeStatusInLocalStorage(status: ConsentStatus) {
  if (!isBrowser()) return;
  
  try {
    localStorage.setItem(COOKIE_CONSENT_STATUS, status);
  } catch (error) {
    console.error('Evästeiden hyväksyntätilan tallentaminen epäonnistui:', error);
  }
}

/**
 * Hakee evästeiden hyväksyntätilan local storagesta
 * 
 * @returns {ConsentStatus} Tallennettu tila tai ConsentStatus.Unknown jos tilaa ei ole tallennettu
 */
function getStatusFromLocalStorage(): ConsentStatus {
  if (!isBrowser()) return ConsentStatus.Unknown;
  
  try {
    const status = localStorage.getItem(COOKIE_CONSENT_STATUS) as ConsentStatus;
    return status ?? ConsentStatus.Unknown;
  } catch (error) {
    console.error('Evästeiden hyväksyntätilan hakeminen epäonnistui:', error);
    return ConsentStatus.Unknown;
  }
}

/**
 * Tarkistaa suoritetaanko koodi selaimessa
 * 
 * @returns {boolean} true jos koodi suoritetaan selaimessa, muuten false
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}
