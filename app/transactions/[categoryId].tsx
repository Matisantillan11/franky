import { useLocalSearchParams } from 'expo-router';
import CategoryTransactionsScreen from '~/components/screens/category-transactions';

export default function CategoryTransactionsRoute() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  return <CategoryTransactionsScreen categoryId={categoryId} />;
}
