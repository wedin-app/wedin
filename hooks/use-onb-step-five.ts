import { useState } from 'react';
import { stepFive } from '@/actions/onboarding/step-five';
import { useToast } from '@/hooks/use-toast';
// import { useRouter } from 'next/navigation';

export const useOnbStepFive = () => {
  // const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const finalizeOnboarding = async () => {
    setLoading(true);
    const response = await stepFive();

    if (response?.error) {
      toast({
        variant: 'destructive',
        title: 'Error en el paso 5. Intenta de nuevo.',
        description: response.error,
      });

      setLoading(false);
      return null;
    } else {
      location.href = '/dashboard';
    }
    setLoading(false);
  };

  return {
    loading,
    finalizeOnboarding,
  };
};