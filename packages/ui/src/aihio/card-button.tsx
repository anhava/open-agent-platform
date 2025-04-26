'use client';

import { forwardRef, memo } from 'react';
import Link from 'next/link';
import { cn } from '../lib/utils';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { ChevronRight } from 'lucide-react';

/**
 * CardButton-komponentin propsit
 */
export interface CardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Asettaa komponentin Link-komponentiksi, joka navigoi annettuun polkuun klikattaessa */
  href?: string;
  /** Valinnainen tyyliluokka komponentille */
  className?: string;
  /** Korostaa kortin aktiiviseksi (lisää erottuva ääriviiva) */
  active?: boolean;
  /** Näyttää kortin poistettuna/tuhottuna tilassa (harmaa ja läpikuultava) */
  deleted?: boolean;
  /** Määrittää kortin koon */
  size?: 'default' | 'lg' | 'sm';
  /** Kortin sisältö */
  children: React.ReactNode;
}

/**
 * `CardButton` - Interaktiivinen korttipainike
 * 
 * Komponentti luo painikkeena tai linkkinä toimivan kortin, joka reagoi 
 * hover- ja focus-tiloihin. Tukee eri kokoja ja tiloja (aktiivinen, poistettu).
 * 
 * @example
 * // Peruskorttipainike
 * <CardButton onClick={handleClick}>
 *   <h3>Otsikko</h3>
 *   <p>Lisätiedot...</p>
 * </CardButton>
 * 
 * @example
 * // Linkkinä toimiva kortti
 * <CardButton href="/kohde" size="lg" active={true}>
 *   <IconDocument />
 *   <span>Avaa dokumentti</span>
 * </CardButton>
 * 
 * @example
 * // Poistettu kortti
 * <CardButton deleted={true}>
 *   <span>Tämä kortti on poistettu</span>
 * </CardButton>
 * 
 * @param {CardButtonProps} props - Komponentin propsit
 * @returns {JSX.Element} Renderöity korttipainike
 */
export const CardButton = memo(forwardRef<HTMLButtonElement, CardButtonProps>(
  function CardButton({
    className,
    href,
    active,
    deleted,
    size = 'default',
    children,
    ...props
  }, ref) {
    // Perustyylit kaikille CardButton-komponenteille
    const baseStyles = cn(
      'relative flex w-full items-center rounded-lg border p-4 text-left',
      'transition-colors duration-200 ease-in-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      {
        'border-border/50 bg-card text-card-foreground hover:border-border hover:bg-accent/30':
          !active && !deleted,
        'border-primary/30 bg-primary/5 hover:bg-primary/10': active && !deleted,
        'border-dashed border-border/50 bg-muted/50 text-muted-foreground hover:bg-muted/70':
          deleted,
        'p-6': size === 'lg',
        'py-2 px-3': size === 'sm',
      },
      className,
    );

    // Renderöi Link jos href on määritelty, muuten button
    if (href) {
      return (
        <Link
          href={href}
          className={baseStyles}
          aria-current={active ? 'page' : undefined}
          role="button"
          tabIndex={0}
          data-active={active ? "true" : undefined}
          data-size={size}
        >
          {active && (
            <span
              className="absolute inset-y-0 left-0 w-0.5 rounded-l-lg bg-primary"
              aria-hidden="true"
            />
          )}
          {children}
        </Link>
      );
    }

    return (
      <button
        type="button"
        className={baseStyles}
        data-state={active ? "active" : undefined}
        data-size={size}
        ref={ref}
        {...props}
      >
        {active && (
          <span
            className="absolute inset-y-0 left-0 w-0.5 rounded-l-lg bg-primary"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
));

CardButton.displayName = 'CardButton';

/**
 * CardButtonTitle-komponentin propsit
 */
export interface CardButtonTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Käytetäänkö Slot-komponenttia */
  asChild?: boolean;
  /** Komponentin sisältö */
  children: React.ReactNode;
}

/**
 * `CardButtonTitle` - Kortin otsikkokomponentti
 * 
 * @example
 * <CardButton>
 *   <CardButtonTitle>Otsikko</CardButtonTitle>
 * </CardButton>
 */
export const CardButtonTitle = memo(forwardRef<HTMLDivElement, CardButtonTitleProps>(
  function CardButtonTitle({ className, asChild, children, ...props }, ref) {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={cn(
          'text-muted-foreground group-hover:text-secondary-foreground align-super text-sm font-medium transition-colors',
          className
        )}
        {...props}
      >
        {asChild ? children : <Slottable>{children}</Slottable>}
      </Comp>
    );
  }
));

CardButtonTitle.displayName = 'CardButtonTitle';

/**
 * CardButtonHeader-komponentin propsit
 */
export interface CardButtonHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Komponentin sisältö */
  children: React.ReactNode;
  /** Käytetäänkö Slot-komponenttia */
  asChild?: boolean;
  /** Näytetäänkö nuoli-ikoni */
  displayArrow?: boolean;
}

