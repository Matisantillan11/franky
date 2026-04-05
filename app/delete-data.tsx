import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { DeleteLoaderIcon, SuccessAnimatedIcon, ThemedText } from '~/components/ui';
import { useClearAllData } from '~/libs/fetcher';

export default function DeleteDataPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'deleting' | 'success'>('deleting');

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
              Clearing all your data...
            </ThemedText>
            <ThemedText variant="secondary" className="text-center opacity-70">
              This will only take a few moments
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
              All data cleared!
            </ThemedText>
            <ThemedText variant="secondary" className="text-center opacity-70">
              Redirecting you to onboarding
            </ThemedText>
          </View>
        </Animated.View>
      )}
    </View>
  );
}
