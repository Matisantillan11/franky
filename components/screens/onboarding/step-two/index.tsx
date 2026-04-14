import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import SecurityLogo from '~/assets/images/security.svg';
import { BlurView } from '~/components/blur-circle';
import { ThemedText } from '~/components/ui';

export default function StepTwo() {
  const { t } = useTranslation();

  return (
    <View className="gap-4">
      <View className="items-center justify-center rounded-full py-5">
        <BlurView top={-55} left={-35} size={500} intensity={25} />
        <SecurityLogo />
      </View>

      <View className="items-center gap-4 px-10">
        <ThemedText variant="primary" size="title" className="px-10 text-center">
          {t('onboarding.step2.title')}
        </ThemedText>
        <ThemedText size="subtitle" className="text-center">
          {t('onboarding.step2.subtitle')}
        </ThemedText>
      </View>
    </View>
  );
}
