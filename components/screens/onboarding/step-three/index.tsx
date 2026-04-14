import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import BudgetLogo from '~/assets/images/budget.svg';
import { BlurView } from '~/components/blur-circle';
import Card from '~/components/card';
import { ThemedText } from '~/components/ui';
import { BudgetType } from '~/shared/types/settings.types';
import { cn } from '~/shared/utils/tailwind';
import { getBudgetOptions } from './constants';

export default function StepThree({
  budgetType,
  updateBudgetType,
}: {
  budgetType: BudgetType;
  updateBudgetType: (budgetType: BudgetType) => void;
}) {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';
  const budgetOptions = getBudgetOptions(t);

  return (
    <View className="gap-4">
      <View className="-mt-10 items-center justify-center rounded-full">
        <BlurView top={-55} left={-35} size={500} intensity={25} />
        <BudgetLogo />
      </View>

      <View className="-mt-10 items-center gap-4 px-10">
        <ThemedText
          variant="primary"
          size="title"
          className={cn('text-center', isSpanish ? 'px-4' : 'px-10')}
        >
          {t('onboarding.step3.title')}
        </ThemedText>
        <ThemedText size="subtitle" className="text-center">
          {t('onboarding.step3.subtitle')}
        </ThemedText>
      </View>

      <View className="items-center justify-center gap-4 px-6">
        {budgetOptions.map((option) => {
          const isSelected = budgetType === option.id;
          return (
            <Card
              key={option.id}
              disabled={option.disabled}
              icon={
                <View
                  className={cn('rounded-xl p-2', isSelected ? 'bg-brand-brand500' : 'bg-gray-600')}
                >
                  {option.icon}
                </View>
              }
              onPress={() => updateBudgetType(option.id)}
              title={option.title}
              description={option.description}
              className={cn(
                isSelected ? 'bg-brand-brand500/15 border-brand-brand500 border-2' : ''
              )}
            />
          );
        })}
      </View>
    </View>
  );
}
