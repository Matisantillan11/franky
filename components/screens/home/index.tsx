import { ScrollView, View } from 'react-native';
import { ThemedText } from '~/components/ui';
import { useMonthlyBudgetLatest } from '~/libs/fetcher';
import { transformValueToCurrency } from '~/shared/utils/text-utils';

export default function HomeScreen() {
  const { data: latestBudget } = useMonthlyBudgetLatest();

  const monthlyBudget = transformValueToCurrency(latestBudget?.amount?.toString() ?? '0');

  return (
    <ScrollView contentContainerClassName="p-4 gap-3" contentInsetAdjustmentBehavior="automatic">
      <View className="items-center justify-center gap-2">
        <ThemedText>Remaining monthly budget</ThemedText>
        <ThemedText variant="primary" className="mb-2 text-xl font-bold">
          {monthlyBudget}
        </ThemedText>
      </View>
    </ScrollView>
  );
}
