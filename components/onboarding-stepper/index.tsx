import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useCreateMonthlyBudget } from '~/libs/fetcher';
import { ROUTES } from '~/shared/constants/routes';
import { useStorage } from '~/shared/hooks/useStorage';
import { clearValue } from '~/shared/utils/text-utils';
import StepFive from '../screens/onboarding/step-five';
import StepFour from '../screens/onboarding/step-four';
import StepOne from '../screens/onboarding/step-one';
import StepSix from '../screens/onboarding/step-six';
import StepThree from '../screens/onboarding/step-three';
import StepTwo from '../screens/onboarding/step-two';
import SuccessScreen from '../screens/success-screen';
import { Button } from '../ui';
import { ONBOARDING_STORAGE } from './constants';
import { STEPS } from './types';

export const OnboardingStepper = () => {
  const [step, setStep] = useState(STEPS.STEP_ONE);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');

  const router = useRouter();
  const storage = useStorage({ id: ONBOARDING_STORAGE.id });

  const {
    mutateAsync: createMonthlyBudget,
    isPending: isMonthlyBudgetCreating,
    isError: isMonthlyBudgetError,
    isSuccess: isMonthlyBudgetSuccess,
    data: monthlyBudget,
  } = useCreateMonthlyBudget();

  const onboardingActiveStep = storage.get(ONBOARDING_STORAGE.keys.activeStep, 'number');
  const storageCompleted = storage.get(ONBOARDING_STORAGE.keys.storageCompleted, 'boolean');

  const handleMonthlyIncomeChange = (income: string) => {
    setMonthlyIncome(income);
  };

  const stepDictionary = Object.freeze({
    [STEPS.STEP_ONE]: <StepOne />,
    [STEPS.STEP_TWO]: <StepTwo />,
    [STEPS.STEP_THREE]: <StepThree />,
    [STEPS.STEP_FOUR]: <StepFour />,
    [STEPS.STEP_FIVE]: (
      <StepFive
        monthlyIncome={monthlyIncome}
        updateMonthlyIncome={handleMonthlyIncomeChange}
        isFieldError={isMonthlyBudgetError}
      />
    ),
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
  const isIncomeStep = step === STEPS.STEP_FIVE;

  const handleCreateMonthlyBudget = async () => {
    if (!monthlyIncome) return;
    const amount = Number(clearValue(monthlyIncome));
    await createMonthlyBudget({
      amount,
    });
  };

  const handleNextStep = useCallback(async () => {
    if (isLatestStep) {
      setIsOnboardingCompleted(true);
      storage.store(ONBOARDING_STORAGE.keys.storageCompleted, true);
      return;
    }

    if (isIncomeStep) {
      await handleCreateMonthlyBudget();
    }

    setStep(step + 1);
    storage.store(ONBOARDING_STORAGE.keys.activeStep, step + 1);
  }, [isLatestStep, step]);

  console.log({
    isMonthlyBudgetCreating,
    isMonthlyBudgetError,
    isMonthlyBudgetSuccess,
    monthlyBudget,
  });

  const handleActionPress = () => {
    router.replace(ROUTES.HOME);
  };

  useEffect(() => {
    if (onboardingActiveStep && !storageCompleted) {
      setStep(onboardingActiveStep as STEPS);
    }

    if (storageCompleted) {
      router.replace(ROUTES.HOME);
    }
  }, []);

  if (isOnboardingCompleted) {
    return <SuccessScreen actionText="Go to my dashboard" handleActionPress={handleActionPress} />;
  }

  return (
    <View className="my-10 w-full flex-1 justify-between gap-10">
      {stepDictionary[step]}

      <View className="w-full px-4">
        <Button className="w-full" onPress={handleNextStep}>
          {isMonthlyBudgetCreating ? (
            <ActivityIndicator size="small" />
          ) : (
            stepActionTextDictionary[step]
          )}
        </Button>
      </View>
    </View>
  );
};
