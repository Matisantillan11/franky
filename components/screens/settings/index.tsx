import { View } from 'react-native';
import { ThemedText } from '~/components/ui';

export default function SettingsScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-3">
      <ThemedText variant="primary" className="text-2xl font-bold">
        Settings
      </ThemedText>
      <ThemedText>Manage your preferences here.</ThemedText>
    </View>
  );
}
