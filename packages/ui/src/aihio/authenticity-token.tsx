'use client';

import { memo, useMemo } from 'react';

/**
 * Hakee CSRF-tokenin HTML-metatagista.
 * 
 * @returns {string} CSRF-token tai tyhjä merkkijono, jos tokenia ei löydy tai komponentti renderöidään palvelimella
 */
function useCsrfToken() {
  // Tarkistetaan suoritetaanko koodi selaimessa vai palvelimella
  if (typeof window === 'undefined') return '';

  // Haetaan CSRF-token meta-elementistä
  return useMemo(() => (
    document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content') ?? ''
  ), []);
}

/**
 * `AuthenticityToken` - CSRF-suojauskomponentti lomakkeisiin
 * 
 * Lisää lomakkeisiin piilotetun input-elementin, joka sisältää CSRF-tokenin.
 * Tämä suojaa sovellusta Cross-Site Request Forgery -hyökkäyksiltä.
 * 
 * Komponentti hakee tokenin automaattisesti meta-elementistä, jonka nimi on "csrf-token".
 * Varmista, että HTML-dokumentissa on asianmukainen meta-elementti:
 * `<meta name="csrf-token" content="token_arvo_tähän">`
 * 
 * @example
 * // Käyttö lomakkeen sisällä
 * <form method="post" action="/api/submit">
 *   <AuthenticityToken />
 *   <input type="text" name="name" />
 *   <button type="submit">Lähetä</button>
 * </form>
 * 
 * @returns {JSX.Element} Piilotettu input-elementti CSRF-tokenilla
 */
export const AuthenticityToken = memo(function AuthenticityToken() {
  const token = useCsrfToken();

  // data-testid helpottaa testausta
  return (
    <input 
      type="hidden" 
      name="csrf_token" 
      value={token} 
      data-testid="csrf-token-input" 
      aria-hidden="true"
    />
  );
});

AuthenticityToken.displayName = 'AuthenticityToken';
