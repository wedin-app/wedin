import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Combobox } from '@/components/ui/combobox';
import { Loader2 } from 'lucide-react';
import OnboardingStepper from './stepper';
import wedinIcon from '@/public/assets/w-icon.svg';
import Image from 'next/image';
import { countries } from '@/lib/countries';
import { useOnbStepThree } from '@/hooks/onboarding/use-onb-step-three';

export default function StepThree() {
  const { form, loading, onSubmit, handleIsDecidingCountryCity, isDeciding, isButtonEnabled } = useOnbStepThree();

  return (
    <div className="relative flex flex-col justify-center items-center gap-8 h-full">
      <Image src={wedinIcon} alt="wedin icon" width={78} />

      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-textSecondary text-2xl font-medium">
          ¿Dónde se celebrará tu evento?
        </h1>
        <p className="text-secondary400">
          La ubicación ayudará a personalizar la experiencia de tus invitados
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            {isDeciding ? (
              <div className="w-full">
                <Label>País</Label>
                <Input placeholder="Elegí un país" disabled className="!mt-1.5" />
              </div>
            ) : (
              <FormField
                control={form.control}
                name="eventCountry"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>País</FormLabel>
                    <FormControl className="!mt-1">
                      <Combobox
                        options={countries}
                        placeholder="Elegí un país"
                        selected={field.value || ''}
                        onChange={field.onChange}
                        width="w-60"
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="eventCity"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="San Bernardino"
                      disabled={!!isDeciding}
                      className="!mt-1.5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-normal text-red-600" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isDecidingEventLocation"
            render={({ field }) => (
              <FormItem className="flex gap-2 items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={checked => {
                      field.onChange(checked);
                      handleIsDecidingCountryCity(checked);
                    }}
                  />
                </FormControl>
                <div className="!m-0">
                  <FormLabel className="text-base font-normal cursor-pointer">
                    Aún estamos decidiendo
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-center mt-6">
            <Button type="submit" variant="success" disabled={loading || !isButtonEnabled} className="w-72">
              Continuar
              {loading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>

      <OnboardingStepper step={3} />
    </div>
  );
}
