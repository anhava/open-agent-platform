'use client';

import { forwardRef, memo, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { UploadCloud, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/button';
import { Label } from '../components/label';
import { If } from './if';

/**
 * ImageUploadInput-komponentin propsit
 */
export interface ImageUploadInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'type' | 'onChange' | 'onInput'> {
  /** Alkukuva URL-muodossa */
  initialImage?: string | null;
  /** Kutsutaan kun kuva poistetaan */
  onClear?: () => void;
  /** Kutsutaan kun kuvan arvo (tiedosto ja URL) muuttuu */
  onValueChange?: (props: { image: string; file: File }) => void;
  /** Kutsutaan kun inputin arvo muuttuu (raaka tapahtuma) */
  onInput?: React.FormEventHandler<HTMLInputElement>;
  /** Näytetäänkö komponentti */
  visible?: boolean;
  /** Alikomponentit (esim. viesti) */
  children?: React.ReactNode;
  /** Kuvan leveys ja korkeus esikatselussa */
  imagePreviewSize?: number;
  /** Alternatiivinen teksti kuvalle */
  alt?: string;
  /** Lisäluokat */
  className?: string;
  /** Onko kenttä pakollinen */
  required?: boolean;
}

const DEFAULT_IMAGE_SIZE = 28;

/**
 * `ImageUploadInput` - Komponentti kuvan lataamiseen
 * 
 * Mahdollistaa kuvan valitsemisen laitteelta, näyttää esikatselun ja 
 * antaa mahdollisuuden poistaa valitun kuvan.
 * 
 * @example
 * // Peruskäyttö
 * <ImageUploadInput 
 *   onValueChange={({ file }) => console.log('Valittu tiedosto:', file)}
 * >
 *   Valitse tai pudota kuva tähän
 * </ImageUploadInput>
 * 
 * @example
 * // Alkukuvalla ja poistotoiminnolla
 * <ImageUploadInput 
 *   initialImage="/polku/kuvaan.jpg"
 *   onClear={() => console.log('Kuva poistettu')}
 *   onValueChange={handleImageChange}
 * >
 *   Vaihda kuva
 * </ImageUploadInput>
 * 
 * @param {ImageUploadInputProps} props - Komponentin propsit
 * @returns {JSX.Element} Renderöity kuvan latauskomponentti
 */
export const ImageUploadInput = memo(forwardRef<HTMLInputElement, ImageUploadInputProps>(
  function ImageUploadInputComponent({
    children,
    initialImage,
    onClear,
    onInput,
    onValueChange,
    visible = true,
    imagePreviewSize = DEFAULT_IMAGE_SIZE,
    alt = 'Kuvan esikatselu', // Parempi oletusarvo
    className,
    required,
    ...props
  }, forwardedRef) {
    const localRef = useRef<HTMLInputElement>(null);
    const [currentImage, setCurrentImage] = useState<string | null | undefined>(initialImage);
    const [fileName, setFileName] = useState<string>('');

    // Päivitä tila jos initialImage muuttuu ulkoa
    useEffect(() => {
      setCurrentImage(initialImage);
      if (!initialImage) {
        setFileName('');
      }
    }, [initialImage]);

    // Käsittele tiedoston valinta
    const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
      const file = event.target.files?.[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setCurrentImage(imageUrl);
        setFileName(file.name);

        onValueChange?.({ image: imageUrl, file });
      }
      // Välitä alkuperäinen onInput-tapahtuma, jos se on annettu
      onInput?.(event as React.FormEvent<HTMLInputElement>); 
    }, [onValueChange, onInput]);

    // Käsittele kuvan poisto
    const handleRemoveImage = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
      event.preventDefault(); // Estä labelin klikkaus
      event.stopPropagation(); // Estä tapahtuman kupliminen labeliin

      setCurrentImage(null);
      setFileName('');

      if (localRef.current) {
        localRef.current.value = ''; // Tyhjennä inputin arvo
      }

      onClear?.();
      // Ilmoita tyhjästä arvosta myös onValueChange kautta, jos tarpeen
      // onValueChange?.({ image: '', file: null }); // Riippuu logiikasta
    }, [onClear]);

    // Yhdistä refit
    const setCombinedRef = useCallback((node: HTMLInputElement | null) => {
      // Pidä oma ref ajan tasalla
      (localRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      // Välitä ref eteenpäin
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    }, [forwardedRef]);

    const id = props.id || `image-upload-${Math.random().toString(36).substring(7)}`;

    // Piilotettu input-elementti varsinaiseen tiedoston valintaan
    const InputElement = (
      <input
        {...props}
        ref={setCombinedRef}
        type="file"
        onChange={handleInputChange} // Käytä onChange tiedoston valinnan käsittelyyn
        accept="image/*"
        className="sr-only" // Piilota visuaalisesti, mutta säilytä saavutettavuus
        aria-labelledby={id}
        aria-hidden="true" // Koska käytämme labelia
        tabIndex={-1}      // Estä tabulaattorilla navigointi
        required={required}
      />
    );

    // Jos komponentti ei ole näkyvissä, renderöi vain piilotettu input
    if (!visible) {
      return InputElement;
    }

    return (
      <Label
        htmlFor={props.id} // Varmista, että label yhdistyy inputtiin
        id={id}
        className={cn(
          'relative flex h-auto min-h-10 w-full cursor-pointer items-center space-x-3 rounded-md border border-input border-dashed bg-background px-3 py-2 text-sm ring-offset-background transition-all hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          {'opacity-50 cursor-not-allowed': props.disabled},
          className
        )}
      >
        {InputElement}
        
        {/* Ikoni tai kuvan esikatselu */}
        <div className="flex-shrink-0">
          <If 
            condition={!currentImage} 
            fallback={
              <Image
                loading="lazy"
                width={imagePreviewSize}
                height={imagePreviewSize}
                className="rounded-sm object-cover"
                src={currentImage!}
                alt={alt}
              />
            }
          >
            <UploadCloud className="h-5 w-5 text-muted-foreground" />
          </If>
        </div>

        {/* Tekstisisältö ja tiedoston nimi */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <span className={cn('truncate text-xs font-medium', !currentImage && 'text-muted-foreground')}>
            {currentImage ? fileName : children || 'Lataa kuva'}
          </span>
          {!currentImage && children && (
            <span className="text-xs text-muted-foreground/80">
               {children} 
            </span>
          )}
        </div>

        {/* Poista-painike */}
        <If condition={!!currentImage}>
          <Button
            type="button" // Estä lomakkeen lähetys
            variant="ghost"
            size="icon"
            className="ml-auto h-6 w-6 flex-shrink-0 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            onClick={handleRemoveImage}
            aria-label="Poista kuva"
            disabled={props.disabled}
          >
            <X className="h-4 w-4" />
          </Button>
        </If>
      </Label>
    );
  }
));

ImageUploadInput.displayName = 'ImageUploadInput';
