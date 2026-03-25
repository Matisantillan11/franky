import { useRouter } from 'expo-router';
import { Check, Palette, PlusCircle } from 'lucide-react-native';
import * as icons from 'lucide-react-native/icons';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import ModalScreenNodge from '~/components/modal-screen-nodge';
import { Button, Input, ThemedText, useToast } from '~/components/ui';
import { useCreateCategory } from '~/libs/fetcher';
import { theme } from '~/shared/constants/theme';
import { useColorPickerStore } from '~/shared/stores/color-picker';
import { useIconPickerStore } from '~/shared/stores/icon-picker';

const PRESET_COLORS = [theme.brand.brand500, '#8B5CF6', '#F97066', '#FDB022', '#3B82F6'];

export default function AddCategoryScreen() {
  const router = useRouter();
  const { selectedIcon } = useIconPickerStore();
  const { selectedColor, select: selectColor } = useColorPickerStore();

  const [name, setName] = useState('Shopping');

  const { addToast } = useToast();
  const { mutate: createCategory, isPending } = useCreateCategory();

  const LucideIcon = icons[selectedIcon as keyof typeof icons] as React.ComponentType<{
    size?: number;
    color?: string;
  }>;

  const isCustomColor = !PRESET_COLORS.includes(selectedColor);

  const COLORS = isCustomColor ? PRESET_COLORS.slice(1, PRESET_COLORS.length) : PRESET_COLORS;

  const handleCreateCategory = () => {
    createCategory(
      {
        name,
        type: 'expense',
        icon: selectedIcon,
        color: selectedColor,
      },
      {
        onSuccess: () => {
          router.back();
        },
        onError: () => {
          addToast({
            message: 'There was an error creating your category. Please, try again later.',
            type: 'error',
          });
        },
      }
    );
  };

  return (
    <View className="bg-brand-brand900 flex-1">
      <ModalScreenNodge />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 gap-8 pb-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center gap-2 pt-4">
          <ThemedText variant="primary" className="text-2xl">
            New Category
          </ThemedText>
          <ThemedText variant="secondary" className="text-base">
            Personalize your spending tracker
          </ThemedText>
        </View>

        <View className="items-center gap-3">
          <Pressable
            onPress={() => router.push('/icon-picker')}
            className="flex-row items-center gap-4 rounded-full border-2 border-dashed px-6 py-4"
            style={{
              borderColor: selectedColor,
              backgroundColor: selectedColor + '20',
            }}
          >
            <View
              className="h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: selectedColor + '40' }}
            >
              {LucideIcon && <LucideIcon size={24} color={selectedColor} />}
            </View>
            <ThemedText variant="primary" className="text-2xl font-bold">
              {name || 'Category'}
            </ThemedText>
          </Pressable>

          <ThemedText variant="secondary" className="text-sm">
            Tap to change icon
          </ThemedText>
        </View>

        <Input
          value={name}
          onChangeText={setName}
          placeholder="Enter category name"
          label="Category Name"
          placeholderTextColor={theme.gray.gray500}
        />

        <View className="gap-4">
          <View className="flex-row items-center justify-between">
            <ThemedText variant="primary" className="text-base font-bold">
              Choose Color
            </ThemedText>
            <ThemedText className="text-brand-brand500 font-mono text-xs font-bold tracking-widest">
              {selectedColor.toUpperCase()}
            </ThemedText>
          </View>

          <View className="flex-row flex-wrap gap-3">
            {isCustomColor && (
              <Pressable
                onPress={() => router.push('/color-picker')}
                className="h-12 w-12 items-center justify-center rounded-full"
                style={{
                  backgroundColor: selectedColor,
                  borderWidth: 2.5,
                  borderColor: theme.text.primary,
                }}
              >
                <Check size={20} color={theme.text.primary} />
              </Pressable>
            )}

            {COLORS.map((color) => {
              const isSelected = selectedColor === color;

              return (
                <Pressable
                  key={color}
                  onPress={() => selectColor(color)}
                  className="h-12 w-12 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: color,
                    borderWidth: isSelected ? 2.5 : 0,
                    borderColor: theme.text.primary,
                  }}
                >
                  {isSelected && <Check size={20} color={theme.text.primary} />}
                </Pressable>
              );
            })}

            <Pressable
              onPress={() => router.push('/color-picker')}
              className="h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: theme.gray.gray700 }}
            >
              <Palette size={20} color={theme.text.secondary} />
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View className="px-5 pb-8">
        <Button
          size="lg"
          className="w-full"
          leftIcon={<PlusCircle size={20} color={theme.brand.brand900} />}
          onPress={handleCreateCategory}
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create Category'}
        </Button>
      </View>
    </View>
  );
}
