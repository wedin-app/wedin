import * as React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useOnbStepTwo } from '@/hooks/onboarding/use-onb-step-two';
import Image from 'next/image';
import OnboardingStepper from './stepper';
import illustration from '@/public/assets/onb-step-two-icon.svg';
import wedinIcon from '@/public/assets/w-icon.svg';
import { useOnboarding } from '../../app/onboarding/context';
import { EventType } from '@prisma/client';

export default function StepTwo() {
  const { form, loading, onSubmit, isDirty } = useOnbStepTwo();
  const { eventType } = useOnboarding();

  return (
    <div className="relative flex flex-col justify-center items-center gap-8 h-full">
      <Image src={wedinIcon} alt="wedin icon" width={78} />

      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-textSecondary text-2xl font-medium">
          {eventType === EventType.WEDDING
            ? '¿Cómo se llaman los protagonistas del evento?'
            : '¿Cómo te llamas?'}
        </h1>
        <p className="text-secondary400">
          Este nombre será visible en tu página personalizada
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex gap-2">
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tu nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Santiago"
                        className="!mt-1.5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tu apellido</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Figueiredo"
                        className="!mt-1.5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-normal text-red-600" />
                  </FormItem>
                )}
              />
            </div>

            {/* hidden input for eventType */}
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="hidden" {...field} />
                  </FormControl>
                  <FormMessage className="font-normal text-red-600" />
                </FormItem>
              )}
            />
          </div>

          {eventType === EventType.WEDDING && (
            <>
              <div className="w-full flex items-center gap-2">
                <div className="border-b border-gray200 w-full h-full -mt-6"></div>
                <Image src={illustration} alt="illustration" width={42} />
                <div className="border-b border-gray200 w-full h-full -mt-6"></div>
              </div>
              <div className="flex gap-2">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="partnerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>El nombre de tu pareja</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Crisley"
                            className="!mt-1.5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-normal text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="partnerLastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>El apellido de tu pareja</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Dominguez"
                            className="!mt-1.5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="font-normal text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="success"
              className="mt-6 w-72"
              disabled={loading || !isDirty}
            >
              Continuar
              {loading && <Loader2 className="w-4 h-4 animate-spin ml-3" />}
            </Button>
          </div>
        </form>
      </Form>

      <OnboardingStepper step={2} />
    </div>
  );
}
