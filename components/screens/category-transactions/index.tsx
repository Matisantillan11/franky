import * as icons from 'lucide-react-native/icons';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorValue, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConditionalWrapper from '~/components/conditional-wrapper';
import ModalScreenNodge from '~/components/modal-screen-nodge';
import { FlashList, ThemedText } from '~/components/ui';
import { TransactionWithCategory } from '~/libs/database/types';
import { useCategoryById, useTransactions } from '~/libs/fetcher';
import { transformValueToCurrency } from '~/shared/utils/text-utils';

function formatDateGroup(date: Date, todayLabel: string, yesterdayLabel: string, lang: string): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return todayLabel;
  if (date.toDateString() === yesterday.toDateString()) return yesterdayLabel;

  const locale = lang === 'es' ? 'es-ES' : 'en-US';
  return date.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });
}

type HeaderItem = { type: 'header'; title: string };
type TransactionItem = { type: 'item'; data: TransactionWithCategory };
type FlatItem = HeaderItem | TransactionItem;

export default function CategoryTransactionsScreen({ categoryId }: { categoryId: string }) {
  const { data: transactions } = useTransactions({ categoryId });
  const { data: category } = useCategoryById(categoryId);
  const { t, i18n } = useTranslation();

  const LucideIcon = category?.icon
    ? (icons[category.icon as keyof typeof icons] as React.ComponentType<{
        size?: number;
        color?: ColorValue;
      }>)
    : null;

  const total = useMemo(
    () => transactions?.reduce((acc, tx) => acc + tx.amount, 0) ?? 0,
    [transactions]
  );

  const flatData = useMemo<FlatItem[]>(() => {
    if (!transactions) return [];

    const todayLabel = t('transaction.today');
    const yesterdayLabel = t('transaction.yesterday');

    const grouped = transactions.reduce<Record<string, TransactionWithCategory[]>>((acc, tx) => {
      const key = formatDateGroup(new Date(tx.dueDate), todayLabel, yesterdayLabel, i18n.language);
      if (!acc[key]) acc[key] = [];
      acc[key].push(tx);
      return acc;
    }, {});

    return Object.entries(grouped).flatMap(([title, items]) => [
      { type: 'header', title } as HeaderItem,
      ...items.map((data) => ({ type: 'item', data }) as TransactionItem),
    ]);
  }, [transactions, t, i18n.language]);

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1">
      <ModalScreenNodge />
      <View className="flex-row items-center gap-3 px-4 pb-4">
        {LucideIcon && (
          <View
            className="h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: (category?.color ?? '#fff') + '20' }}
          >
            <LucideIcon size={18} color={(category?.color ?? '#fff') as ColorValue} />
          </View>
        )}

        <ThemedText variant="primary" className="flex-1 text-lg font-bold">
          {category?.name ?? ''}
        </ThemedText>

        <ThemedText variant="primary" className="text-base font-semibold">
          {transformValueToCurrency(total.toString(), true)}
        </ThemedText>
      </View>
      <View className="h-full">
        <FlashList
          data={flatData}
          keyExtractor={(item) =>
            item.type === 'header' ? `header-${item.title}` : item.data.id
          }
          getItemType={(item) => item.type}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
          renderItem={({ item }) => {
            if (item.type === 'header') {
              return (
                <View className="pt-4 pb-2">
                  <ThemedText className="text-xs font-semibold tracking-widest uppercase opacity-50">
                    {item.title}
                  </ThemedText>
                </View>
              );
            }

            const { data: tx } = item;
            const locale = i18n.language === 'es' ? 'es-ES' : 'en-US';
            return (
              <View className="bg-brand-brand800/60 rounded-2xl px-4 py-3">
                <View className="flex-row items-center">
                  <ThemedText variant="primary" className="flex-1 text-sm font-bold">
                    {transformValueToCurrency(tx.amount.toString(), true)}
                  </ThemedText>
                  <ThemedText className="text-sm opacity-80">
                    {new Date(tx.dueDate).toLocaleTimeString(locale, {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </ThemedText>
                </View>
                <ConditionalWrapper conditional={!!tx.note}>
                  <ThemedText className="mt-1 max-w-[50%] text-xs opacity-80" numberOfLines={2}>
                    {tx.note}
                  </ThemedText>
                </ConditionalWrapper>
              </View>
            );
          }}
          ItemSeparatorComponent={({ leadingItem }) =>
            leadingItem?.type === 'item' ? <View className="h-2" /> : null
          }
          ListEmptyComponent={
            <View className="items-center py-16">
              <ThemedText className="opacity-40">{t('transaction.noTransactions')}</ThemedText>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
