import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { FlashList, ThemedText } from '~/components/ui';
import { useMonthlyBudgetLatest, useTransactions } from '~/libs/fetcher';
import { cn } from '~/shared/utils/tailwind';
import { transformValueToCurrency } from '~/shared/utils/text-utils';

export default function HomeScreen() {
  const { data: latestBudget } = useMonthlyBudgetLatest();
  const { data: transactions } = useTransactions();

  const remainingMonthlyBudget = useMemo(() => {
    if (!latestBudget) return 0;

    const budget = latestBudget.amount;

    if (!transactions) return budget;

    const totalExpenses = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'expense') {
        return acc + transaction.amount;
      }

      return acc;
    }, 0);

    console.log({ budget, totalExpenses });

    return transformValueToCurrency((budget - totalExpenses).toString());
  }, [latestBudget, transactions]);

  return (
    <ScrollView contentContainerClassName="p-4 gap-3" contentInsetAdjustmentBehavior="automatic">
      <View className="items-center justify-center gap-2">
        <ThemedText>Remaining monthly budget</ThemedText>
        <ThemedText variant="primary" className="mb-2 text-xl font-bold">
          {remainingMonthlyBudget}
        </ThemedText>
      </View>

      <View className="my-10 flex-1 gap-6">
        <ThemedText variant="secondary" size="subtitle">
          Recent transactions
        </ThemedText>
        <FlashList
          data={transactions}
          renderItem={({ item }) => {
            const isExpense = item?.type === 'expense';

            return (
              <View className="flex-row items-center justify-between py-1">
                <ThemedText>{item?.category?.name}</ThemedText>
                <ThemedText className={cn('font-bold', isExpense ? 'text-error-error500' : '')}>
                  {isExpense ? '-' : '+'} {transformValueToCurrency(item?.amount?.toString())}
                </ThemedText>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScrollView>
  );
}
