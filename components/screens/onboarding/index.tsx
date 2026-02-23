import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/ui';
import StepOne from './step-one';
import StepTwo from './step-two';
import { STEPS } from './types';

export default function OnboardingScreen() {
  const [step, setStep] = React.useState(STEPS.STEP_ONE);

  const isStepOneActive = step === STEPS.STEP_ONE;
  const isStepTwoActive = step === STEPS.STEP_TWO;

  const handlePressButton = () => {
    if (isStepOneActive) {
      setStep(STEPS.STEP_TWO);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="h-full items-center justify-between gap-4">
        {isStepOneActive && <StepOne />}
        {isStepTwoActive && <StepTwo />}

        <View className="w-full p-10">
          <Button className="w-full" onPress={handlePressButton}>
            {isStepOneActive ? 'Get started' : 'understand'}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
