'use client';

import React, {
  HTMLProps,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
  forwardRef,
  type ReactNode,
  type Ref,
  type SyntheticEvent
} from 'react';

import { Slot, Slottable } from '@radix-ui/react-slot';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { Path, UseFormReturn, FieldValues } from 'react-hook-form';
import { z, ZodType, ZodObject } from 'zod';

import { cn } from '../lib/utils';

// Tyypit
// ======

type FormSchema = ZodType<any, any, any>;
type InferSchema<T extends FormSchema> = z.infer<T>;

interface MultiStepFormContextValue<T extends FormSchema> {
  form: UseFormReturn<InferSchema<T>>;
  currentStep: string;
  currentStepIndex: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextStep: <Ev extends SyntheticEvent>(e: Ev) => void;
  prevStep: <Ev extends SyntheticEvent>(e: Ev) => void;
  goToStep: (index: number) => void;
  direction: 'forward' | 'backward' | undefined;
  isStepValid: () => boolean;
  isValid: boolean;
  errors: UseFormReturn<InferSchema<T>>['formState']['errors'];
  mutation: UseMutationResult<void, Error, void, unknown>; // Tarkempi tyyppi tarvittaessa
  handleFormSubmit: (data: InferSchema<T>) => Promise<void>;
}

interface MultiStepFormProps<T extends FormSchema> {
  schema: T;
  form: UseFormReturn<InferSchema<T>>;
  onSubmit: (data: InferSchema<T>) => Promise<void> | void; // Mahdollistaa async submitin
  children: ReactNode;
  className?: string;
}

interface StepProps extends HTMLProps<HTMLDivElement> {
  name: string;
  asChild?: boolean;
  ref?: Ref<HTMLDivElement>;
}

interface MultiStepFormPartProps extends HTMLProps<HTMLDivElement> {
  asChild?: boolean;
  ref?: Ref<HTMLDivElement>;
}

// Konteksti
// ========

const MultiStepFormContext = createContext<MultiStepFormContextValue<any> | null>(null);

// Hookit
// ======

/**
 * Hook kontekstin käyttämiseen MultiStepForm-komponentin sisällä.
 * @template T - Lomakkeen skeeman tyyppi (periytyy z.ZodType)
 * @returns {MultiStepFormContextValue<T>} Monivaiheisen lomakkeen konteksti.
 * @throws {Error} Jos hookia käytetään MultiStepForm-komponentin ulkopuolella.
 */
export function useMultiStepFormContext<T extends FormSchema>(): MultiStepFormContextValue<T> {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error(
      'useMultiStepFormContext must be used within a MultiStepForm component',
    );
  }
  return context as MultiStepFormContextValue<T>;
}

/**
 * Hook monivaiheisen lomakkeen logiikan hallintaan.
 * @template T - Lomakkeen skeeman tyyppi (periytyy z.ZodType)
 * @param {T} schema - Zod-skeema lomakkeen validoimiseksi.
 * @param {UseFormReturn<InferSchema<T>>} form - React Hook Formin instanssi.
 * @param {string[]} stepNames - Lomakkeen vaiheiden nimet järjestyksessä.
 * @param {(data: InferSchema<T>) => Promise<void> | void} onSubmit - Funktio, joka kutsutaan lomakkeen lähetyksen yhteydessä.
 * @returns {MultiStepFormContextValue<T>} Tila ja funktiot lomakkeen hallintaan.
 */
