import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from '~/components/blur-circle';
import { Button, ThemedText } from '~/components/ui';
import { SuccessAnimatedIcon } from '~/components/ui/icons';

export default function SuccessScreen({
  actionText,
  handleActionPress,
}: {
  actionText: string;
  handleActionPress: () => void;
}) {
  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1">
      <View className="my-10 w-full flex-1 justify-between gap-10">
        <View className="h-full items-center justify-between gap-4">
          <View className="gap-4">
            <View className="items-center justify-center">
              <View className="items-center justify-center rounded-full p-10">
                <BlurView top={-100} left={-80} size={500} intensity={25} />
                <SuccessAnimatedIcon size={200} duration={1500} />
              </View>
            </View>

            <View className="items-center gap-4 px-10">
              <ThemedText variant="primary" size="title" className="px-10 text-center">
                You're all set!
              </ThemedText>
              <ThemedText size="subtitle" className="px-8 text-center">
                Your budget is now clear and ready
              </ThemedText>
            </View>
          </View>

          <View className="w-full px-4">
            <Button className="w-full" onPress={handleActionPress}>
              {actionText}
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
