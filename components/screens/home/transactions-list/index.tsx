import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import ConditionalWrapper from '~/components/conditional-wrapper';
import { ExpenseCard, FlashList, ThemedText } from '~/components/ui';
import { TransactionType } from '~/libs';
import { useSettings, useTransactions } from '~/libs/fetcher';
import { theme } from '~/shared/constants/theme';
import { CurrencyType } from '~/shared/types/settings.types';
import { getCurrencyWithoutSuffix } from '~/shared/utils/money-utils';
import { transformValueToCurrency } from '~/shared/utils/text-utils';

type GroupedExpense = {
  total: number;
  color: string;
  name: string;
  icon: string;
  categoryId: string;
  type: TransactionType;
};

export default function TransactionsList({
  budget,
  totalExpenses,
}: {
  budget: number;
  totalExpenses: number;
}) {
  const router = useRouter();

  const { data: transactions } = useTransactions();
  const { data: userSettings } = useSettings();

  const userHasTransactions = transactions && transactions?.length > 0;
  const currency = getCurrencyWithoutSuffix(userSettings?.currency as CurrencyType);

  const getFrontColor = useCallback(
    (value?: number) => {
      if (!budget || !value) return theme.brand.brand700;

      const percentage = (value / budget) * 100;

      if (percentage > 75) return theme.error.error700 + '6D';
      if (percentage > 50) return theme.warning.warning700 + '6D';
      if (percentage > 30) return theme.brand.brand700 + '6D';
    },
    [budget]
  );

  const groupedExpenses = useMemo(() => {
    if (!transactions) return [];

    const grouped = transactions.reduce<Record<string, GroupedExpense>>((acc, t) => {
      const key = t.categoryId ?? 'uncategorized';
      if (!acc[key]) {
        if (t?.category?.name) {
          acc[key] = {
            total: 0,
            type: t.type,
            color: (t.category?.color ?? getFrontColor(t.amount) ?? theme.brand.brand700) as string,
            name: t.category?.name as string,
            icon: t.category?.icon as string,
            categoryId: key,
          };
        }
      }

      if (acc[key]) {
        acc[key].total += t.amount;
      }

      return acc;
    }, {});

    return Object.values(grouped).sort((a, b) => b.total - a.total);
  }, [transactions, getFrontColor]);

  return (
    <ConditionalWrapper conditional={userHasTransactions}>
      <View className="h-full px-2 py-10">
        <View className="flex-1 gap-6 px-4 pb-64">
          <FlashList
            ListHeaderComponent={
              <View className="my-4 flex-row">
                <ThemedText size="subtitle" variant="primary">
                  Recent transactions
                </ThemedText>
              </View>
            }
            data={groupedExpenses}
            renderItem={({ item }) => {
              return (
                <ExpenseCard
                  icon={item.icon}
                  category={item.name}
                  amount={`${currency} ${transformValueToCurrency(item.total.toString(), true)}`}
                  type={item.type}
                  color={item.color}
                  progress={item.total / totalExpenses}
                  onPress={() => router.push(`/transactions/${item.categoryId}`)}
                />
              );
            }}
            keyExtractor={(item) => item.categoryId}
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </View>
      </View>
    </ConditionalWrapper>
  );
}
