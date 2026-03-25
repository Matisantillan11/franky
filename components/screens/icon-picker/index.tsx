import { useRouter } from 'expo-router';
import * as LucideIcons from 'lucide-react-native/icons';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import ModalScreenNodge from '~/components/modal-screen-nodge';
import { Input, ThemedText } from '~/components/ui';
import { theme } from '~/shared/constants/theme';
import { useIconPickerStore } from '~/shared/stores/icon-picker';

const ICON_NAMES: string[] = Object.keys(LucideIcons).sort();

const NUM_COLUMNS = 5;

type IconItemProps = {
  name: string;
  isSelected: boolean;
  onPress: () => void;
};

function IconItem({ name, isSelected, onPress }: IconItemProps) {
  const Icon = LucideIcons[name as keyof typeof LucideIcons] as React.ComponentType<{
    size?: number;
    color?: string;
  }>;

  if (!Icon) return null;

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center justify-center rounded-2xl py-4"
      style={{
        backgroundColor: isSelected ? theme.brand.brand500 + '30' : theme.gray.gray800 + '60',
        borderWidth: isSelected ? 1.5 : 0,
        borderColor: isSelected ? theme.brand.brand500 : 'transparent',
        margin: 4,
      }}
    >
      <Icon size={26} color={isSelected ? theme.brand.brand500 : theme.text.secondary} />
    </Pressable>
  );
}

export default function IconPickerScreen() {
  const router = useRouter();
  const { selectedIcon, select } = useIconPickerStore();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return ICON_NAMES;
    const q = query.toLowerCase();
    return ICON_NAMES.filter((n) => n.toLowerCase().includes(q));
  }, [query]);

  function handleSelect(name: string) {
    select(name);
    router.back();
  }

  return (
    <View className="bg-brand-brand900 flex-1">
      <ModalScreenNodge />

      <View className="px-5 pb-4">
        <ThemedText variant="primary" className="text-center text-2xl font-bold">
          Choose Icon
        </ThemedText>
      </View>

      <Input
        value={query}
        onChangeText={setQuery}
        placeholder="Search icons..."
        placeholderTextColor={theme.gray.gray500}
        autoCapitalize="none"
        autoCorrect={false}
        className="my-5 rounded-full"
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 40 }}
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
        renderItem={({ item }) => (
          <IconItem
            name={item}
            isSelected={item === selectedIcon}
            onPress={() => handleSelect(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}
