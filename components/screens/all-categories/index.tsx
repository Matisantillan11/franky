import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryCard from '~/components/category-card';
import ModalScreenNodge from '~/components/modal-screen-nodge';
import { Button, FlashList, ThemedText } from '~/components/ui';
import { Category, CategoryType } from '~/libs';
import { useCategoriesByType } from '~/libs/fetcher';
import { useCategoryPickerStore } from '~/shared/stores/category-picker';

type HeaderItem = { type: 'header'; title: string };
type CategoryItem = { type: 'item'; data: Category };
type FlatItem = HeaderItem | CategoryItem;

export default function AllCategoriesScreen() {
  const { data: categories } = useCategoriesByType(['income', 'expense']);
  const { t } = useTranslation();
  const router = useRouter();

  const typeLabels: Record<string, string> = {
    income: t('category.all.income'),
    expense: t('category.all.expense'),
    both: t('category.all.both'),
  };

  const flatData = useMemo<FlatItem[]>(() => {
    if (!categories) return [];

    const order: Array<CategoryType> = ['expense', 'income'];
    const grouped = categories.reduce<Partial<Record<CategoryType, Category[]>>>((acc, cat) => {
      if (!acc[cat.type]) acc[cat.type] = [];
      acc[cat.type]!.push(cat);
      return acc;
    }, {});

    return order.flatMap((type) => {
      const items = grouped[type];
      if (!items?.length) return [];
      return [
        { type: 'header', title: typeLabels[type] } as HeaderItem,
        ...items.map((data) => ({ type: 'item', data }) as CategoryItem),
      ];
    });
  }, [categories, t]);

  const select = useCategoryPickerStore((s) => s.select);

  function handleSelect(categoryId: string) {
    select(categoryId);
    router.back();
  }

  const handleRedirectToAddCategory = () => {
    router.push('/add-category');
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1">
      <ModalScreenNodge />
      <View className="h-full">
        <View className="flex-1">
          <FlashList
            ListHeaderComponent={
              <ThemedText variant="primary" className="py-4 text-xl font-bold">
                {t('category.all.title')}
              </ThemedText>
            }
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
              return (
                <CategoryCard category={item.data} onPress={() => handleSelect(item.data.id)} />
              );
            }}
            ItemSeparatorComponent={({ leadingItem }) =>
              leadingItem?.type === 'item' ? <View className="h-2" /> : null
            }
            ListEmptyComponent={
              <View className="items-center py-16">
                <ThemedText className="opacity-40">{t('category.all.empty')}</ThemedText>
              </View>
            }
          />
        </View>
        <View className="mx-4 mb-16">
          <Button onPress={handleRedirectToAddCategory}>{t('category.all.addNew')}</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
