import { Slot } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingLayout() {
  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1">
      <View className="h-full items-center justify-between gap-4">
        <Slot />
      </View>
    </SafeAreaView>
  );
}
