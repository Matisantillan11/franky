import { View } from 'react-native';
import { Input, ThemedText } from '~/components/ui';

export default function StepFive() {
  return (
    <View className="gap-4">
      <View className="items-center gap-4 px-10">
        <ThemedText variant="primary" size="title" className="px-10 text-center">
          What&apos;s your monthly income?
        </ThemedText>
        <ThemedText size="subtitle" className="text-center">
          This helps us calculate your monthly spending power.
        </ThemedText>
      </View>

      <View className="mx-10 my-4 gap-4">
        <Input
          inputMode="decimal"
          keyboardType="number-pad"
          textContentType="none"
          size="lg"
          className="w-full"
          placeholder="$ 0,00"
        />
        <View className="mx-10">
          <ThemedText className="text-center">
            This helps us calculate your monthly spending power.
          </ThemedText>
        </View>
      </View>
    </View>
  );
}
