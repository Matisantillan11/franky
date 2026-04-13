import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { BlurView } from '~/components/blur-circle';
import { Button, ThemedText } from '~/components/ui';
import { AnimatedSeedingIcon } from './animated-seeding-icon';

export default function EmptyState() {
  const router = useRouter();

  const handleAddTransaction = () => {
    router.push('/add-transaction');
  };

  return (
    <View className="h-full items-center justify-center gap-2 px-6 pt-10">
      <View className="items-center justify-center">
        <View className="items-center justify-center rounded-full">
          <BlurView top={-140} left={-160} size={450} intensity={25} />
          <AnimatedSeedingIcon />
        </View>
      </View>

      <View className="my-10 items-center gap-4">
        <ThemedText variant="primary" size="title" className="px-10 text-center">
          Ready to grow?
        </ThemedText>
        <ThemedText size="subtitle" className="text-center">
          our financial journey starts with a single entry. Add an expense to see your insights
          bloom.
        </ThemedText>
      </View>

      <View className="w-full p-5">
        <Button onPress={handleAddTransaction}>Plant your first entry</Button>
      </View>
    </View>
  );
}
