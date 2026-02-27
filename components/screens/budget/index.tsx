import { View } from 'react-native';
import { ThemedText } from '~/components/ui';

export default function BudgetScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-3">
      <ThemedText variant="primary" className="text-2xl font-bold">
        Budget
      </ThemedText>
      <ThemedText>Manage your budget here.</ThemedText>
    </View>
  );
}
