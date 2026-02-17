import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, ThemedText } from '~/components/ui';

export default function Inputs() {
  return (
    <SafeAreaView>
      <ScrollView className="h-full w-full px-4">
        <ThemedText variant="primary" size="title">
          Inputs
        </ThemedText>
        <View className="mt-4">
          <View className="mt-4 flex-col gap-4">
            <Input placeholder="$ 0,00" />
            <Input placeholder="$ 0,00" variant="ghost" />
          </View>
        </View>

        <View className="mt-4">
          <ThemedText variant="secondary" size="subtitle">
            Inputs REQUIRED
          </ThemedText>
          <View className="mt-4 flex-col gap-4">
            <Input placeholder="$ 0,00" label="Default input" isRequired />
            <Input placeholder="$ 0,00" variant="ghost" label="Ghost input" isRequired />
          </View>
        </View>

        <View className="mt-4">
          <ThemedText variant="secondary" size="subtitle">
            Inputs ERROR
          </ThemedText>
          <View className="mt-4 flex-col gap-4">
            <Input
              placeholder="$ 0,00"
              label="Default input"
              isError
              errorText="Subtext as error"
            />
            <Input
              placeholder="$ 0,00"
              variant="ghost"
              label="Ghost input"
              isError
              errorText="Subtext as error"
            />

            <Input
              placeholder="$ 0,00"
              label="Default input"
              isRequired
              isError
              errorText="Subtext as error"
            />
            <Input
              placeholder="$ 0,00"
              variant="ghost"
              label="Ghost input"
              size="lg"
              isRequired
              isError
              errorText="Subtext as error"
            />
          </View>
        </View>

        <View className="mt-4">
          <ThemedText variant="secondary" size="subtitle">
            Inputs SIZE
          </ThemedText>
          <View className="mt-4 flex-col gap-4">
            <Input placeholder="$ 0,00" />
            <Input size="lg" placeholder="$ 0,00" />

            <Input placeholder="$ 0,00" variant="ghost" />
            <Input size="lg" placeholder="$ 0,00" variant="ghost" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
