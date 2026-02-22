import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/ui';

export default function Index() {
  const router = useRouter();

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
      </View>
    </SafeAreaView>
  );
}
