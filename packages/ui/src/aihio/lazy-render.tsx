'use client';

import { memo, createRef, useLayoutEffect, useMemo, useState } from 'react';
import { cn } from '../lib/utils'; // Oletetaan cn-funktion olemassaolo

/**
 * LazyRender-komponentin propsit
 */
export interface LazyRenderProps {
  /** Renderöitävä sisältö */
  children: React.ReactNode;
  /** Kynnysarvo (0-1), kuinka suuren osan elementistä tulee olla näkyvissä ennen renderöintiä */
  threshold?: number;
  /** Marginaali viewportin ympärillä tarkkailua varten (esim. '100px') */
  rootMargin?: string;
  /** Kutsutaan kun sisältö tulee näkyviin */
  onVisible?: () => void;
  /** Valinnainen wrapper-elementin tagi */
  as?: keyof JSX.IntrinsicElements;
  /** Lisäluokat wrapper-elementille */
  className?: string;
  /** Muut HTML-attribuutit wrapper-elementille */
  [key: string]: any; // Mahdollistaa muiden propsien välittämisen
}

/**
 * `LazyRender` - Komponentin lazy-lataus näkyvyyden perusteella
 * 
 * Renderöi lapsielementit vasta, kun ne tulevat näkyviin viewportissa.
 * Hyödyntää IntersectionObserver API:a tehokkaaseen näkyvyyden seurantaan.
 * 
 * @example
 * // Peruskäyttö: Komponentti renderöidään kun se on kokonaan näkyvissä
 * <LazyRender>
 *   <ExpensiveComponent />
 * </LazyRender>
 * 
 * @example
 * // Renderöinti kun 50% komponentista on näkyvissä ja 200px marginaalilla
 * <LazyRender threshold={0.5} rootMargin="200px">
 *   <HeavyImage src="..." />
 * </LazyRender>
 * 
 * @example
 * // Callback kun komponentti tulee näkyviin
 * <LazyRender onVisible={() => console.log('Komponentti näkyvissä!')}>
 *   <AnalyticsTracker />
 * </LazyRender>
 * 
 * @example
 * // Wrapper-elementin muuttaminen
 * <LazyRender as="section" className="custom-section">
 *   <p>Tämä on section-elementissä</p>
 * </LazyRender>
 * 
 * @param {LazyRenderProps} props - Komponentin propsit
 * @returns {JSX.Element} Renderöity komponentti tai tyhjä wrapper ennen näkyvyyttä
 */
export const LazyRender = memo(function LazyRender({
  children,
  threshold = 1, // Oletuksena vaatii koko elementin näkyvyyden
  rootMargin = '0px',
  onVisible,
  as: WrapperComponent = 'div', // Oletuswrapper on div
  className,
  ...rest
}: LazyRenderProps) {
  const ref = useMemo(() => createRef<Element>(), []);
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    // Varmista, että ref on olemassa ja window on saatavilla (client-side)
    const currentRef = ref.current;
    if (!currentRef || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Jos IntersectionObserver ei ole tuettu, renderöi heti
      setIsVisible(true);
      return;
    }

    const options = {
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setIsVisible(true);
          onVisible?.(); // Kutsu callbackia
          observerInstance.unobserve(entry.target); // Lopeta tarkkailu kun näkyvissä
          observerInstance.disconnect(); // Vapauta resurssit
        }
      });
    }, options);

    observer.observe(currentRef);

    // Siivousfunktio
    return () => {
      observer.disconnect();
    };
    // Lisää ref.current riippuvuuksiin varmistaaksesi, että efekti ajetaan uudelleen jos ref muuttuu
  }, [threshold, rootMargin, onVisible, ref]);

  return (
    <WrapperComponent ref={ref as any} className={className} {...rest}>
      {isVisible ? children : null} 
    </WrapperComponent>
  );
});

LazyRender.displayName = 'LazyRender';
