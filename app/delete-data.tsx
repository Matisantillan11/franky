import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { DeleteLoaderIcon, SuccessAnimatedIcon, ThemedText } from '~/components/ui';
import { useClearAllData } from '~/libs/fetcher';

export default function DeleteDataPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'deleting' | 'success'>('deleting');

  const { t } = useTranslation();
  const { mutate: clearAllData } = useClearAllData();

  useEffect(() => {
    const startTime = Date.now();
    clearAllData(undefined, {
      onSuccess: () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 5000 - elapsedTime);

        setTimeout(() => {
          setStatus('success');
          setTimeout(() => {
            router.replace('/onboarding');
          }, 3000); // Give time for the success animation
        }, remainingTime);
      },
    });
  }, []);

  return (
    <View className="bg-brand-brand900 flex-1 items-center justify-center p-6">
      {status === 'deleting' ? (
        <Animated.View
          key="loading"
          entering={FadeIn}
          exiting={FadeOut}
          className="items-center gap-8"
        >
          <DeleteLoaderIcon size={120} />
          <View className="items-center gap-2">
            <ThemedText
              variant="primary"
              size="subtitle"
              className="text-center text-2xl font-bold"
            >
              {t('settings.clearData.deleting.title')}
            </ThemedText>
            <ThemedText variant="secondary" className="text-center opacity-70">
              {t('settings.clearData.deleting.subtitle')}
            </ThemedText>
          </View>
        </Animated.View>
      ) : (
        <Animated.View key="success" entering={FadeIn} className="items-center gap-8">
          <SuccessAnimatedIcon size={120} />
          <View className="items-center gap-2">
            <ThemedText
              variant="primary"
              size="subtitle"
              className="text-center text-2xl font-bold"
            >
              {t('settings.clearData.deleted.title')}
            </ThemedText>
            <ThemedText variant="secondary" className="text-center opacity-70">
              {t('settings.clearData.deleted.subtitle')}
            </ThemedText>
          </View>
        </Animated.View>
      )}
    </View>
  );
}
