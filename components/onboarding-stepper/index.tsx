import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import { logError } from '~/libs';
import { useCreateSettings } from '~/libs/fetcher';
import { ROUTES } from '~/shared/constants/routes';
import { useStorage } from '~/shared/hooks/useStorage';
import { BudgetType, CurrencyType, GoalType } from '~/shared/types/settings.types';
import { transformCurrencyToString } from '~/shared/utils/text-utils';
import StepFive from '../screens/onboarding/step-five';
import StepFour from '../screens/onboarding/step-four';
import StepOne from '../screens/onboarding/step-one';
import StepSix from '../screens/onboarding/step-six';
import StepThree from '../screens/onboarding/step-three';
import StepTwo from '../screens/onboarding/step-two';
import SuccessScreen from '../screens/success-screen';
import { Button, ThemedText } from '../ui';
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
  const { t } = useTranslation();
  const storage = useStorage({ id: ONBOARDING_STORAGE.id });

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
      <StepFive monthlyIncome={monthlyIncome} updateMonthlyIncome={handleMonthlyIncomeChange} />
    ),
    [STEPS.STEP_SIX]: <StepSix goal={goal} updateGoal={handleGoalChange} />,
  });

  const stepActionTextDictionary = Object.freeze({
    [STEPS.STEP_ONE]: t('onboarding.actions.getStarted'),
    [STEPS.STEP_TWO]: t('onboarding.actions.gotIt'),
    [STEPS.STEP_THREE]: t('onboarding.actions.next'),
    [STEPS.STEP_FOUR]: t('onboarding.actions.next'),
    [STEPS.STEP_FIVE]: t('onboarding.actions.next'),
    [STEPS.STEP_SIX]: t('onboarding.actions.confirmAndSave'),
  });

  const isLatestStep = step === STEPS.STEP_SIX;

  const handleSetupUserSettings = async () => {
    if (!currency || !budgetType || !goal) return;

    try {
      const amount = Number(transformCurrencyToString(monthlyIncome));

      await createUserSettings(
        {
          currency,
          budgetType,
          goal,
          monthlyIncome: amount,
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

  if (isOnboardingCompleted) {
    return (
      <SuccessScreen
        actionText={t('success.goToDashboard')}
        handleActionPress={handleActionPress}
      />
    );
  }

  return (
    <View className="my-10 w-full flex-1 justify-between gap-10">
      {stepDictionary[step]}

      <View className="w-full gap-4 px-4">
        <Button className="w-full" onPress={handleNextStep} disabled={isUserSettingsCreating}>
          {isUserSettingsCreating ? (
            <ActivityIndicator size="small" />
          ) : (
            stepActionTextDictionary[step]
          )}
        </Button>

        {step === STEPS.STEP_ONE && (
          <View className="flex-row flex-wrap items-center justify-center">
            <ThemedText variant="secondary" className="px-14 text-center text-xs">
              {t('onboarding.legal.disclaimer')}
            </ThemedText>
            <ThemedText
              variant="secondary"
              className="text-brand-brand500 text-xs underline"
              onPress={() => router.push(ROUTES.TERMS_CONDITIONS)}
            >
              {t('onboarding.legal.terms')}
            </ThemedText>
            <ThemedText variant="secondary" className="px-1 text-xs">
              {t('onboarding.legal.and')}
            </ThemedText>
            <ThemedText
              variant="secondary"
              className="text-brand-brand500 text-xs underline"
              onPress={() => router.push(ROUTES.PRIVACY_POLICY)}
            >
              {t('onboarding.legal.privacy')}
            </ThemedText>
          </View>
        )}
      </View>
    </View>
  );
};
