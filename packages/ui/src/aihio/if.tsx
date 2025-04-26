import React, { 
  useEffect, 
  useRef,
  memo 
} from 'react';

/**
 * Määrittää ehdolliset arvotyypit, jotka voidaan tulkita 'true' tai 'false' arvoiksi.
 * 'true' arvoja ovat kaikki, jotka eivät ole falsy-arvoja.
 */
type Condition<Value = unknown> = Value | false | null | undefined | 0 | '';

/**
 * If-komponentin propsi-rajapinta.
 * @template Value - Ehdollisen arvon tyyppi, joka välitetään lapsifunktiolle.
 */
interface IfProps<Value> {
  /** 
   * Ehdollinen arvo, joka määrittää renderöidäänkö children vai fallback.
   * Arvot 'false', 'null', 'undefined', '0' ja '' tulkitaan falsy-arvoiksi.
   */
  condition: Condition<Value>;
  
  /**
   * Renderöitävä sisältö kun condition on truthy.
   * Voi olla React-elementti tai funktio, joka saa condition-arvon parametrina.
   */
  children: React.ReactNode | ((value: Value) => React.ReactNode);
  
  /**
   * Vaihtoehtoinen sisältö, joka renderöidään kun condition on falsy.
   */
  fallback?: React.ReactNode;
}

/** Tarkistaa ollaanko selain-ympäristössä (client-side) */
const isClient = typeof window !== 'undefined';

/**
 * Hook, joka seuraa onko komponentti kiinnitetty (mounted) DOM:iin.
 * Estää memory leakit ja mahdollistaa turvallisen tilan päivityksen.
 * 
 * @returns React.RefObject, jonka current-arvo on true kun komponentti on kiinnitetty.
 */
function useIsMounted() {
  const isMounted = useRef(false);
  
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}

/**
 * @component If
 * 
 * Ehdollinen renderöintikomponentti, joka näyttää sisällön vain kun määritelty ehto täyttyy.
 * Tämä komponentti on optimoitu toimimaan luotettavasti SSR-ympäristössä, kuten Next.js,
 * ja välttää hydraatiovirheet.
 * 
 * ### Ominaisuudet
 * 
 * - **SSR-tuki**: isClient-tarkistus estää hydraatiovirheet
 * - **Memory Leak -suojaus**: useIsMounted-hook varmistaa turvallisen puhdistuksen
 * - **Tyyppiturvallisuus**: Geneerinen tyypitys mahdollistaa arvojen turvallisen välityksen
 * - **Suorituskyky**: React.memo estää tarpeettomat uudelleenrenderöinnit
 * 
 * @example
 * // Peruskäyttö
 * <If condition={userLoggedIn} fallback={<LoginPrompt />}>
 *   <Dashboard />
 * </If>
 * 
 * @example
 * // Dynaaminen renderöinti funktion avulla
 * <If condition={userData}>
 *   {(data) => <UserProfile name={data.name} email={data.email} />}
 * </If>
 * 
 * @example
 * // DynamicIf Suspense-tuella asynkroniselle datalle
 * <DynamicIf condition={asyncData}>
 *   {(data) => <DataView content={data} />}
 * </DynamicIf>
 * 
 * @example
 * // Testaus esimerkki
 * // __tests__/If.test.tsx
 * import { render } from '@testing-library/react';
 * import { If } from '../components/If';
 * 
 * test('renderöi children kun ehto pätee', () => {
 *   const { getByText } = render(
 *     <If condition={true}>
 *       <div>Testi sisältö</div>
 *     </If>
 *   );
 *   expect(getByText('Testi sisältö')).toBeInTheDocument();
 * });
 * 
 * @template Value - Ehdollisen arvon tyyppi.
 * @param {IfProps<Value>} props - Komponentin propsit.
 * @returns {JSX.Element | null} Renderöity elementti tai null.
 */
export const If = memo(<Value = unknown>({
  condition,
  children,
  fallback,
}: IfProps<Value>) => {
  const isMounted = useIsMounted();
  const hasValidCondition = !!condition && (
    typeof condition !== 'boolean' || condition === true
  );

  // Ei renderöi mitään palvelimella tai ennen mount-tilaa
  if (!isClient || !isMounted.current) return null;

  if (hasValidCondition) {
    return typeof children === 'function' 
      ? <>{children(condition)}</>
      : <>{children}</>;
  }

  return <>{fallback}</> ?? null;
}) as <Value>(props: IfProps<Value>) => JSX.Element | null;

If.displayName = 'ConditionalRender';

/**
 * DynamicIf on If-komponentti Suspense-tuella, joka on optimoitu
 * asynkronisille operaatioille ja dynaamiselle sisällön lataamiselle.
 * 
 * Käytä tätä komponenttia kun:
 * - Renderöit asynkronisesta lähteestä tulevaa dataa
 * - Tarvitset Suspense-tukea
 * - Käytät Next.js:n dynaamista komponenttien latausta
 * 
 * @example
 * // Käyttö dynaamisen datan kanssa
 * <DynamicIf condition={fetchedData}>
 *   {(data) => <ComplexDataVisualization data={data} />}
 * </DynamicIf>
 * 
 * @example
 * // Optimointi raskaille komponenteille
 * const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
 *   loading: () => <SkeletonLoader />,
 *   ssr: false
 * });
 * 
 * <DynamicIf condition={showHeavyComponent}>
 *   <HeavyComponent />
 * </DynamicIf>
 * 
 * @template Value - Ehdollisen arvon tyyppi.
 * @param {IfProps<Value>} props - Samat propsit kuin If-komponentilla.
 * @returns {JSX.Element} Suspense-kääritty If-komponentti.
 */
export const DynamicIf = <Value,>(props: IfProps<Value>) => (
  <React.Suspense fallback={null}>
    <If {...props} />
  </React.Suspense>
);