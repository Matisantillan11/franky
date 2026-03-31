import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge, Button, InsightCard, Plus, Settings, ThemedText } from '~/components/ui';
import { useSettings, useTransactions } from '~/libs/fetcher';
import { theme } from '~/shared/constants/theme';
import { CurrencyType } from '~/shared/types/settings.types';
import { getCurrencyWithoutSuffix } from '~/shared/utils/money-utils';
import { cn } from '~/shared/utils/tailwind';
import { transformValueToCurrency } from '~/shared/utils/text-utils';
import TransactionsList from './transactions-list';

export default function HomeScreen() {
  const { data: userSettings } = useSettings();
  const { data: transactions } = useTransactions();

  const router = useRouter();

  const budget = userSettings?.monthlyIncome as number;
  const currency = getCurrencyWithoutSuffix(userSettings?.currency as CurrencyType);

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
    return isTotalExpensesBiggerThanBudget
      ? `- ${currency} ${remainingMoney} `
      : `${currency} ${remainingMoney}`;
  }, [budget, transactions, totalExpenses]);

  const spentPercentage = useMemo(() => {
    if (!budget) return 0;
    return (totalExpenses / budget) * 100;
  }, [budget, totalExpenses]);

  const handleAddTransaction = () => {
    router.push('/add-transaction');
  };

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1">
      <View className="items-center justify-center gap-2 px-6 pt-10">
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
            label={`Income: ${currency} ${transformValueToCurrency(budget?.toString() ?? '0', true)}`}
            color={theme.brand.brand400}
            variant="default"
            className="border-brand-brand500 border"
          />
          <Badge
            label={`Spent: ${currency} ${transformValueToCurrency(totalExpenses.toString(), true)}`}
            color={theme.error.error400}
            variant="default"
            className="border-error-error500 border"
          />
        </View>
      </View>

      <View className="mt-10 px-6">
        <InsightCard percentage={spentPercentage} />
      </View>

      <TransactionsList budget={budget} totalExpenses={totalExpenses} />

      <View className="absolute top-0 right-6 z-50 h-screen justify-between py-16">
        <Button
          variant="ghost"
          size="icon"
          leftIcon={<Settings color={theme.gray.gray100} />}
          onPress={handleSettingsPress}
        />
        <Button
          onPress={handleAddTransaction}
          size="icon"
          leftIcon={<Plus color={theme.gray.gray100} />}
        />
      </View>
    </SafeAreaView>
  );
}