function useMultiStepForm<T extends FormSchema>(
  schema: T,
  form: UseFormReturn<InferSchema<T>>,
  stepNames: string[],
  onSubmit: (data: InferSchema<T>) => Promise<void> | void,
): MultiStepFormContextValue<T> {
  const [state, setState] = useState({
    currentStepIndex: 0,
    direction: undefined as 'forward' | 'backward' | undefined,
  });

  // Tarkista, onko nykyinen vaihe validi annetun skeeman osan perusteella
  const isStepValid = useCallback(() => {
    const currentStepName = stepNames[state.currentStepIndex] as Path<InferSchema<T>>;

    // Varmista, että skeema on objekti ja sillä on shape
    if (schema instanceof ZodObject && schema.shape && currentStepName in schema.shape) {
      const currentStepSchema = schema.shape[currentStepName] as ZodType;
      const currentStepData = form.getValues(currentStepName) ?? {};
      const result = currentStepSchema.safeParse(currentStepData);
      return result.success;
    } else if (schema instanceof ZodObject && !(currentStepName in schema.shape)) {
      // Jos nykyinen vaihe ei ole skeemassa (esim. vain info-sivu), oleta validiksi
      console.warn(`MultiStepForm: Step "${currentStepName}" not found in schema shape. Assuming valid.`);
      return true;
    }
    // Jos skeema ei ole objekti tai vaihetta ei löydy, oleta validiksi
    // (tai heitä virhe riippuen halutusta toiminnasta)
    console.warn(`MultiStepForm: Cannot validate step "${currentStepName}". Schema is not a ZodObject or step not found.`);
    return true; 
  }, [schema, form, stepNames, state.currentStepIndex]);

  // Siirry seuraavaan vaiheeseen
  const nextStep = useCallback(async <Ev extends SyntheticEvent>(e: Ev) => {
    e.preventDefault();
    const isValid = isStepValid();

    if (!isValid) {
      const currentStepName = stepNames[state.currentStepIndex] as Path<InferSchema<T>>;
      if (schema instanceof ZodObject && schema.shape && currentStepName in schema.shape) {
        const currentStepSchema = schema.shape[currentStepName];
        if (currentStepSchema instanceof ZodObject) {
          // Triggeröi validoinnit vain nykyisen vaiheen kentille
          const stepFields = Object.keys(currentStepSchema.shape) as Path<InferSchema<T>>[];
          const fullFieldPaths = stepFields.map(field => `${currentStepName}.${field}` as Path<InferSchema<T>>);
          await form.trigger(fullFieldPaths);
        }
      }
      return;
    }

    if (isValid && state.currentStepIndex < stepNames.length - 1) {
      setState(prev => ({ ...prev, direction: 'forward', currentStepIndex: prev.currentStepIndex + 1 }));
    }
  }, [isStepValid, state.currentStepIndex, stepNames, schema, form]);

  // Siirry edelliseen vaiheeseen
  const prevStep = useCallback(<Ev extends SyntheticEvent>(e: Ev) => {
    e.preventDefault();
    if (state.currentStepIndex > 0) {
      setState(prev => ({ ...prev, direction: 'backward', currentStepIndex: prev.currentStepIndex - 1 }));
    }
  }, [state.currentStepIndex]);

  // Siirry tiettyyn vaiheeseen (indeksin perusteella)
  const goToStep = useCallback((index: number) => {
    if (index >= 0 && index < stepNames.length) {
      // Tässä voitaisiin halutessa validoida kaikki vaiheet tähän indeksiin asti
      // if (isStepValid()) { ... } // Tai monimutkaisempi validointi
      setState(prev => ({
        ...prev,
        direction: index > prev.currentStepIndex ? 'forward' : 'backward',
        currentStepIndex: index,
      }));
    }
  }, [stepNames.length]);

  // Käytä useMutationia onSubmit-käsittelyyn
  const mutation = useMutation<void, Error, InferSchema<T>>({
    mutationFn: async (data) => {
        await onSubmit(data);
    },
    // Lisää onError, onSuccess jne. tarvittaessa
  });

  const handleFormSubmit = form.handleSubmit(async (data) => {
      await mutation.mutateAsync(data);
  });

  return useMemo(() => ({
    form,
    currentStep: stepNames[state.currentStepIndex],
    currentStepIndex: state.currentStepIndex,
    totalSteps: stepNames.length,
    isFirstStep: state.currentStepIndex === 0,
    isLastStep: state.currentStepIndex === stepNames.length - 1,
    nextStep,
    prevStep,
    goToStep,
    direction: state.direction,
    isStepValid,
    isValid: form.formState.isValid,
    errors: form.formState.errors,
    mutation: mutation as UseMutationResult<void, Error, void, unknown>, // Castaus tarpeen, koska input-tyyppi eroaa
    handleFormSubmit // Lisätty formin submit-käsittelijä
  }), [
    form,
    stepNames,
    state.currentStepIndex,
    state.direction,
    nextStep,
    prevStep,
    goToStep,
    isStepValid,
    mutation,
    handleFormSubmit
  ]);
}

