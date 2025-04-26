'use client';

import { memo, forwardRef, useCallback, useEffect, useState } from 'react';
import { Image as ImageIcon, Trash2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { cn } from '../lib/utils';
import { Button } from '../components/button';
import { ImageUploadInput, ImageUploadInputProps } from './image-upload-input';
import { Trans } from './trans';
import { Label } from '../components/label';

/**
 * ImageUploader-komponentin propsit
 */
export interface ImageUploaderProps {
  /** Kuvatiedoston arvo (URL tai FileList) */
  value?: string | FileList | null | undefined;
  /** Kutsutaan kun kuva vaihdetaan tai poistetaan */
  onValueChange: (value: File | null) => void;
  /** Kuvauskenttä (React-node) */
  children?: React.ReactNode;
  /** Input-elementin nimi lomakkeessa */
  name?: string;
  /** Koko */
  size?: 'sm' | 'default' | 'lg';
  /** Lisäluokat kontainerille */
  className?: string;
  /** Onko kenttä pakollinen */
  required?: boolean;
}

const sizes = {
  sm: { container: 'h-16 w-16', icon: 'h-6 w-6' },
  default: { container: 'h-20 w-20', icon: 'h-8 w-8' },
  lg: { container: 'h-24 w-24', icon: 'h-10 w-10' },
};

/**
 * `ImageUploader` - Komponentti kuvan lataamiseen ja esikatseluun
 * 
 * Yksinkertaistaa kuvan latausprosessia tarjoamalla valmiin käyttöliittymän
 * kuvan valintaan, esikatseluun ja poistamiseen. Integroituu 
 * `ImageUploadInput`-komponenttiin ja `react-hook-form`iin.
 * 
 * @example
 * // Peruskäyttö react-hook-form:in kanssa
 * <FormProvider {...form}>
 *   <form onSubmit={form.handleSubmit(onSubmit)}>
 *     <FormField
 *       control={form.control}
 *       name="avatar"
 *       render={({ field }) => (
 *         <ImageUploader 
 *           onValueChange={field.onChange} 
 *           value={field.value}
 *         >
 *           <p>Lataa profiilikuva.</p>
 *         </ImageUploader>
 *       )}
 *     />
 *     <Button type="submit">Tallenna</Button>
 *   </form>
 * </FormProvider>
 * 
 * @param {ImageUploaderProps} props - Komponentin propsit
 * @returns {JSX.Element} Renderöity kuvan latauskomponentti
 */
export const ImageUploader = memo(forwardRef<HTMLInputElement, ImageUploaderProps>(
  function ImageUploaderComponent({
    value: initialValue,
    onValueChange,
    children,
    name,
    size = 'default',
    className,
    required,
    ...props
  }, ref) {
    // Tila kuvan URL:lle esikatselua varten
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    
    // Hanki lomakkeen konteksti, jos käytetään FormProvideria
    const formMethods = useFormContext();
    const internalValue = formMethods?.watch(name ?? '') ?? initialValue;

    // Alusta imageUrl, kun komponentti mountataan tai arvo muuttuu
    useEffect(() => {
      if (typeof internalValue === 'string' && internalValue) {
        setImageUrl(internalValue);
      } else if (internalValue instanceof FileList && internalValue.length > 0) {
        const file = internalValue[0];
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        // Muista vapauttaa object URL, kun sitä ei enää tarvita
        return () => URL.revokeObjectURL(url);
      } else if (!internalValue && isInitialized) {
        // Tyhjennä URL, jos arvo tyhjenee ulkoa päin
        setImageUrl(null);
      }
      setIsInitialized(true);
    }, [internalValue, isInitialized]);

    // Käsittele kuvan poisto
    const handleClear = useCallback(() => {
      setImageUrl(null);
      onValueChange(null); 
      // Nollaa myös lomakkeen arvo, jos käytetään react-hook-formia
      formMethods?.setValue(name ?? '', null, { shouldValidate: true, shouldDirty: true });
    }, [onValueChange, formMethods, name]);

    // Käsittele kuvan vaihto
    const handleValueChange = useCallback(({ image, file }: { image: string; file: File }) => {
      setImageUrl(image); // Päivitä esikatselukuva heti
      onValueChange(file); // Välitä File-objekti ylöspäin
      // Aseta File-objekti lomakkeen arvoksi, jos käytetään react-hook-formia
      formMethods?.setValue(name ?? '', file, { shouldValidate: true, shouldDirty: true });
    }, [onValueChange, formMethods, name]);

    const sizeClasses = sizes[size];
    const inputId = name ? `image-uploader-${name}` : `image-uploader-${Math.random().toString(36).substring(7)}`;

    return (
      <div className={cn('flex items-center gap-4', className)}>
        <ImageUploadInput
          ref={ref} // Välitetään ref inputtiin
          id={inputId}
          name={name} // Varmista, että name välitetään
          initialImage={imageUrl} // Käytä statea alkukuvan hallintaan
          onValueChange={handleValueChange}
          onClear={handleClear}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center rounded-full border border-dashed transition-colors hover:border-primary',
            sizeClasses.container,
            !imageUrl && 'bg-muted/50 hover:bg-muted/60',
            imageUrl && 'border-transparent' // Piilota reunus kun kuva on valittu
          )}
          imagePreviewSize={size === 'sm' ? 48 : size === 'lg' ? 80 : 64} // Säädä esikatselukokoa
          alt="Ladatun kuvan esikatselu"
          required={required}
          {...props} // Välitetään loput propsit inputtiin
        >
          {/* Tämä sisältö näkyy vain, jos ImageUploadInput renderöi fallbackin (ei kuvaa) */}
          {!imageUrl && <ImageIcon className={cn('text-muted-foreground', sizeClasses.icon)} />}
        </ImageUploadInput>

        <div className="flex flex-col">
          {/* Kuvauskenttä */}
          {children && <div className="text-sm text-muted-foreground mb-2">{children}</div>}
          
          {/* Poista-painike näkyy vain jos kuva on valittu */}
          {imageUrl && (
            <Button 
              type="button"
              onClick={handleClear} 
              size="sm" 
              variant="ghost" 
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <Trans i18nKey={'common:removeImage'} defaults="Poista kuva" />
            </Button>
          )}
        </div>
      </div>
    );
  }
));

ImageUploader.displayName = 'ImageUploader';
