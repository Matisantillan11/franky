import { View } from 'react-native';
import Card from '~/components/card';
import { ThemedText } from '~/components/ui';
import { GoalType } from '~/shared/types/settings.types';
import { cn } from '~/shared/utils/tailwind';
import { GOAL_OPTIONS } from './constants';

export default function StepSix({
  goal,
  updateGoal,
}: {
  goal: GoalType;
  updateGoal: (goal: GoalType) => void;
}) {
  return (
    <View className="gap-4">
      <View className="items-center gap-4 px-10">
        <ThemedText variant="primary" size="title" className="px-10 text-center">
          What&apos;s your main goal?
        </ThemedText>
        <ThemedText size="subtitle" className="text-center">
          This help us personalize your experience
        </ThemedText>
      </View>

      <View className="items-center justify-center gap-4 px-6">
        {GOAL_OPTIONS.map((option) => {
          const isSelected = goal === option.id;
          return (
            <Card
              key={option.title}
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