// Komponentit
// ==========

/**
 * `MultiStepForm` - Pääkomponentti monivaiheisen lomakkeen luomiseen.
 * 
 * Mahdollistaa lomakkeen jakamisen useisiin vaiheisiin, joissa kussakin 
 * voidaan validoida tietty osa Zod-skeemasta. Hallitsee vaiheiden välillä 
 * liikkumista ja lomakkeen lähetystä.
 * 
 * @template T - Lomakkeen skeeman tyyppi (periytyy z.ZodType)
 * @param {MultiStepFormProps<T>} props - Komponentin propsit.
 * @returns {JSX.Element} Renderöity monivaiheinen lomake.
 * 
 * @example
 * const formSchema = z.object({
 *   personalInfo: z.object({ name: z.string().min(1), email: z.string().email() }),
 *   address: z.object({ street: z.string().min(1), city: z.string().min(1) }),
 *   confirm: z.object({ terms: z.boolean().refine(val => val === true) })
 * });
 * 
 * function MyForm() {
 *   const form = useForm({ resolver: zodResolver(formSchema) });
 *   const onSubmit = (data) => console.log(data);
 * 
 *   return (
 *     <MultiStepForm schema={formSchema} form={form} onSubmit={onSubmit}>
 *       <MultiStepFormHeader> ...header content... </MultiStepFormHeader>
 * 
 *       <MultiStepFormStep name="personalInfo">
 *         <FormField name="personalInfo.name" ... />
 *         <FormField name="personalInfo.email" ... />
 *       </MultiStepFormStep>
 * 
 *       <MultiStepFormStep name="address">
 *         <FormField name="address.street" ... />
 *         <FormField name="address.city" ... />
 *       </MultiStepFormStep>
 * 
 *       <MultiStepFormStep name="confirm">
 *          <FormField name="confirm.terms" type="checkbox" ... />
 *       </MultiStepFormStep>
 * 
 *       <MultiStepFormFooter> ...footer content with navigation buttons... </MultiStepFormFooter>
 *     </MultiStepForm>
 *   );
 * }
 */
export const MultiStepForm = <T extends FormSchema>({
  schema,
  form,
  onSubmit,
  children,
  className,
}: MultiStepFormProps<T>) => {
  // Erottele stepit, header ja footer lapsista
  const steps = useMemo(() =>
    React.Children.toArray(children).filter(
      (child): child is React.ReactElement<StepProps> =>
        React.isValidElement(child) && child.type === MultiStepFormStep,
    ), [children]);

  const header = useMemo(() => React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === MultiStepFormHeader
  ), [children]);

  const footer = useMemo(() => React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === MultiStepFormFooter
  ), [children]);

  const stepNames = useMemo(() => steps.map(step => step.props.name), [steps]);
  const multiStepForm = useMultiStepForm(schema, form, stepNames, onSubmit);

  return (
    <MultiStepFormContext.Provider value={multiStepForm}>
      {/* Käytä multiStepForm.handleFormSubmit formin onSubmitissä */}
      <form
        onSubmit={multiStepForm.handleFormSubmit}
        className={cn('flex h-full flex-col', className)} // Oletus flex-col ja korkeus
      >
        {header}
        {/* Wrapper step-elementeille animaatiota varten */}
        <div className="relative flex-1 overflow-hidden"> 
          {steps.map((step, index) => (
            <AnimatedStep
              key={step.props.name}
              direction={multiStepForm.direction}
              isActive={index === multiStepForm.currentStepIndex}
              index={index}
              currentIndex={multiStepForm.currentStepIndex}
            >
              {/* Välitä ref stepille jos se on annettu */} 
              {React.cloneElement(step, { ref: step.ref })}
            </AnimatedStep>
          ))}
        </div>
        {footer}
      </form>
    </MultiStepFormContext.Provider>
  );
};

