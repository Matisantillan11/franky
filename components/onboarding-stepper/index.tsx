import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { logError } from '~/libs';
import { useCreateMonthlyBudget, useCreateSettings } from '~/libs/fetcher';
import { ROUTES } from '~/shared/constants/routes';
import { useStorage } from '~/shared/hooks/useStorage';
import { BudgetType, CurrencyType, GoalType } from '~/shared/types/settings.types';
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
  const [currency, setCurrency] = useState<CurrencyType>(CurrencyType.ARGENTINE_PESO);
  const [budgetType, setBudgetType] = useState<BudgetType>(BudgetType.PERSONAL);
  const [goal, setGoal] = useState<GoalType>(GoalType.SAVINGS);

  const router = useRouter();
  const storage = useStorage({ id: ONBOARDING_STORAGE.id });

  const {
    mutateAsync: createMonthlyBudget,
    isPending: isMonthlyBudgetCreating,
    isError: isMonthlyBudgetError,
  } = useCreateMonthlyBudget();

  const { mutateAsync: createUserSettings, isPending: isUserSettingsCreating } =
    useCreateSettings();

  const onboardingActiveStep = storage.get(ONBOARDING_STORAGE.keys.activeStep, 'number');
  const storageCompleted = storage.get(ONBOARDING_STORAGE.keys.storageCompleted, 'boolean');

  const handleMonthlyIncomeChange = (income: string) => {
    setMonthlyIncome(income);
  };

  const handleBudgetTypeChange = (budgetType: BudgetType) => {
    setBudgetType(budgetType);
  };

  const handleGoalChange = (goal: GoalType) => {
    setGoal(goal);
  };

  const handleCurrencyChange = (currency: CurrencyType) => {
    setCurrency(currency);
  };

  const stepDictionary = Object.freeze({
    [STEPS.STEP_ONE]: <StepOne />,
    [STEPS.STEP_TWO]: <StepTwo />,
    [STEPS.STEP_THREE]: (
      <StepThree budgetType={budgetType} updateBudgetType={handleBudgetTypeChange} />
    ),
    [STEPS.STEP_FOUR]: <StepFour currency={currency} updateCurrency={handleCurrencyChange} />,
    [STEPS.STEP_FIVE]: (
      <StepFive
        monthlyIncome={monthlyIncome}
        updateMonthlyIncome={handleMonthlyIncomeChange}
        isFieldError={isMonthlyBudgetError}
      />
    ),
    [STEPS.STEP_SIX]: <StepSix goal={goal} updateGoal={handleGoalChange} />,
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

    try {
      const amount = Number(clearValue(monthlyIncome));
      await createMonthlyBudget(
        {
          amount,
        },
        {
          onSuccess: () => {
            setStep(step + 1);
            storage.store(ONBOARDING_STORAGE.keys.activeStep, step + 1);
          },
          onError: (error) => {
            logError({
              error: {
                component: 'OnboardingStepper',
                func: 'handleCreateMonthlyBudget',
                module: 'onboarding',
                message: '[ONBOARDING_ERROR] Error creating monthly budget',
              },
              tagName: 'ONBOARDING_ERROR',
              errorName: 'ONBOARDING_ERROR',
              context: { amount, error },
            });
          },
        }
      );
    } catch (error) {
      logError({
        error: {
          component: 'OnboardingStepper',
          func: 'handleCreateMonthlyBudget',
          module: 'onboarding',
          message: '[ONBOARDING_ERROR] Catch error -> Error creating monthly budget',
        },
        tagName: 'ONBOARDING_ERROR',
        errorName: 'ONBOARDING_ERROR',
        context: { error },
      });
    }
  };

  const handleSetupUserSettings = async () => {
    if (!currency || !budgetType || !goal) return;

    try {
      await createUserSettings(
        {
          currency,
          budgetType,
          goal,
        },
        {
          onSuccess: () => {
            setIsOnboardingCompleted(true);
            storage.store(ONBOARDING_STORAGE.keys.storageCompleted, true);
          },
          onError: (error) => {
            logError({
              error: {
                component: 'OnboardingStepper',
                func: 'handleSetupUserSettings',
                module: 'onboarding',
                message: '[ONBOARDING_ERROR] Error setting up user settings',
              },
              tagName: 'ONBOARDING_ERROR',
              errorName: 'ONBOARDING_ERROR',
              context: { currency, budgetType, goal, error },
            });
          },
        }
      );
    } catch (error) {
      logError({
        error: {
          component: 'OnboardingStepper',
          func: 'handleSetupUserSettings',
          module: 'onboarding',
          message: '[ONBOARDING_ERROR] Catch error -> Error setting up user settings',
        },
        tagName: 'ONBOARDING_ERROR',
        errorName: 'ONBOARDING_ERROR',
        context: { error },
      });
    }
  };

  const handleNextStep = async () => {
    if (isLatestStep) {
      await handleSetupUserSettings();
      return;
    }

    if (isIncomeStep) {
      await handleCreateMonthlyBudget();
      return;
    }

    setStep(step + 1);
    storage.store(ONBOARDING_STORAGE.keys.activeStep, step + 1);
  };

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

  const isLoading = isMonthlyBudgetCreating || isUserSettingsCreating;

  if (isOnboardingCompleted) {
    return <SuccessScreen actionText="Go to my dashboard" handleActionPress={handleActionPress} />;
  }

  return (
    <View className="my-10 w-full flex-1 justify-between gap-10">
      {stepDictionary[step]}

      <View className="w-full px-4">
        <Button className="w-full" onPress={handleNextStep} disabled={isLoading}>
          {isLoading ? <ActivityIndicator size="small" /> : stepActionTextDictionary[step]}
        </Button>
      </View>
    </View>
  );
};
