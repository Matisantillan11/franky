import * as icons from 'lucide-react-native/icons';
import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ColorValue, View } from 'react-native';
import { Badge, FlashList, FormField, ThemedText } from '~/components/ui';
import { useCategoriesByType } from '~/libs/fetcher';
import { AddTransactionFormValues } from './form/types';

export default function CategoriesList<T extends UseFormReturn<AddTransactionFormValues>>({
  form,
}: {
  form: T;
}) {
  const { data: categories } = useCategoriesByType('expense');

  const allCategories = useMemo(() => {
    if (!categories) return [];

    return [
      ...categories.slice(0, 5),
      {
        type: 'both',
        id: 'add-new-category-id',
        name: 'New category',
        icon: 'Plus',
        color: '#6B7280',
        isDefault: false,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      },
    ];
  }, [categories]);

  return (
    <View className="w-full gap-4 px-4">
      <ThemedText>Category</ThemedText>
      <FormField name="categoryId" form={form}>
        {({ field }) => (
          <FlashList
            horizontal
            data={allCategories}
            renderItem={({ item }) => {
              const LucideIcon = icons[item.icon as keyof typeof icons];
              const isCategorySelected = field.value === item.id;

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
                    onPress={() => field.onChange(item.id)}
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
