import { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import ConditionalWrapper from '~/components/conditional-wrapper';
import { ExpenseCard, FlashList, ThemedText } from '~/components/ui';
import { useTransactions } from '~/libs/fetcher';
import { theme } from '~/shared/constants/theme';
import { transformValueToCurrency, transformValueToInteger } from '~/shared/utils/text-utils';

export default function TransactionsList({
  budget,
  totalExpenses,
}: {
  budget: number;
  totalExpenses: number;
}) {
  const { data: transactions } = useTransactions();
  const userHasTransactions = transactions && transactions?.length > 0;

  const getFrontColor = useCallback(
    (value?: number) => {
      if (!budget || !value) return theme.brand.brand700;

      const budgetWithoutDecimals = transformValueToInteger(budget as number);

      if (!budgetWithoutDecimals) return theme.brand.brand700;
      const percentage = (value / budgetWithoutDecimals) * 100;

      if (percentage > 75) return theme.error.error700 + '6D';
      if (percentage > 50) return theme.warning.warning700 + '6D';
      if (percentage > 30) return theme.brand.brand700 + '6D';
    },
    [budget]
  );

  const groupedExpenses = useMemo(() => {
    if (!transactions) return [];

    const grouped = transactions.reduce<
      Record<
        string,
        { total: number; color: string; name: string; icon: string; categoryId: string }
      >
    >((acc, t) => {
      if (t.type !== 'expense') return acc;
      const key = t.categoryId ?? 'uncategorized';
      if (!acc[key]) {
        if (t?.category?.name) {
          acc[key] = {
            total: 0,
            color: (t.category?.color ?? getFrontColor(t.amount) ?? theme.brand.brand700) as string,
            name: t.category?.name as string,
            icon: t.category?.icon as string,
            categoryId: key,
          };
        }
      }

      if (acc[key]) {
        acc[key].total +=
          t.amount.toString().length > 4 ? (transformValueToInteger(t.amount) as number) : t.amount;
      }

      return acc;
    }, {});

    return Object.values(grouped);
  }, [transactions, getFrontColor]);

  return (
    <ConditionalWrapper conditional={userHasTransactions}>
      <View className="mt-4 h-full gap-6 p-4 pb-72">
        <ThemedText size="subtitle" variant="primary">
          Recent transactions
        </ThemedText>
        <View className="flex-1 gap-6 pb-96">
          <FlashList
            data={groupedExpenses}
            renderItem={({ item }) => (
              <ExpenseCard
                icon={item.icon}
                category={item.name}
                amount={transformValueToCurrency(item.total.toString())}
                color={item.color}
                progress={item.total / totalExpenses}
              />
            )}
            keyExtractor={(item) => item.categoryId}
            ItemSeparatorComponent={() => <View className="h-3" />}
          />
        </View>
      </View>
    </ConditionalWrapper>
  );
}
