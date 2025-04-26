# Changelog

Kaikki merkittävät muutokset tähän projektiin dokumentoidaan tässä tiedostossa.

## [Julkaisematon] - 2023-12-XX

### Lisätty
- Kattava JSDoc-dokumentaatio kaikille komponenteille käyttöesimerkkeineen
- Suomenkieliset käännökset kaikille komponenttitoiminnoille ja ohjeille

### Muutettu
- Päivitetty React 19.1 ja Next.js 15.3.1 yhteensopivuus kaikille komponenteille
- Optimoitu TailwindCSS 4.14 syntaksi

### Parannettu

#### CookieBanner
- Uudistettu ulkoasu modernimmaksi ja responsiivisemmaksi
- Lisätty uusia kustomointivaihtoehtoja: sijainti, koko, sulkupainike
- Parannettu esteettömyyttä ja virheiden käsittelyä
- Optimoitu React 19:lle (memo, useMemo, useCallback)
- Lisätty kattava JSDoc-dokumentaatio ja käyttöesimerkit

#### GlobalLoader
- Uudistettu ja monipuolistettu latauskomponentti
- Lisätty uusia ominaisuuksia: viiveet, viestit, logo-näyttö
- Parannettu animaatioita ja esteettömyyttä (role, aria-live)
- Optimoitu React 19:lle (memo)
- Lisätty kattava JSDoc-dokumentaatio ja käyttöesimerkit

#### LoadingOverlay (UUSI)
- Luotu uusi helper-komponentti GlobalLoaderille
- Näyttää spinnerin ja valinnaisen logon/viestin
- Tukee koko sivun peittoa ja kustomoituja värejä/kokoja
- Optimoitu React 19:lle (memo)
- Lisätty kattava JSDoc-dokumentaatio ja käyttöesimerkit

#### TopLoadingBarIndicator (UUSI)
- Luotu uusi helper-komponentti GlobalLoaderille
- Toteutettu ilman ulkoisia riippuvuuksia (react-top-loading-bar poistettu)
- Simuloitu latauspalkki animaatiolla
- Lisätty kustomointivaihtoehdot: väri, korkeus, kesto, viive
- Optimoitu React 19:lle (memo)
- Lisätty kattava JSDoc-dokumentaatio ja käyttöesimerkit

#### TopLoadingBarIndicator
- Lisätty 'use client' -direktiivi turvaamaan SSR-yhteensopivuus
- Optimoitu React.memo-suorituskyvyn parantamiseksi
- Lisätty z-index (z-[100]) latauspalkin näkyvyyden varmistamiseksi
- Parannettu dokumentaatiota käyttötarkoituksesta ja -esimerkeistä
- Lisätty displayName kehittäjätyökalujen tunnistusta varten

#### ProfileAvatar
- Lisätty 'use client' -direktiivi
- Optimoitu React.memo memoization-tekniikalla
- Lisätty alt-teksti AvatarImage-komponentille esteettömyyden parantamiseksi
- Parannettu animaatio- ja siirtymätyylejä (transition-all)
- Lisätty delayMs-parametri fallback-näytölle
- Lisätty lazy loading -tuki kuvien lataukseen

#### Spinner
- Täysin uudistettu toteutus esteettömyyden parantamiseksi
- Lisätty eri kokoluokat (sm, md, lg, xl) joustavuuden lisäämiseksi
- Lisätty aria-label tuki ruudunlukijoille
- Parannettu CSS-luokkien hallintaa cn-apufunktiolla
- Lisätty sr-only -teksti esteettömyyden parantamiseksi

#### Stepper
- Vaihdettu useCallback → useMemo suorituskyvyn optimoimiseksi
- Parannettu esteettömyystukea (role="tablist", aria-current, jne.)
- Uudistettu tyylimäärittelyjä modernilla Tailwind-syntaksilla
- Lisätty tehokkaampi tilanhallinta
- Parannettu komponenttien nimeämistä ja dokumentaatiota
- Lisätty conditional rendering complete-tilalle divider-komponentissa

