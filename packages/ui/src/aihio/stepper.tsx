'use client';

import { Fragment, useCallback, useMemo, memo } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { If } from './if';
import { Trans } from './trans';

/**
 * Stepper-komponentin ulkoasutyylit
 */
type Variant = 'numbers' | 'default' | 'dots';

const classNameBuilder = getClassNameBuilder();

/**
 * Stepper-komponentin props-rajapinta
 */
interface StepperProps {
  /** Vaiheita kuvaavat tekstit tai käännösavaimet */
  steps: string[];
  /** Nykyinen aktiivinen vaihe (0-pohjainen indeksi) */
  currentStep: number;
  /** Komponentin ulkoasutyyli */
  variant?: Variant;
}

/**
 * `Stepper` - Vaiheistuskomponentti
 * 
 * Näyttää prosessin tai työnkulun vaiheet visuaalisena indikaattorina.
 * Tukee kolmea eri ulkoasutyyliä ja osoittaa selkeästi käyttäjälle missä
 * vaiheessa prosessia he ovat.
 * 
 * Optimoitu muistinkäytön ja renderöinnin osalta, tukee käännöksiä ja
 * on täysin responsiivinen.
 * 
 * @example
 * // Peruskäyttö default-tyylillä
 * const steps = ['Perustiedot', 'Vahvistus', 'Valmis'];
 * 
 * function WizardForm() {
 *   const [currentStep, setCurrentStep] = useState(0);
 *   
 *   return (
 *     <div>
 *       <Stepper steps={steps} currentStep={currentStep} />
 *       {/* Lomakkeen sisältö vaiheittain */}
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Eri tyylien käyttö
 * <Stepper 
 *   steps={['Vaihe 1', 'Vaihe 2', 'Vaihe 3']} 
 *   currentStep={1}
 *   variant="numbers" 
 * />
 * 
 * <Stepper 
 *   steps={['Valitse', 'Vahvista', 'Maksa', 'Valmis']} 
 *   currentStep={2}
 *   variant="dots" 
 * />
 * 
 * @example
 * // i18n käännösavaimien käyttö
 * <Stepper 
 *   steps={['steps.start', 'steps.configure', 'steps.complete']} 
 *   currentStep={0} 
 * />
 * 
 * @param {StepperProps} props - Komponentin propsit
 * @returns {JSX.Element | null} Renderöity Stepper tai null, jos vaiheita on alle 2
 */
export const Stepper = memo(function Stepper(props: StepperProps) {
  const variant = props.variant ?? 'default';

  // Lasketaan vaihenäkymä vain kun propsit muuttuvat
  const Steps = useMemo(() => {
    return props.steps.map((labelOrKey, index) => {
      const selected = props.currentStep === index;
      const complete = props.currentStep > index;

      const className = classNameBuilder({
        selected,
        variant,
        complete,
      });

      const isNumberVariant = variant === 'numbers';
      const isDotsVariant = variant === 'dots';

      const labelClassName = cn({
        'px-1.5 py-2 text-xs': !isNumberVariant,
        'hidden': isDotsVariant,
      });

      const { label, number } = getStepLabel(labelOrKey, index);

      return (
        <Fragment key={index}>
          <div 
            aria-selected={selected} 
            aria-current={selected ? 'step' : undefined}
            className={className}
            role="tab"
          >
            <span className={labelClassName}>
              {number}
              <If condition={!isNumberVariant}>. {label}</If>
            </span>
          </div>

          <If condition={isNumberVariant}>
            <StepDivider selected={selected} complete={complete}>
              {label}
            </StepDivider>
          </If>
        </Fragment>
      );
    });
  }, [props.steps, props.currentStep, variant]);

  // Jos vaiheita on alle 2, ei renderöidä mitään
  if (props.steps.length < 2) {
    return null;
  }

  const containerClassName = cn('w-full', {
    'flex justify-between': variant === 'numbers',
    'flex space-x-0.5': variant === 'default',
    'flex gap-x-4 self-center': variant === 'dots',
  });

  return (
    <div 
      className={containerClassName} 
      role="tablist" 
      aria-label="Prosessin vaiheet"
    >
      {Steps}
    </div>
  );
});

