import { useState } from 'react';
import { View } from 'react-native';
import StepOne from '../screens/onboarding/step-one';
import StepThree from '../screens/onboarding/step-three';
import StepTwo from '../screens/onboarding/step-two';
import { Button } from '../ui';
import { STEPS } from './types';

export const OnboardingStepper = () => {
  const [step, setStep] = useState(STEPS.STEP_ONE);

  const stepDictionary = Object.freeze({
    [STEPS.STEP_ONE]: <StepOne />,
    [STEPS.STEP_TWO]: <StepTwo />,
    [STEPS.STEP_THREE]: <StepThree />,
  });

  const stepActionTextDictionary = Object.freeze({
    [STEPS.STEP_ONE]: 'Get started',
    [STEPS.STEP_TWO]: 'Got it!',
    [STEPS.STEP_THREE]: 'Next',
  });

  const isLatestStep = step === STEPS.STEP_THREE;

  const handleNextStep = () => {
    if (isLatestStep) {
      return;
    }

    setStep(step + 1);
  };

  return (
    <View className="my-10 w-full flex-1 justify-between gap-10">
      {stepDictionary[step]}

      <View className="w-full px-4">
        <Button className="w-full" onPress={handleNextStep}>
          {stepActionTextDictionary[step]}
        </Button>
      </View>
    </View>
  );
};
