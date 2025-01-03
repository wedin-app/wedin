import { useState } from 'react';
import { stepTwo } from '@/actions/onboarding/step-two';
import { useToast } from '@/hooks/use-toast';
import { StepTwoSchema } from '@/schemas/onboarding';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { useOnboarding } from '@/app/onboarding/context';

export const useOnbStepTwo = () => {
  const { toast } = useToast();
  const { setCurrentPage, eventType } = useOnboarding();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof StepTwoSchema>>({
    resolver: zodResolver(StepTwoSchema),
    defaultValues: {
      name: '',
      lastName: '',
      partnerName: '',
      partnerLastName: '',
      eventType: eventType,
    },
  });

  const {
    formState: { isDirty },
  } = form;

  const onSubmit = async (values: z.infer<typeof StepTwoSchema>) => {
    setLoading(true);
    const validatedFields = StepTwoSchema.safeParse(values);
    if (validatedFields.success) {
      const response = await stepTwo(validatedFields.data);

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Error en el paso 2. Intenta de nuevo.',
          description: response.error,
        });

        setLoading(false);
        return null;
      }
      setCurrentPage(3);
    } else {
      toast({
        variant: 'destructive',
        description: validatedFields.error.errors.map(err => err.message).join(', '),
      });
    }
    setLoading(false);
  };

  return {
    form,
    loading,
    onSubmit,
    isDirty,
  };
};
