import { useLocalSearchParams } from 'expo-router';
import { AddTransactionScreen } from '~/components/screens';

export default function AddTransactionModal() {
  const { amount, categoryName } = useLocalSearchParams<{
    amount?: string;
    categoryName?: string;
  }>();

  return <AddTransactionScreen initialAmount={amount} initialCategoryName={categoryName} />;
}