/**
 * `MultiStepFormStep` - Yksittäinen vaihe monivaiheisessa lomakkeessa.
 * 
 * Tämä komponentti käärii yhden vaiheen sisällön. `name`-propsin tulee vastata 
 * Zod-skeeman vastaavaa avainta, jotta validointi toimii oikein.
 * 
 * @param {StepProps} props - Komponentin propsit.
 * @returns {JSX.Element} Renderöity lomakevaihe.
 */
export const MultiStepFormStep = forwardRef<HTMLDivElement, StepProps>(
  ({ children, asChild, className, ...props }, ref) => {
    const Cmp = asChild ? Slot : 'div';
    // Lisää oletuspadding ja overflow, jotta sisältö scrollaa tarvittaessa
    return (
      <Cmp ref={ref} className={cn("h-full overflow-y-auto p-4 md:p-6", className)} {...props}>
        {asChild ? children : <Slottable>{children}</Slottable>}
      </Cmp>
    );
  }
);
MultiStepFormStep.displayName = 'MultiStepFormStep';

/**
 * `MultiStepFormHeader` - Yläosa monivaiheiselle lomakkeelle.
 * 
 * Käytetään yleensä näyttämään vaiheiden indikaattori tai otsikko.
 * 
 * @param {MultiStepFormPartProps} props - Komponentin propsit.
 * @returns {JSX.Element} Renderöity yläosa.
 */
export const MultiStepFormHeader = forwardRef<HTMLDivElement, MultiStepFormPartProps>(
  ({ children, asChild, className, ...props }, ref) => {
    const Cmp = asChild ? Slot : 'div';
    // Lisää pohjareunus oletuksena
    return (
      <Cmp ref={ref} className={cn("border-b p-4 md:p-6", className)} {...props}>
        {asChild ? children : <Slottable>{children}</Slottable>}
      </Cmp>
    );
  }
);
MultiStepFormHeader.displayName = 'MultiStepFormHeader';

/**
 * `MultiStepFormFooter` - Alaosa monivaiheiselle lomakkeelle.
 * 
 * Käytetään yleensä näyttämään navigointipainikkeet (Seuraava, Edellinen, Lähetä).
 * 
 * @param {MultiStepFormPartProps} props - Komponentin propsit.
 * @returns {JSX.Element} Renderöity alaosa.
 */
export const MultiStepFormFooter = forwardRef<HTMLDivElement, MultiStepFormPartProps>(
  ({ children, asChild, className, ...props }, ref) => {
    const Cmp = asChild ? Slot : 'div';
    // Lisää yläreunus ja aseta elementit loppuun
    return (
      <Cmp ref={ref} className={cn("mt-auto border-t p-4 md:p-6 flex justify-end gap-3", className)} {...props}>
        {asChild ? children : <Slottable>{children}</Slottable>}
      </Cmp>
    );
  }
);
MultiStepFormFooter.displayName = 'MultiStepFormFooter';

// Helperit
// ========

/**
 * Apufunktio luomaan Zod-skeeman monivaiheiselle lomakkeelle.
 * Varmistaa, että syöte on objekti, jossa avaimet ovat merkkijonoja ja arvot ZodType-olioita.
 * 
 * @template T - Objekti, joka määrittelee lomakkeen vaiheet ja niiden skeemat.
 * @param {T} steps - Objekti, jossa avaimet ovat vaiheiden nimiä ja arvot vastaavia Zod-skeemoja.
 * @returns {z.ZodObject<T>} Yhdistetty Zod-objektiskeema koko lomakkeelle.
 * 
 * @example
 * const stepSchema = createStepSchema({
 *   personalInfo: z.object({ name: z.string(), email: z.string().email() }),
 *   companyInfo: z.object({ companyName: z.string() })
 * });
 */
