import { useRouter } from 'expo-router';
import * as icons from 'lucide-react-native/icons';
import { useMemo } from 'react';
import { ColorValue, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ModalScreenNodge from '~/components/modal-screen-nodge';
import { Button, FlashList, ThemedText } from '~/components/ui';
import { Category, CategoryType } from '~/libs';
import { useCategoriesByType } from '~/libs/fetcher';
import { useCategoryPickerStore } from '~/shared/stores/category-picker';

const TYPE_LABELS: Record<string, string> = {
  income: 'Income',
  expense: 'Expense',
  both: 'Income & Expense',
};

type HeaderItem = { type: 'header'; title: string };
type CategoryItem = { type: 'item'; data: Category };
type FlatItem = HeaderItem | CategoryItem;

function CategoryCard({ category, onPress }: { category: Category; onPress: () => void }) {
  const LucideIcon = icons[category.icon as keyof typeof icons] as React.ComponentType<{
    size?: number;
    color?: ColorValue;
  }>;

  return (
    <Button
      variant="ghost"
      onPress={onPress}
      leftIcon={
        <View
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: (category.color ?? '#fff') + '30' }}
        >
          {LucideIcon && <LucideIcon size={20} color={category.color as ColorValue} />}
        </View>
      }
      className="w-full justify-start gap-4 rounded-2xl px-4 py-4"
      style={{ backgroundColor: (category.color ?? '#fff') + '18' }}
    >
      <ThemedText variant="primary" className="h-fulltext-base font-semibold">
        {category.name}
      </ThemedText>
    </Button>
  );
}

export default function AllCategoriesScreen() {
  const { data: categories } = useCategoriesByType(['income', 'expense']);
  const router = useRouter();

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
        { type: 'header', title: TYPE_LABELS[type] } as HeaderItem,
        ...items.map((data) => ({ type: 'item', data }) as CategoryItem),
      ];
    });
  }, [categories]);

  const select = useCategoryPickerStore((s) => s.select);

  function handleSelect(categoryId: string) {
    select(categoryId);
    router.back();
  }

  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1">
      <ModalScreenNodge />
      <View className="h-full">
        <View className="flex-1">
          <FlashList
            ListHeaderComponent={
              <ThemedText variant="primary" className="px-4 pb-4 text-xl font-bold">
                Categories
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
                <ThemedText className="opacity-40">No categories</ThemedText>
              </View>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
