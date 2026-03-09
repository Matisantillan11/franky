import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import ConditionalWrapper from '~/components/conditional-wrapper';
import { FlashList, ThemedText } from '~/components/ui';
import { useSettings, useTransactions } from '~/libs/fetcher';
import { cn } from '~/shared/utils/tailwind';
import { transformValueToCurrency } from '~/shared/utils/text-utils';

export default function HomeScreen() {
  const { data: userSettings } = useSettings();
  const { data: transactions } = useTransactions();

  const remainingMonthlyBudget = useMemo(() => {
    if (!userSettings) return 0;

    const budget = userSettings?.monthlyIncome;

    if (!transactions) return budget;

    const totalExpenses = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'expense') {
        return acc + transaction.amount;
      }

      return acc;
    }, 0);

    console.log({ budget, totalExpenses });

    return transformValueToCurrency((budget - totalExpenses).toString(), true);
  }, [userSettings, transactions]);

  const userHasTransactions = transactions && transactions?.length > 0;

  return (
    <ScrollView contentContainerClassName="p-4 gap-3" contentInsetAdjustmentBehavior="automatic">
      <View className="items-center justify-center gap-2">
        <ThemedText>Remaining monthly budget</ThemedText>
        <ThemedText variant="primary" className="mb-2 text-xl font-bold">
          {remainingMonthlyBudget}
        </ThemedText>
      </View>

      <ConditionalWrapper conditional={userHasTransactions}>
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
      </ConditionalWrapper>
    </ScrollView>
  );
}
