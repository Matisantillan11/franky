import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Onboarding() {
  return (
    <SafeAreaView>
      <View className="h-full w-full items-center justify-center">
        <Text className="text-text-tertiary text-3xl font-bold">Tailwind config</Text>
      </View>
    </SafeAreaView>
  );
}
