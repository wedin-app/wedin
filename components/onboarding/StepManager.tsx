'use client';

import { useState, useEffect } from 'react';
import type { User } from '@prisma/client';
import OnboardingStepOne from '@/components/onboarding/StepOne';
import OnboardingStepTwo from '@/components/onboarding/StepTwo';
import OnboardingStepThree from '@/components/onboarding/StepThree';
import OnboardingStepFour from '@/components/onboarding/StepFour';
import OnboardingStepFive from '@/components/onboarding/StepFive';
import OnboardingStepSix from '@/components/onboarding/StepSixAnimation';

type OnboardingStepManagerProps = {
  currentUser: User;
};

export default function OnboardingStepManager({
  currentUser,
}: OnboardingStepManagerProps) {
  const [currentStep, setCurrentStep] = useState(
    currentUser?.onboardingStep || 1
  );

  useEffect(() => {
    setCurrentStep(currentUser?.onboardingStep || 1);
  }, [currentUser]);

  return (
    <>
      {currentStep === 1 && <OnboardingStepOne />}
      {currentStep === 2 && <OnboardingStepTwo />}
      {currentStep === 3 && <OnboardingStepThree />}
      {currentStep === 4 && <OnboardingStepFour />}
      {currentStep === 5 && <OnboardingStepFive />}
      {currentStep === 6 && <OnboardingStepSix />}
    </>
  );
}
