import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ThemedText } from '~/components/ui';

export default function Onboarding() {
  return (
    <SafeAreaView>
      <ScrollView className="h-full w-full px-4">
        <ThemedText variant="primary" size="title">
          Buttons
        </ThemedText>

        <View className="mt-4 flex-col gap-4">
          <ThemedText variant="secondary" size="subtitle">
            Default
          </ThemedText>
          <View className="flex-col gap-4">
            <Button>Button</Button>

            <Button disabled>Button</Button>
          </View>
        </View>

        <View className="mt-4 flex-col gap-4">
          <ThemedText variant="secondary" size="subtitle">
            Ghost
          </ThemedText>
          <View className="flex-col gap-4">
            <Button variant="ghost">Button</Button>

            <Button variant="ghost" disabled>
              Button
            </Button>
          </View>
        </View>

        <View className="mt-4 flex-col gap-4">
          <ThemedText variant="secondary" size="subtitle">
            Outline
          </ThemedText>
          <View className="flex-col gap-4">
            <Button variant="outline">Button</Button>

            <Button variant="outline" disabled>
              Button
            </Button>
          </View>
        </View>

        <View className="mt-4 flex-col gap-4">
          <ThemedText variant="secondary" size="subtitle">
            With Icons
          </ThemedText>
          <View className="flex-col gap-4">
            <Button className="gap-x-2" leftIcon={<Text>👈</Text>}>
              Button
            </Button>

            <Button className="gap-x-2" rightIcon={<Text>👉</Text>}>
              Button
            </Button>

            <Button className="gap-x-2" leftIcon={<Text>👈</Text>} rightIcon={<Text>👉</Text>}>
              Button
            </Button>
          </View>
        </View>

        <View className="mt-4 flex-col gap-4">
          <ThemedText variant="secondary" size="subtitle">
            Icon Only
          </ThemedText>
          <View className="flex-row gap-10">
            <Button size="icon" leftIcon={<Text>👈</Text>} />
            <Button variant="ghost" size="icon" leftIcon={<Text>👈</Text>} />
            <Button variant="outline" size="icon" leftIcon={<Text>👈</Text>} />
            <Button disabled size="icon" leftIcon={<Text>👈</Text>} />
          </View>
        </View>

        <View className="mt-4 flex-col gap-4">
          <ThemedText variant="secondary" size="subtitle">
            Sizes
          </ThemedText>
          <View className="flex-col gap-4">
            <Button size="sm">Button</Button>

            <Button size="default">Button</Button>

            <Button size="lg">Button</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
