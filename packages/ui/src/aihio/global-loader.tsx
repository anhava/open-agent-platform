'use client';

import { memo } from 'react';
import { cn } from '../lib/utils';
import { If } from './if';
import { LoadingOverlay } from './loading-overlay';
import { TopLoadingBarIndicator } from './top-loading-bar-indicator';

/**
 * GlobalLoader-komponentin propsit
 */
export interface GlobalLoaderProps {
  /** Näytetäänkö logo latausanimaation yhteydessä */
  displayLogo?: boolean;
  /** Näytetäänkö latausanimaatio koko sivun kokoisena */
  fullPage?: boolean;
  /** Näytetäänkö pyörivä latausanimaatio (spinner) */
  displaySpinner?: boolean;
  /** Näytetäänkö yläreunan latausanimaatio (progress bar) */
  displayTopLoadingBar?: boolean;
  /** Valinnainen lisäsisältö latausanimaation kanssa */
  children?: React.ReactNode;
  /** Valinnainen viesti latausanimaation yhteydessä */
  message?: string;
  /** Valinnainen viive (ms) ennen latausanimaation näyttämistä */
  delay?: number;
  /** Lisäluokat kontainerille */
  className?: string;
}

/**
 * `GlobalLoader` - Globaali latausanimaatiokomponentti
 * 
 * Monikäyttöinen latausanimaatiokomponentti, joka voidaan näyttää joko
 * koko sivun kokoisena tai pienempänä elementtinä. Tukee erilaisia 
 * latausanimaatioita, kuten yläreunan edistymispalkkia ja pyörivää latausanimaatiota.
 * 
 * @example
 * // Peruskäyttö koko sivun latausindikaattorina
 * <GlobalLoader fullPage />
 * 
 * @example
 * // Vain yläreunan edistymispalkki
 * <GlobalLoader displaySpinner={false} />
 * 
 * @example
 * // Muokattu latauskomponentti viestillä
 * <GlobalLoader message="Ladataan dataa..." displayLogo={true} />
 * 
 * @example
 * // Viiveellä näytettävä latausanimaatio
 * <GlobalLoader delay={300} />
 * 
 * @param {GlobalLoaderProps} props - Komponentin propsit
 * @returns {JSX.Element} Renderöity latausanimaatio
 */
export const GlobalLoader = memo(function GlobalLoader({
  displayLogo = false,
  fullPage = false,
  displaySpinner = true, 
  displayTopLoadingBar = true,
  children,
  message,
  delay = 0,
  className,
}: GlobalLoaderProps) {
  return (
    <>
      {/* Yläreunan edistymispalkki */}
      <If condition={displayTopLoadingBar}>
        <TopLoadingBarIndicator delay={delay} />
      </If>

      {/* Pyörivä latausanimaatio ja mahdollinen lisäsisältö */}
      <If condition={displaySpinner}>
        <div
          className={cn(
            'flex flex-1 flex-col items-center justify-center',
            'animate-in fade-in zoom-in-80 slide-in-from-bottom-4',
            'duration-500 ease-in-out',
            'gap-4',
            className
          )}
          style={{ 
            animationDelay: delay ? `${delay}ms` : undefined 
          }}
          role="status"
          aria-live="polite"
          data-state="loading"
        >
          <LoadingOverlay 
            displayLogo={displayLogo} 
            fullPage={fullPage} 
            message={message}
          />

          {/* Lisäsisältö */}
          {children && (
            <div className="animate-in fade-in-50 duration-700 mt-4">
              {children}
            </div>
          )}
        </div>
      </If>
    </>
  );
});

GlobalLoader.displayName = 'GlobalLoader';
