import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ThemedText } from '~/components/ui';

export default function BudgetScreen() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center gap-3">
      <ThemedText variant="primary" className="text-2xl font-bold">
        {t('budget.title')}
      </ThemedText>
      <ThemedText>{t('budget.empty')}</ThemedText>
    </View>
  );
}
