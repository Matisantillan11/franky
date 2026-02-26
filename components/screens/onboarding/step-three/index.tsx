import { View } from 'react-native';
import BudgetLogo from '~/assets/images/budget.svg';
import { BlurView } from '~/components/blur-circle';
import Card from '~/components/card';
import { ThemedText } from '~/components/ui';
import { BudgetType } from '~/shared/types/settings.types';
import { cn } from '~/shared/utils/tailwind';
import { BUDGET_OPTIONS } from './constants';

export default function StepThree({
  budgetType,
  updateBudgetType,
}: {
  budgetType: BudgetType;
  updateBudgetType: (budgetType: BudgetType) => void;
}) {
  return (
    <View className="gap-4">
      <View className="-mt-10 items-center justify-center rounded-full">
        <BlurView top={-55} left={-35} size={500} intensity={25} />
        <BudgetLogo />
      </View>

      <View className="-mt-10 items-center gap-4 px-10">
        <ThemedText variant="primary" size="title" className="px-10 text-center">
          How would you like to budget?
        </ThemedText>
        <ThemedText size="subtitle" className="text-center">
          Choose the setup that best fits your financial journey right now.
        </ThemedText>
      </View>

      <View className="items-center justify-center gap-4 px-6">
        {BUDGET_OPTIONS.map((option) => {
          const isSelected = budgetType === option.id;
          return (
            <Card
              key={option.title}
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
