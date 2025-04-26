'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '../components/select';
import { Languages } from 'lucide-react';

/**
 * LanguageSelector-komponentin propsit
 */
export interface LanguageSelectorProps {
  /** Kutsutaan kun kieli vaihdetaan */
  onChange?: (locale: string) => void;
  /** Näytetäänkö ikoni */
  showIcon?: boolean;
  /** Lisäluokat trigger-elementille */
  triggerClassName?: string;
  /** Lisäluokat sisältöelementille */
  contentClassName?: string;
}

/**
 * `LanguageSelector` - Komponentti kielen valintaan
 * 
 * Tarjoaa dropdown-valikon, josta käyttäjä voi valita sovelluksen kielen.
 * Hyödyntää `react-i18next` kirjastoa kielenvaihtoon ja käännösten hallintaan.
 * 
 * @example
 * // Peruskäyttö
 * <LanguageSelector />
 * 
 * @example
 * // Muokatulla triggerillä ja ikonilla
 * <LanguageSelector 
 *   showIcon 
 *   triggerClassName="w-[150px]"
 *   onChange={(locale) => console.log('Kieli vaihdettu:', locale)}
 * />
 * 
 * @param {LanguageSelectorProps} props - Komponentin propsit
 * @returns {JSX.Element} Renderöity kielivalintakomponentti
 */
export const LanguageSelector = memo(function LanguageSelector({
  onChange,
  showIcon = false,
  triggerClassName,
  contentClassName,
}: LanguageSelectorProps) {
  const { i18n } = useTranslation();
  const { language: currentLanguage, options } = i18n;
  const [value, setValue] = useState(currentLanguage);

  // Suodata pois 'cimode', jota käytetään usein i18nextin kehitystyössä
  const locales = useMemo(() => 
    (options.supportedLngs as string[] || []).filter(
      (locale) => locale.toLowerCase() !== 'cimode'
    ), [options.supportedLngs]);

  // Muodosta kielten nimet nykyisellä kielellä
  const languageNames = useMemo(() => {
    try {
      return new Intl.DisplayNames([currentLanguage], { type: 'language' });
    } catch (e) {
      console.error('Intl.DisplayNames ei ole tuettu:', e);
      // Fallback: käytä locale-koodeja niminä
      return {
        of: (locale: string) => locale
      };
    }
  }, [currentLanguage]);

  // Käsittele kielen vaihto
  const handleLanguageChange = useCallback(async (locale: string) => {
    if (locale === value) return; // Älä tee mitään jos kieli on sama
    
    setValue(locale);
    onChange?.(locale);

    try {
      await i18n.changeLanguage(locale);
      // Välttämätön usein Next.js:ssä varmistamaan, että kaikki osat päivittyvät
      window.location.reload(); 
    } catch (error) {
      console.error('Kielen vaihto epäonnistui:', error);
      // Palauta edellinen arvo virhetilanteessa
      setValue(currentLanguage);
    }
  }, [i18n, onChange, value, currentLanguage]);

  // Muodosta valikkoelementit
  const selectItems = useMemo(() => locales.map((locale) => {
    const label = languageNames.of(locale);
    // Varmista, että label on merkkijono ja tee siitä isolla alkukirjaimella
    const capitalizedLabel = typeof label === 'string' ? capitalize(label) : locale.toUpperCase();
    
    return (
      <SelectItem value={locale} key={locale}>
        {capitalizedLabel}
      </SelectItem>
    );
  }), [locales, languageNames]);

  // Jos kieliä ei ole saatavilla, älä renderöi mitään
  if (locales.length === 0) {
    console.warn('LanguageSelector: Ei tuettuja kieliä määritelty i18next-konfiguraatiossa.');
    return null;
  }

  return (
    <Select value={value} onValueChange={handleLanguageChange}>
      <SelectTrigger 
        className={cn('w-auto min-w-[100px]', triggerClassName)}
        aria-label="Valitse kieli"
      >
        {showIcon && <Languages className="mr-2 h-4 w-4 text-muted-foreground" />}
        <SelectValue placeholder="Valitse kieli" />
      </SelectTrigger>

      <SelectContent 
        className={cn('min-w-[100px]', contentClassName)}
        position="popper" 
        sideOffset={5}
      >
        {selectItems}
      </SelectContent>
    </Select>
  );
});

LanguageSelector.displayName = 'LanguageSelector';

/**
 * Muuttaa merkkijonon ensimmäisen kirjaimen isoksi.
 * @param {string} str - Muokattava merkkijono.
 * @returns {string} Muokattu merkkijono.
 */
function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
