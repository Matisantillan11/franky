import { View } from 'react-native';
import { ThemedText } from '~/components/ui';

export default function AddCategoryScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-3">
      <ThemedText variant="primary" className="text-2xl font-bold">
        Add Category
      </ThemedText>
      <ThemedText>Manage your categories here.</ThemedText>
    </View>
  );
}
