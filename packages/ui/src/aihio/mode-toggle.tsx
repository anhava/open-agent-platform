'use client';


import { Computer, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '../lib/utils';
import { Button } from '../components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../components/dropdown-menu';
import { Trans } from './trans';

const THEME_MODES = ['light', 'dark', 'system'] as const;
type ThemeMode = typeof THEME_MODES[number];

/**
 * Tallentaa teeman evästeeseen.
 * @param {ThemeMode} theme - Tallennettava teema.
 */
function setCookieTheme(theme: ThemeMode) {
  // Varmista, että suoritetaan vain selaimessa
  if (typeof document !== 'undefined') {
    document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
  }
}

/**
 * Renderöi teemaa vastaavan ikonin.
 * @param {object} props - Propsit.
 * @param {ThemeMode | undefined} props.theme - Aktiivinen teema.
 * @param {string} [props.className] - Lisäluokat ikonille.
 * @returns {JSX.Element | null} Ikoni-elementti.
 */
const ThemeIcon = memo(function ThemeIcon({ theme, className }: { theme: ThemeMode | undefined, className?: string }) {
  switch (theme) {
    case 'light':
      return <Sun className={cn("h-4 w-4", className)} aria-hidden="true" />;
    case 'dark':
      return <Moon className={cn("h-4 w-4", className)} aria-hidden="true" />;
    case 'system':
      return <Computer className={cn("h-4 w-4", className)} aria-hidden="true" />;
    default:
      return null; // Tai jokin oletusikoni
  }
});
ThemeIcon.displayName = 'ThemeIcon';

/**
 * ModeToggle-komponentin propsit
 */
interface ModeToggleProps {
  /** Lisäluokat painikkeelle */
  className?: string;
  /** Tasaus pudotusvalikolle */
  align?: DropdownMenuContentProps['align'];
}

/**
 * `ModeToggle` - Painike teeman vaihtamiseen (valoisa, tumma, järjestelmä).
 * 
 * Näyttää painikkeen, josta avautuu pudotusvalikko teeman valintaa varten.
 * Hyödyntää `next-themes` kirjastoa teeman hallintaan.
 * 
 * @example
 * <ModeToggle align="end" />
 * 
 * @param {ModeToggleProps} props - Komponentin propsit.
 * @returns {JSX.Element} Teemanvaihtopainike.
 */
export const ModeToggle = memo(function ModeToggle({ 
  className,
  align = "end", // Oletus tasaus
}: ModeToggleProps) {
  const { setTheme, theme } = useTheme();

  // Muodosta valikon kohdat
  const themeItems = useMemo(() => {
    return THEME_MODES.map((mode) => (
      <DropdownMenuItem
        key={mode}
        className="cursor-pointer gap-2"
        onClick={() => {
          setTheme(mode);
          setCookieTheme(mode);
        }}
        aria-selected={theme === mode}
      >
        <ThemeIcon theme={mode} />
        <Trans i18nKey={`common:${mode}Theme`} defaults={mode.charAt(0).toUpperCase() + mode.slice(1)} />
      </DropdownMenuItem>
    ));
  }, [setTheme, theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("relative h-8 w-8", className)} aria-label="Vaihda teema">
          <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {themeItems}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
ModeToggle.displayName = 'ModeToggle';

/**
 * `SubMenuModeToggle` - Teemanvaihtokomponentti osana toista valikkoa.
 * 
 * Tarjoaa teemanvaihtotoiminnallisuuden alavalikkona (`DropdownMenuSub`).
 * Suunniteltu käytettäväksi esimerkiksi käyttäjävalikon sisällä.
 * Mobiililaitteilla näyttää vaihtoehdot suoraan päävalikossa.
 * 
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="ghost">Avaa valikko</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Profiili</DropdownMenuItem>
 *     <SubMenuModeToggle />
 *     <DropdownMenuItem>Kirjaudu ulos</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * 
 * @returns {JSX.Element} Teemanvaihto alavalikkona.
 */
export const SubMenuModeToggle = memo(function SubMenuModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();

  // Käytetään radio-ryhmää paremman esteettömyyden ja käyttökokemuksen vuoksi
  const handleThemeChange = (value: string) => {
    const newTheme = value as ThemeMode;
    setTheme(newTheme);
    setCookieTheme(newTheme);
  };

  return (
    <>
      {/* Näytetään alavalikkona isommilla näytöillä */}
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex cursor-pointer items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <ThemeIcon theme={resolvedTheme as ThemeMode} />
            <Trans i18nKey="common:theme" defaults="Teema" />
          </span>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup value={theme} onValueChange={handleThemeChange}>
            {THEME_MODES.map((mode) => (
              <DropdownMenuRadioItem key={mode} value={mode} className="cursor-pointer gap-2">
                <ThemeIcon theme={mode} />
                <Trans i18nKey={`common:${mode}Theme`} defaults={mode.charAt(0).toUpperCase() + mode.slice(1)} />
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      {/* Näytetään suorina itemeinä pienemmillä näytöillä (CSS hoitaa piilotuksen) - TÄMÄ OSIO VOIDAAN POISTAA JOS EI TARVITA */}
      {/* 
      <div className="lg:hidden">
        <DropdownMenuSeparator className="lg:hidden" />
        <DropdownMenuLabel className="lg:hidden">
          <Trans i18nKey="common:theme" defaults="Teema" />
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={handleThemeChange} className="lg:hidden">
          {THEME_MODES.map((mode) => (
            <DropdownMenuRadioItem key={mode + '-mobile'} value={mode} className="cursor-pointer gap-2">
              <ThemeIcon theme={mode} />
              <Trans i18nKey={`common:${mode}Theme`} defaults={mode.charAt(0).toUpperCase() + mode.slice(1)} />
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </div>
      */}
    </>
  );
});
SubMenuModeToggle.displayName = 'SubMenuModeToggle';
