import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// eslint-disable-next-line import/no-unresolved
import { Button } from '~/components/ui';

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View className="h-screen flex-row flex-wrap items-center justify-center gap-6">
        <Button variant="ghost" onPress={() => router.push('/buttons')}>
          Buttons
        </Button>
        <Button variant="ghost" onPress={() => router.push('/inputs')}>
          Inputs
        </Button>
      </View>
    </SafeAreaView>
  );
}
