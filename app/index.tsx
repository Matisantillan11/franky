import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/ui';
import { logError, logEvent } from '~/libs';

export default function Index() {
  const router = useRouter();

  const handleTestError = () => {
    logError({
      error: {
        module: 'index',
        component: 'index',
        func: 'handleTestError',
        message: 'This is a test error triggered manually',
      },
      errorName: 'ONBOARDING_ERROR',
      tagName: 'ONBOARDING_ERROR',
    });
  };

  const handleTestEvent = () => {
    logEvent({
      eventName: 'ONBOARDING',
      properties: {
        module: 'index',
        component: 'index',
        func: 'handleTestEvent',
        message: 'This is a test event triggered manually',
      },
    });
  };

  return (
    <SafeAreaView>
      <View className="h-screen items-center justify-center gap-6">
        <Button variant="ghost" onPress={() => router.push('/buttons')}>
          Buttons
        </Button>
        <Button variant="ghost" onPress={() => router.push('/inputs')}>
          Inputs
        </Button>
        <Button variant="ghost" onPress={() => router.push('/modal')}>
          Modal
        </Button>
        <Button variant="ghost" onPress={() => router.push('/radio')}>
          Radio
        </Button>
        <Button variant="ghost" onPress={() => router.push('/toast')}>
          Toast
        </Button>

        <Button variant="ghost" onPress={handleTestError}>
          Trigger error
        </Button>

        <Button variant="ghost" onPress={handleTestEvent}>
          Capture event
        </Button>
      </View>
    </SafeAreaView>
  );
}