#### EmptyState
- Uudistettu rakenne ja tyylit, lisätty `EmptyStateIcon`-alikomponentti.
- Parannettu responsiivisuutta ja esteettömyyttä.
- Optimoitu React 19:lle (memo, forwardRef).
- Lisätty kattava JSDoc-dokumentaatio ja käyttöesimerkit.

#### ImageUploadInput
- Parannettu UI/UX: selkeämpi layout, parempi virheiden käsittely (implisiittisesti), parempi fokus-hallinta.
- Tehty koodista modulaarisempi ja luettavampi.
- Optimoitu React 19:lle (memo, forwardRef, useCallback).
- Varmistettu `URL.createObjectURL` ja `revokeObjectURL` oikea käyttö muistivuotojen estämiseksi.
- Lisätty kattava JSDoc-dokumentaatio ja käyttöesimerkit.

#### ImageUploader
- Integroitu paremmin `ImageUploadInput` ja `react-hook-form` (`useFormContext`).
- Yksinkertaistettu tilanhallintaa ja logiikkaa.
- Lisätty koon (`size`) prop kustomointia varten.
- Parannettu UI/UX: selkeämpi poista-painike.
- Optimoitu React 19:lle (memo, forwardRef, useCallback).
- Lisätty kattava JSDoc-dokumentaatio ja käyttöesimerkit.

#### LanguageSelector
- Parannettu virheiden käsittelyä (esim. `Intl.DisplayNames` tuki).
- Lisätty `showIcon` prop.
- Parempi tyylien kustomointi (`triggerClassName`, `contentClassName`).
- Optimoitu React 19:lle (memo, useCallback).
- Lisätty kattava JSDoc-dokumentaatio ja käyttöesimerkit.

#### LazyRender
- Lisätty `as` prop wrapper-elementin kustomointiin.
- Parannettu IntersectionObserverin käsittelyä ja siivousta.
- Optimoitu React 19:lle (memo).
- Lisätty kattava JSDoc-dokumentaatio ja käyttöesimerkit.

#### MobileNavigationDropdown
- Yhdistetty `MobileNavigationMenu`-komponentin kanssa (duplikaatio poistettu).
- Lisätty ikonituki linkeille.
- Parannettu aktiivisen linkin tunnistusta.
- Lisätty kustomointivaihtoehtoja (menuLabel, triggerIcon, triggerClassName, contentClassName).
- Optimoitu React 19:lle (memo).
- Lisätty kattava JSDoc-dokumentaatio ja käyttöesimerkit.

#### ModeToggle & SubMenuModeToggle
- Parannettu UI/UX: `SubMenuModeToggle` käyttää nyt `DropdownMenuRadioGroup`ia.
- Optimoitu React 19:lle (memo).
- Lisätty kattava JSDoc-dokumentaatio ja käyttöesimerkit.

#### MultiStepForm
- Uudistettu animaatiot (käyttäen `tailwindcss-animate` luokkia).
- Parannettu fokuksen hallintaa vaiheiden välillä.
- Lisätty tuki asynkroniselle `onSubmit`-funktiolle `useMutation`-hookin avulla.
- Selkeytetty tyypityksiä ja sisäistä logiikkaa.
- Parannettu virheiden käsittelyä ja vaiheiden validointia.
- Optimoitu React 19:lle (memo, forwardRef, useCallback, useMemo).
- Lisätty kattava JSDoc-dokumentaatio ja käyttöesimerkit.

### Korjattu
- String literal -syntaksi tyylimäärittelyissä ([] → '')
- Tarpeettomat uudelleenrenderöinnit memo-optimoinneilla
- Korjattu hydraatio-varoitukset lisäämällä suppressHydrationWarning
- Parannettu esteettömyyttä ARIA-attribuuteilla 