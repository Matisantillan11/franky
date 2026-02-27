import { View } from 'react-native';
import { ThemedText } from '~/components/ui';

export default function StatsScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-3">
      <ThemedText variant="primary" className="text-2xl font-bold">
        Stats
      </ThemedText>
      <ThemedText>Your spending insights will appear here.</ThemedText>
    </View>
  );
}
