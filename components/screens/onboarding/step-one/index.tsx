import { View } from 'react-native';
import WelcomeLogo from '~/assets/images/welcome.svg';
import { BlurView } from '~/components/blur-circle';
import { ThemedText } from '~/components/ui';

export default function StepOne() {
  return (
    <View className="my-10 gap-4">
      <View className="items-center justify-center">
        <View className="items-center justify-center rounded-full p-10">
          <BlurView top={-55} left={-60} size={500} intensity={25} />
          <WelcomeLogo />
        </View>
      </View>

      <View className="items-center gap-4 px-10">
        <ThemedText variant="primary" size="title" className="px-10 text-center">
          Money, without the stress
        </ThemedText>
        <ThemedText size="subtitle" className="text-center">
          A calm way to understand, plan and share your money.
        </ThemedText>
      </View>
    </View>
  );
}
