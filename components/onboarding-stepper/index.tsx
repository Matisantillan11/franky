import { useState } from 'react';
import { View } from 'react-native';
import StepFive from '../screens/onboarding/step-five';
import StepFour from '../screens/onboarding/step-four';
import StepOne from '../screens/onboarding/step-one';
import StepSix from '../screens/onboarding/step-six';
import StepThree from '../screens/onboarding/step-three';
import StepTwo from '../screens/onboarding/step-two';
import SuccessScreen from '../screens/success-screen';
import { Button } from '../ui';
import { STEPS } from './types';

export const OnboardingStepper = () => {
  const [step, setStep] = useState(STEPS.STEP_ONE);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  const stepDictionary = Object.freeze({
    [STEPS.STEP_ONE]: <StepOne />,
    [STEPS.STEP_TWO]: <StepTwo />,
    [STEPS.STEP_THREE]: <StepThree />,
    [STEPS.STEP_FOUR]: <StepFour />,
    [STEPS.STEP_FIVE]: <StepFive />,
    [STEPS.STEP_SIX]: <StepSix />,
  });

  const stepActionTextDictionary = Object.freeze({
    [STEPS.STEP_ONE]: 'Get started',
    [STEPS.STEP_TWO]: 'Got it!',
    [STEPS.STEP_THREE]: 'Next',
    [STEPS.STEP_FOUR]: 'Next',
    [STEPS.STEP_FIVE]: 'Next',
    [STEPS.STEP_SIX]: 'Confirm & Save',
  });

  const isLatestStep = step === STEPS.STEP_SIX;

  const handleNextStep = () => {
    if (isLatestStep) {
      setIsOnboardingCompleted(true);
      return;
    }

    setStep(step + 1);
  };

  const handleActionPress = () => {
    setIsOnboardingCompleted(false);
    setStep(STEPS.STEP_ONE);
  };

  if (isOnboardingCompleted) {
    return <SuccessScreen actionText="Go to my dashboard" handleActionPress={handleActionPress} />;
  }

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
