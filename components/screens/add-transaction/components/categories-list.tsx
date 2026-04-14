import { useRouter } from 'expo-router';
import * as icons from 'lucide-react-native/icons';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import { ColorValue, View } from 'react-native';
import { Badge, FlashList, FormField, ThemedText } from '~/components/ui';
import { Category } from '~/libs';
import { useCategoriesByType } from '~/libs/fetcher';
import { useCategoryPickerStore } from '~/shared/stores/category-picker';
import { AddTransactionFormValues } from './form/types';

export default function CategoriesList<T extends UseFormReturn<AddTransactionFormValues>>({
  form,
}: {
  form: T;
}) {
  const { data: categories } = useCategoriesByType(['expense', 'income', 'both']);
  const router = useRouter();
  const { t } = useTranslation();
  const selectedCategoryId = useCategoryPickerStore((s) => s.selectedCategoryId);
  const clear = useCategoryPickerStore((s) => s.clear);

  // Sync the store selection into the form, then clear it
  useEffect(() => {
    if (selectedCategoryId) {
      form.setValue('categoryId', selectedCategoryId);
      clear();
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    return () => clear();
  }, []);

  // Use the store value immediately (before the form syncs) to avoid a render delay
  const categoryId = selectedCategoryId ?? form.watch('categoryId');

  const allCategories: Array<Category> = useMemo(() => {
    if (!categories) return [];
    const bothCategories = categories.filter((c) => c.type === 'both');
    const selectedIndex = categories.findIndex((c) => c.id === categoryId);

    if (selectedIndex > 0) {
      const [selected] = categories.splice(selectedIndex, 1);
      categories.unshift(selected);
    }

    const filteredCategories = categories.filter(
      (c) => c.type === 'expense' || c.type === 'both' || c.id === categoryId
    );

    return [...filteredCategories.slice(0, 4), ...bothCategories];
  }, [categories, categoryId]);

  return (
    <View className="w-full gap-4 px-4">
      <ThemedText>{t('transaction.category')}</ThemedText>
      <FormField name="categoryId" form={form}>
        {({ field }) => (
          <FlashList
            horizontal
            data={allCategories}
            renderItem={({ item }) => {
              const LucideIcon = icons[item.icon as keyof typeof icons];
              const isCategorySelected = (selectedCategoryId ?? field.value) === item.id;
              const isAllCategoriesButton = item.type === 'both';

              return (
                <View className="px-1">
                  <Badge
                    variant={isCategorySelected ? 'default' : 'outline'}
                    leftIcon={<LucideIcon size={20} color={item.color as ColorValue} />}
                    style={({ pressed }) => [
                      {
                        backgroundColor:
                          pressed || isCategorySelected ? `${item.color}30` : 'transparent',
                        borderColor: item.color as ColorValue,
                        borderStyle: isCategorySelected ? 'solid' : 'dashed',
                      },
                    ]}
                    onPress={() => {
                      if (isAllCategoriesButton) {
                        router.push('/all-categories');
                      } else {
                        field.onChange(item.id);
                      }
                    }}
                  />
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        )}
      </FormField>
    </View>
  );
}