/**
 * `CardButtonHeader` - Kortin yläosan komponentti
 * 
 * @example
 * <CardButton>
 *   <CardButtonHeader>
 *     <CardButtonTitle>Otsikko</CardButtonTitle>
 *   </CardButtonHeader>
 * </CardButton>
 */
export const CardButtonHeader = memo(forwardRef<HTMLDivElement, CardButtonHeaderProps>(
  function CardButtonHeader({
    className,
    asChild,
    displayArrow = true,
    children,
    ...props
  }, ref) {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp ref={ref} className={cn('p-4', className)} {...props}>
        {asChild ? children : (
          <>
            {children}
            {displayArrow && (
              <ChevronRight
                className={cn(
                  'text-muted-foreground group-hover:text-secondary-foreground absolute top-4 right-2 h-4 transition-colors'
                )}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </Comp>
    );
  }
));

CardButtonHeader.displayName = 'CardButtonHeader';

/**
 * CardButtonContent-komponentin propsit
 */
export interface CardButtonContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Käytetäänkö Slot-komponenttia */
  asChild?: boolean;
  /** Komponentin sisältö */
  children: React.ReactNode;
}

/**
 * `CardButtonContent` - Kortin sisältöalue
 * 
 * @example
 * <CardButton>
 *   <CardButtonContent>
 *     <p>Sisältö</p>
 *   </CardButtonContent>
 * </CardButton>
 */
export const CardButtonContent = memo(forwardRef<HTMLDivElement, CardButtonContentProps>(
  function CardButtonContent({ className, asChild, children, ...props }, ref) {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp ref={ref} className={cn('flex flex-1 flex-col px-4', className)} {...props}>
        {asChild ? children : <Slottable>{children}</Slottable>}
      </Comp>
    );
  }
));

CardButtonContent.displayName = 'CardButtonContent';

/**
 * CardButtonFooter-komponentin propsit
 */
export interface CardButtonFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Käytetäänkö Slot-komponenttia */
  asChild?: boolean;
  /** Komponentin sisältö */
  children: React.ReactNode;
}

/**
 * `CardButtonFooter` - Kortin alaosan komponentti
 * 
 * @example
 * <CardButton>
 *   <CardButtonFooter>
 *     <span>Alaosa</span>
 *   </CardButtonFooter>
 * </CardButton>
 */
export const CardButtonFooter = memo(forwardRef<HTMLDivElement, CardButtonFooterProps>(
  function CardButtonFooter({ className, asChild, children, ...props }, ref) {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={cn(
          'mt-auto flex h-0 w-full flex-col justify-center border-t px-4',
          className
        )}
        {...props}
      >
        {asChild ? children : <Slottable>{children}</Slottable>}
      </Comp>
    );
  }
));

CardButtonFooter.displayName = 'CardButtonFooter';
