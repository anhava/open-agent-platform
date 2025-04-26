'use client';

import React, { memo, forwardRef } from 'react';
import { cn } from '../lib/utils';
import { Button, ButtonProps } from '../components/button';
import { Heading, HeadingProps } from '../components/heading';
import { Text, TextProps } from '../components/text';
import { IconType } from 'react-icons'; // Oletetaan, että käytät react-icons
import { Slot, Slottable } from '@radix-ui/react-slot';

/**
 * EmptyStateHeading-komponentin propsit
 */
export type EmptyStateHeadingProps = HeadingProps;

/**
 * `EmptyStateHeading` - Tyhjän tilan otsikko
 * @param props - HeadingProps
 * @returns {JSX.Element} Otsikkoelementti
 */
export const EmptyStateHeading = memo(forwardRef<HTMLHeadingElement, EmptyStateHeadingProps>(({ className, ...props }, ref) => (
  <Heading
    ref={ref}
    level={3} // Oletustaso 3, voidaan ylikirjoittaa
    className={cn('mt-2 text-lg font-semibold tracking-tight', className)}
    {...props}
  />
)));
EmptyStateHeading.displayName = 'EmptyStateHeading';

/**
 * EmptyStateText-komponentin propsit
 */
export type EmptyStateTextProps = TextProps;

/**
 * `EmptyStateText` - Tyhjän tilan kuvausteksti
 * @param props - TextProps
 * @returns {JSX.Element} Kappale-elementti
 */
export const EmptyStateText = memo(forwardRef<HTMLParagraphElement, EmptyStateTextProps>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('mt-1 text-sm text-muted-foreground', className)}
    {...props}
  />
)));
EmptyStateText.displayName = 'EmptyStateText';

/**
 * EmptyStateButton-komponentin propsit
 */
export type EmptyStateButtonProps = ButtonProps;

/**
 * `EmptyStateButton` - Tyhjän tilan toimintopainike
 * @param props - ButtonProps
 * @returns {JSX.Element} Painike-elementti
 */
export const EmptyStateButton = memo(forwardRef<HTMLButtonElement, EmptyStateButtonProps>(({ className, ...props }, ref) => (
  <Button ref={ref} className={cn('mt-4', className)} {...props} />
)));
EmptyStateButton.displayName = 'EmptyStateButton';

/**
 * EmptyStateIcon-komponentin propsit
 */
interface EmptyStateIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: IconType;
  iconClassName?: string;
}

/**
 * `EmptyStateIcon` - Tyhjän tilan ikoni
 * @param {EmptyStateIconProps} props - Komponentin propsit
 * @returns {JSX.Element} Ikoni-elementti
 */
export const EmptyStateIcon = memo(forwardRef<HTMLDivElement, EmptyStateIconProps>(({ icon: Icon, className, iconClassName, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground',
      className
    )}
    {...props}
  >
    <Icon className={cn('h-6 w-6', iconClassName)} aria-hidden="true" />
  </div>
)));
EmptyStateIcon.displayName = 'EmptyStateIcon';

/**
 * EmptyState-komponentin propsit
 */
interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Käytetäänkö Slot-komponenttia lapsielementtien renderöintiin */
  asChild?: boolean;
}

/**
 * `EmptyState` - Tyhjän tilan komponentti
 * 
 * Monipuolinen komponentti tyhjän tilan esittämiseen käyttöliittymässä.
 * Sisältää valmiit alakomponentit ikonille, otsikolle, tekstille ja painikkeelle.
 * 
 * @example
 * // Peruskäyttö
 * import { FolderOpen } from 'lucide-react'; // Esimerkki-ikoni
 * <EmptyState>
 *   <EmptyStateIcon icon={FolderOpen} />
 *   <EmptyStateHeading>Ei dokumentteja</EmptyStateHeading>
 *   <EmptyStateText>Aloita luomalla ensimmäinen dokumenttisi.</EmptyStateText>
 *   <EmptyStateButton onClick={handleCreate}>Luo dokumentti</EmptyStateButton>
 * </EmptyState>
 * 
 * @example
 * // Kompakti versio ilman reunuksia
 * <EmptyState className="border-none shadow-none">
 *   <EmptyStateIcon icon={FilePlus} />
 *   <EmptyStateHeading>Lisää tiedosto</EmptyStateHeading>
 * </EmptyState>
 * 
 * @param {EmptyStateProps} props - Komponentin propsit
 * @returns {JSX.Element} Renderöity tyhjän tilan komponentti
 */
export const EmptyState = memo(forwardRef<HTMLDivElement, EmptyStateProps>(({ 
  children, 
  className, 
  asChild, 
  ...props 
}, ref) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-center rounded-lg border border-dashed p-8 text-center',
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2">
        {asChild ? children : <Slottable>{children}</Slottable>}
      </div>
    </Comp>
  );
}));
EmptyState.displayName = 'EmptyState';
