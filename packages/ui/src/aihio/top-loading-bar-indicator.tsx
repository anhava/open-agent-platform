'use client';

import { memo, useEffect, useState } from 'react';
import { cn } from '../lib/utils';

/**
 * TopLoadingBarIndicator-komponentin propsit
 */
export interface TopLoadingBarIndicatorProps {
  /** CSS-luokat */
  className?: string;
  /** Viive millisekunteina ennen animaation alkua */
  delay?: number;
  /** Latauspalkin väri (CSS-väri) */
  color?: string;
  /** Latauspalkin korkeus pikseleinä */
  height?: number;
  /** Simuloitu latausaika millisekunteina (0 = ääretön) */
  loadingTime?: number;
}

/**
 * `TopLoadingBarIndicator` - Yläreunan latauspalkki
 * 
 * Näyttää yläreunan latauspalkin, joka indikoi sivun tai sisällön latautumista.
 * Palkki simuloi edistymistä animaation avulla.
 * 
 * @example
 * // Peruskäyttö
 * <TopLoadingBarIndicator />
 * 
 * @example
 * // Muokattu ulkoasu
 * <TopLoadingBarIndicator 
 *   color="#ff0099" 
 *   height={3} 
 *   loadingTime={3000} 
 * />
 * 
 * @example
 * // Viiveellä alkava latausanimaatio
 * <TopLoadingBarIndicator delay={200} />
 * 
 * @param {TopLoadingBarIndicatorProps} props - Komponentin propsit
 * @returns {JSX.Element | null} Renderöity latauspalkki tai null
 */
export const TopLoadingBarIndicator = memo(function TopLoadingBarIndicator({
  className,
  delay = 0,
  color,
  height = 2,
  loadingTime = 0,
}: TopLoadingBarIndicatorProps) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Käynnistä latauspalkin animaatio kun komponentti mountataan
  useEffect(() => {
    // Viivästetty näkyvyys
    const visibilityTimeout = setTimeout(() => {
      setVisible(true);
    }, delay);

    // Jos loadingTime on määritetty, simuloi latauksen valmistumista
    if (loadingTime > 0) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 98) {
            clearInterval(interval);
            // Viimeistele lataus
            setTimeout(() => {
              setProgress(100);
              setTimeout(() => setCompleted(true), 200);
            }, 500);
            return prevProgress;
          }
          // Nopeuta asteittain loppua kohti
          return prevProgress + (98 - prevProgress) / 10 + 1;
        });
      }, loadingTime / 25);

      return () => {
        clearInterval(interval);
        clearTimeout(visibilityTimeout);
      };
    } else {
      // Jos loadingTime ei ole määritetty, näytä "ääretön" lataus
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          // Päästä korkeintaan 90% asti ilman valmistumista
          if (prevProgress >= 90) {
            return prevProgress;
          }
          return prevProgress + (90 - prevProgress) / 20 + 0.5;
        });
      }, 200);

      return () => {
        clearInterval(interval);
        clearTimeout(visibilityTimeout);
      };
    }
  }, [delay, loadingTime]);

  // Piilota kun valmis
  if (completed) return null;

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-[100]',
        'pointer-events-none',
        className
      )}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-hidden="true"
      data-state={progress >= 100 ? 'complete' : 'loading'}
    >
      <div
        className={cn(
          'h-[2px] bg-primary transition-all ease-out',
          visible ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          height: `${height}px`,
          width: `${progress}%`,
          backgroundColor: color,
          transitionProperty: 'width, opacity',
          transitionDuration: '300ms',
        }}
      />
    </div>
  );
});

TopLoadingBarIndicator.displayName = 'TopLoadingBarIndicator';
