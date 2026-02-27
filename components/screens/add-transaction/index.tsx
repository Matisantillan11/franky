import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Button, ThemedText } from '~/components/ui';

export default function AddTransactionScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center gap-3">
      <ThemedText variant="primary" className="text-2xl font-bold">
        Add Transaction
      </ThemedText>
      <ThemedText>Track your income and expenses here.</ThemedText>

      <Button onPress={() => router.push('/add-category')}>Add category</Button>
    </View>
  );
}
