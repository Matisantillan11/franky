import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Card from '~/components/card';
import { ThemedText } from '~/components/ui';
import { GoalType } from '~/shared/types/settings.types';
import { cn } from '~/shared/utils/tailwind';
import { getGoalOptions } from './constants';

export default function StepSix({
  goal,
  updateGoal,
}: {
  goal: GoalType;
  updateGoal: (goal: GoalType) => void;
}) {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';
  const goalOptions = getGoalOptions(t);

  return (
    <View className="gap-4">
      <View className="items-center gap-4 px-10">
        <ThemedText
          variant="primary"
          size="title"
          className={cn('text-center', isSpanish ? '' : 'px-10')}
        >
          {t('onboarding.step6.title')}
        </ThemedText>
        <ThemedText size="subtitle" className="text-center">
          {t('onboarding.step6.subtitle')}
        </ThemedText>
      </View>

      <View className="items-center justify-center gap-4 px-6">
        {goalOptions.map((option) => {
          const isSelected = goal === option.id;
          return (
            <Card
              key={option.id}
              disabled={option.disabled}
              onPress={() => updateGoal(option.id)}
              icon={
                <View
                  className={cn('rounded-xl p-2', isSelected ? 'bg-brand-brand500' : 'bg-gray-600')}
                >
                  {option.icon}
                </View>
              }
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