export function createStepSchema<T extends Record<string, ZodType<any, any, any>>>(
  steps: T
): ZodObject<T> {
  return z.object(steps);
}

/**
 * Animoitu wrapper yksittäiselle lomakevaiheelle.
 * Hallitsee vaiheiden välisen siirtymäanimaation.
 */
interface AnimatedStepProps {
  direction: 'forward' | 'backward' | undefined;
  isActive: boolean;
  index: number;
  currentIndex: number;
  children: ReactNode;
}

const AnimatedStep = memo(function AnimatedStep({
  isActive,
  direction,
  children,
  index,
  currentIndex,
}: AnimatedStepProps) {
  const [shouldRender, setShouldRender] = useState(isActive);
  const stepRef = useRef<HTMLDivElement>(null);
  const initialDirectionRef = useRef(direction); // Tallenna alkuperäinen suunta
  const [animationClass, setAnimationClass] = useState('');

  // Päätä, renderöidäänkö vaihe
  useEffect(() => {
    if (isActive) {
      setShouldRender(true);
    } else {
      // Aseta timeout poistamaan elementti DOMista animaation jälkeen
      const timer = setTimeout(() => setShouldRender(false), 300); // Kesto = transition duration
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  // Aseta animaatioluokka
  useEffect(() => {
    if (!isActive) {
      // Määritä poistumissuunta viimeisimmän tiedon perusteella TAI alkuperäisen perusteella jos suuntaa ei määritetty
      const exitDirection = direction ?? initialDirectionRef.current;
      setAnimationClass(
        exitDirection === 'forward' || (!exitDirection && index < currentIndex) ? 'animate-out slide-out-to-left fade-out' :
        exitDirection === 'backward' || (!exitDirection && index > currentIndex) ? 'animate-out slide-out-to-right fade-out' :
        'fade-out' // Fallback jos suuntaa ei tiedossa
      );
    } else {
      // Määritä sisääntulon animaatioluokka
      const entryDirection = direction ?? initialDirectionRef.current;
      setAnimationClass(
        entryDirection === 'forward' ? 'animate-in slide-in-from-right fade-in' :
        entryDirection === 'backward' ? 'animate-in slide-in-from-left fade-in' :
        'animate-in fade-in' // Fallback
      );
      // Tallenna nykyinen suunta tulevaa poistumista varten, jos se on määritelty
      if(direction) initialDirectionRef.current = direction;
    }
    // Lisää direction riippuvuuksiin, jotta luokka päivittyy suunnan muuttuessa
  }, [isActive, direction, index, currentIndex]);

  // Siirrä focus ensimmäiseen fokusoitavaan elementtiin, kun vaihe aktivoituu
  useEffect(() => {
    if (isActive && stepRef.current) {
      const focusable = stepRef.current.querySelector<HTMLElement>(
        'button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus({ preventScroll: true }); // Estä sivun scrollaus
    }
  }, [isActive]);

  // Älä renderöi mitään, jos vaihe ei ole aktiivinen eikä animaatio ole käynnissä
  if (!shouldRender && !isActive) {
    return null;
  }

  return (
    <div 
      ref={stepRef} 
      className={cn(
        'absolute inset-0 h-full w-full transition-opacity duration-300', // Perusluokat
        !isActive && 'pointer-events-none', // Estä interaktiot ei-aktiivisissa vaiheissa
        animationClass // Lisää dynaaminen animaatioluokka
      )} 
      aria-hidden={!isActive} // Paranna saavutettavuutta
      data-state={isActive ? 'active' : 'inactive'}
    >
      {children}
    </div>
  );
});
AnimatedStep.displayName = 'AnimatedStep';
