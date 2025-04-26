'use client';

import { memo } from 'react';
import { cn } from '../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';

/**
 * Käyttäjän profiilikuvakomponentti, joka näyttää käyttäjän avatarin.
 * Voi näyttää joko käyttäjän kuvan tai nimestä/tekstistä generoidun kirjaimen.
 */
type SessionProps = {
  /** Käyttäjän näytettävä nimi */
  displayName: string | null;
  /** URL käyttäjän profiilikuvaan */
  pictureUrl?: string | null;
};

/**
 * Tekstiin perustuva avatar, kun käytetään ilman käyttäjäsessiota.
 */
type TextProps = {
  /** Teksti, josta generoidaan avatarin kirjain */
  text: string;
};

type ProfileAvatarProps = (SessionProps | TextProps) & {
  /** CSS-luokat avatar-containerille */
  className?: string;
  /** CSS-luokat fallback-sisällölle */
  fallbackClassName?: string;
};

/**
 * `ProfileAvatar` - Käyttäjän avatar-komponentti
 * 
 * Näyttää käyttäjän profiilikuvan tai generoi fallback-kirjaimen käyttäjän nimestä.
 * Komponentti tukee kahta eri käyttötapaa:
 * 1. Käyttäjäsessioon perustuva (displayName + valinnainen pictureUrl)
 * 2. Yksittäiseen tekstiin perustuva (text)
 * 
 * @example
 * // Käyttö session tietojen kanssa
 * <ProfileAvatar 
 *   displayName="Matti Meikäläinen"
 *   pictureUrl="https://esimerkki.fi/kuva.jpg"
 * />
 * 
 * @example
 * // Käyttö pelkän tekstin kanssa
 * <ProfileAvatar 
 *   text="Projektin Nimi" 
 *   className="h-12 w-12"
 * />
 * 
 * @example
 * // Mukautetulla tyylillä
 * <ProfileAvatar 
 *   displayName="Käyttäjä"
 *   className="h-20 w-20 border-2 border-primary" 
 *   fallbackClassName="bg-secondary text-secondary-foreground"
 * />
 * 
 * @param {ProfileAvatarProps} props - Komponentin parametrit
 * @returns {JSX.Element} Avatar-komponentti
 */
export const ProfileAvatar = memo(function ProfileAvatar(props: ProfileAvatarProps) {
  const avatarClassName = cn(
    'mx-auto h-9 w-9 group-focus:ring-2 transition-all',
    props.className,
  );

  if ('text' in props) {
    return (
      <Avatar className={avatarClassName}>
        <AvatarFallback
          className={cn(
            'animate-in fade-in uppercase text-center',
            props.fallbackClassName,
          )}
        >
          {props.text.slice(0, 1)}
        </AvatarFallback>
      </Avatar>
    );
  }

  const initials = props.displayName?.slice(0, 1);

  return (
    <Avatar className={avatarClassName}>
      <AvatarImage 
        src={props.pictureUrl ?? undefined} 
        alt={props.displayName ?? 'Käyttäjä'}
        loading="lazy"
      />

      <AvatarFallback
        className={cn('animate-in fade-in', props.fallbackClassName)}
        delayMs={600}
      >
        <span suppressHydrationWarning className="uppercase">
          {initials}
        </span>
      </AvatarFallback>
    </Avatar>
  );
});

ProfileAvatar.displayName = 'ProfileAvatar';
