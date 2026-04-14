import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Input, ThemedText } from '~/components/ui';
import { cn } from '~/shared/utils/tailwind';
import { transformValueToCurrency } from '~/shared/utils/text-utils';

export default function StepFive({
  monthlyIncome,
  updateMonthlyIncome,
}: {
  monthlyIncome: string;
  updateMonthlyIncome: (income: string) => void;
}) {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  return (
    <View className="gap-4">
      <View className="items-center gap-4 px-10">
        <ThemedText
          variant="primary"
          size="title"
          className={cn('text-center', isSpanish ? 'mx-0' : 'mx-10')}
        >
          {t('onboarding.step5.title')}
        </ThemedText>
        <ThemedText size="subtitle" className="text-center">
          {t('onboarding.step5.subtitle')}
        </ThemedText>
      </View>

      <View className="mx-10 my-4 gap-4">
        <Input
          inputMode="decimal"
          keyboardType="number-pad"
          textContentType="none"
          size="lg"
          className="w-full"
          placeholder="$ 0,00"
          value={transformValueToCurrency(monthlyIncome, true)}
          onChangeText={updateMonthlyIncome}
        />
        <View className={cn(isSpanish ? 'mx-5' : 'mx-10')}>
          <ThemedText className="text-center">{t('onboarding.step5.subtitle')}</ThemedText>
        </View>
      </View>
    </View>
  );
}
