import React, { useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge, InsightCard, ThemedText } from '~/components/ui';
import { useSettings, useTransactions } from '~/libs/fetcher';
import { theme } from '~/shared/constants/theme';
import { cn } from '~/shared/utils/tailwind';
import { transformValueToCurrency, transformValueToInteger } from '~/shared/utils/text-utils';
import TransactionsList from './transactions-list';

export default function HomeScreen() {
  const { data: userSettings } = useSettings();
  const { data: transactions } = useTransactions();

  const budget = userSettings?.monthlyIncome as number;

  const totalExpenses = useMemo(() => {
    if (!transactions) return 0;
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === 'expense' && transaction.amount) {
        if (transaction.amount.toString().length > 4) {
          return acc + (transformValueToInteger(transaction.amount) as number);
        }
        return acc + transaction.amount;
      }
      return acc;
    }, 0);
  }, [transactions]);

  const remainingMonthlyBudget = useMemo(() => {
    if (!budget) return 0;
    if (!transactions) return transformValueToInteger(budget) as number;

    const normalisedBudget = transformValueToInteger(budget) as number;
    const isTotalExpensesBiggerThanNormalisedBudget = totalExpenses > normalisedBudget;
    const restValue = isTotalExpensesBiggerThanNormalisedBudget
      ? totalExpenses - normalisedBudget
      : normalisedBudget - totalExpenses;

    const remainingMoney = transformValueToCurrency(restValue.toString());
    return isTotalExpensesBiggerThanNormalisedBudget ? `- ${remainingMoney} ` : remainingMoney;
  }, [userSettings, transactions, totalExpenses]);

  const spentPercentage = useMemo(() => {
    if (!budget) return 0;
    const normalisedBudget = transformValueToInteger(budget as number) as number;
    if (!normalisedBudget) return 0;
    return (totalExpenses / normalisedBudget) * 100;
  }, [budget, totalExpenses]);

  return (
    <SafeAreaView edges={['top']}>
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
            label={`Income: ${transformValueToCurrency(budget?.toString()?.slice(0, -2) ?? '0')}`}
            color={theme.brand.brand400}
            variant="default"
            className="border-brand-brand500 border"
          />
          <Badge
            label={`Spent: ${transformValueToCurrency(totalExpenses.toString())}`}
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