Stepper.displayName = 'Stepper';

/**
 * `StepDivider` - Näyttää vaiheiden välisen jakajan numbers-tyylissä
 * 
 * @param {object} props - Komponentin propsit
 * @param {boolean} props.selected - Onko tämä vaihe valittu
 * @param {boolean} props.complete - Onko tämä vaihe suoritettu
 * @param {React.ReactNode} props.children - Lapsikomponentit (vaiheen nimi)
 * @returns {JSX.Element} Renderöity jakaja
 */
const StepDivider = memo(function StepDivider({
  selected,
  complete,
  children,
}: React.PropsWithChildren<{
  selected: boolean;
  complete: boolean;
}>) {
  const spanClassName = cn('min-w-max text-sm font-medium', {
    'text-muted-foreground hidden sm:flex': !selected,
    'text-secondary-foreground': selected || complete,
    'font-medium': selected,
  });

  const className = cn(
    'flex h-9 flex-1 items-center justify-center last:flex-[0_0_0]',
    'group flex w-full items-center space-x-3 px-3',
  );

  return (
    <div className={className}>
      <span className={spanClassName}>{children}</span>

      <div
        className={cn(
          'divider h-[1px] w-full bg-gray-200 transition-colors dark:bg-border',
          'hidden group-last:hidden sm:flex',
          {
            'bg-primary dark:bg-primary': complete,
          }
        )}
      />
    </div>
  );
});

StepDivider.displayName = 'StepDivider';

/**
 * Hakee vaiheen otsikon ja numeron
 * Tukee i18n-käännöksiä
 * 
 * @param {string} labelOrKey - Joko suora otsikko tai käännösavain
 * @param {number} index - Vaiheen indeksi (0-pohjainen)
 * @returns {{number: string, label: JSX.Element}} Vaiheen numero ja otsikko
 */
function getStepLabel(labelOrKey: string, index: number) {
  const number = (index + 1).toString();

  return {
    number,
    label: <Trans i18nKey={labelOrKey} defaults={labelOrKey} />,
  };
}

/**
 * Määrittelee stepper-komponentin tyylivariantit
 * @returns {function} CVA (class-variance-authority) funktio tyylien generointiin
 */
function getClassNameBuilder() {
  return cva(``, {
    variants: {
      variant: {
        default: `flex h-[2.5px] w-full flex-col transition-all duration-500`,
        numbers:
          'flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold',
        dots: 'bg-muted h-2.5 w-2.5 rounded-full transition-colors',
      },
      selected: {
        true: '',
        false: 'hidden sm:flex',
      },
      complete: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        selected: false,
        className: 'text-muted-foreground',
      },
      {
        variant: 'default',
        selected: true,
        className: 'bg-primary font-medium',
      },
      {
        variant: 'default',
        selected: false,
        complete: false,
        className: 'bg-muted',
      },
      {
        variant: 'default',
        selected: false,
        complete: true,
        className: 'bg-primary',
      },
      {
        variant: 'numbers',
        selected: false,
        complete: true,
        className: 'border-primary text-primary',
      },
      {
        variant: 'numbers',
        selected: true,
        className: 'border-primary bg-primary text-primary-foreground',
      },
      {
        variant: 'numbers',
        selected: false,
        className: 'text-muted-foreground',
      },
      {
        variant: 'dots',
        selected: true,
        complete: true,
        className: 'bg-primary',
      },
      {
        variant: 'dots',
        selected: false,
        complete: true,
        className: 'bg-primary',
      },
      {
        variant: 'dots',
        selected: true,
        complete: false,
        className: 'bg-primary',
      },
      {
        variant: 'dots',
        selected: false,
        complete: false,
        className: 'bg-muted',
      },
    ],
    defaultVariants: {
      variant: 'default',
      selected: false,
    },
  });
}
