import React, { useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge, InsightCard, ThemedText } from '~/components/ui';
import { useSettings, useTransactions } from '~/libs/fetcher';
import { theme } from '~/shared/constants/theme';
import { cn } from '~/shared/utils/tailwind';
import { transformValueToCurrency } from '~/shared/utils/text-utils';
import TransactionsList from './transactions-list';

export default function HomeScreen() {
  const { data: userSettings } = useSettings();
  const { data: transactions } = useTransactions();

  const budget = userSettings?.monthlyIncome as number;

  const totalExpenses = useMemo(() => {
    if (!transactions) return 0;
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === 'expense' && transaction.amount) {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);
  }, [transactions]);

  const remainingMonthlyBudget = useMemo(() => {
    if (!budget) return 0;
    if (!transactions) return transformValueToCurrency(budget.toString(), true);

    const isTotalExpensesBiggerThanBudget = totalExpenses > budget;
    const restValue = isTotalExpensesBiggerThanBudget
      ? totalExpenses - budget
      : budget - totalExpenses;

    const remainingMoney = transformValueToCurrency(restValue.toString(), true);
    return isTotalExpensesBiggerThanBudget ? `- ${remainingMoney} ` : remainingMoney;
  }, [budget, transactions, totalExpenses]);

  const spentPercentage = useMemo(() => {
    if (!budget) return 0;
    return (totalExpenses / budget) * 100;
  }, [budget, totalExpenses]);

  return (
    <SafeAreaView edges={['top', 'bottom']}>
      <View className="items-center justify-center gap-2">
        <ThemedText>Remaining monthly budget</ThemedText>
        <ThemedText
          variant="primary"
          className={cn(
            'mb-2 text-xl font-bold',
            remainingMonthlyBudget.toString().includes('-') ? 'text-error-error500' : ''
          )}
        >
          {remainingMonthlyBudget}
        </ThemedText>
        <View className="flex-row gap-3">
          <Badge
            label={`Income: ${transformValueToCurrency(budget?.toString() ?? '0', true)}`}
            color={theme.brand.brand400}
            variant="default"
            className="border-brand-brand500 border"
          />
          <Badge
            label={`Spent: ${transformValueToCurrency(totalExpenses.toString(), true)}`}
            color={theme.error.error400}
            variant="default"
            className="border-error-error500 border"
          />
        </View>
      </View>

      <View className="mt-10 px-4">
        <InsightCard percentage={spentPercentage} />
      </View>

      <TransactionsList budget={budget} totalExpenses={totalExpenses} />
    </SafeAreaView>
  );
}
