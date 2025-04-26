'use client';

import { memo } from 'react';
import { cn } from '../lib/utils';
import { Loader2 } from 'lucide-react';

/**
 * LoadingOverlay-komponentin propsit
 */
export interface LoadingOverlayProps {
  /** Näytetäänkö logo latausanimaation yhteydessä */
  displayLogo?: boolean;
  /** Näytetäänkö latausanimaatio koko sivun kokoisena */
  fullPage?: boolean;
  /** Valinnainen viesti latausanimaation yhteydessä */
  message?: string;
  /** Lisäluokat kontainerille */
  className?: string;
  /** Spinnerin koko (pikseleinä) */
  spinnerSize?: number;
  /** Spinnerin väri */
  spinnerColor?: string;
}

/**
 * `LoadingOverlay` - Latausanimaatio ja logo
 * 
 * Komponentti, joka näyttää latausanimaation ja mahdollisesti logon.
 * Käytetään GlobalLoader-komponentin osana, mutta voi käyttää myös itsenäisesti.
 * 
 * @example
 * // Peruskäyttö
 * <LoadingOverlay />
 * 
 * @example
 * // Logo näkyvissä ja viesti
 * <LoadingOverlay displayLogo message="Ladataan sisältöä..." />
 * 
 * @example
 * // Koko sivun kokoinen latausanimaatio
 * <LoadingOverlay fullPage spinnerSize={40} spinnerColor="#0099ff" />
 * 
 * @param {LoadingOverlayProps} props - Komponentin propsit
 * @returns {JSX.Element} Renderöity latausanimaatio
 */
export const LoadingOverlay = memo(function LoadingOverlay({
  displayLogo = false,
  fullPage = false,
  message,
  className,
  spinnerSize = 32,
  spinnerColor,
}: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4',
        fullPage && 'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
        className
      )}
      role="status"
      aria-live="polite"
    >
      {/* Logo, jos vaadittu */}
      {displayLogo && (
        <div className="mb-4 animate-pulse">
          <span className="text-primary font-bold text-2xl">Aihio</span>
        </div>
      )}

      {/* Pyörivä latausanimaatio */}
      <Loader2
        className="animate-spin text-primary"
        size={spinnerSize}
        style={spinnerColor ? { color: spinnerColor } : undefined}
        aria-hidden="true"
      />

      {/* Latausviesti */}
      {message && (
        <p className="text-sm text-muted-foreground mt-2 text-center max-w-xs">
          {message}
        </p>
      )}

      {/* Ruudunlukijat */}
      <span className="sr-only">Ladataan...</span>
    </div>
  );
});

LoadingOverlay.displayName = 'LoadingOverlay'; 