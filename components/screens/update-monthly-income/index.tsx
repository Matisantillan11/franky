import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import ModalScreenNodge from '~/components/modal-screen-nodge';
import { Button, Input, ThemedText, useToast } from '~/components/ui';
import { useSettings, useUpdateSettings } from '~/libs/fetcher';
import { CurrencyType } from '~/shared/types/settings.types';
import { getCurrencyWithoutSuffix } from '~/shared/utils/money-utils';
import { cn } from '~/shared/utils/tailwind';
import { transformCurrencyToString, transformValueToCurrency } from '~/shared/utils/text-utils';

export default function UpdateMonthlyIncomeScreen() {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';
  const { data: settings, isLoading } = useSettings();
  const { mutateAsync: updateSettings, isPending } = useUpdateSettings();

  const currency = getCurrencyWithoutSuffix(settings?.currency as CurrencyType);
  const router = useRouter();

  const { addToast } = useToast();

  useEffect(
    function refreshMonthlyIncomeWithUserData() {
      if (isLoading) return;
      const currentUserMonthlyIncome = settings?.monthlyIncome as number;
      if (currentUserMonthlyIncome) setMonthlyIncome(currentUserMonthlyIncome.toString());
    },
    [settings, isLoading]
  );

  const updateMonthlyIncomeSelection = (value: string) => {
    setMonthlyIncome(value);
  };

  const updateMonthlyIncome = useCallback(() => {
    if (!settings?.id) return;

    const monthlyIncomeAsNumber = parseFloat(transformCurrencyToString(monthlyIncome));
    if (isNaN(monthlyIncomeAsNumber)) return;

    updateSettings(
      { id: settings.id, input: { monthlyIncome: monthlyIncomeAsNumber } },
      {
        onSuccess: () => {
          router.back();
        },
        onError: () => {
          addToast({
            message: t('income.update.error'),
            type: 'error',
          });
        },
      }
    );
  }, [monthlyIncome]);

  return (
    <View className="flex-1 gap-4">
      <ModalScreenNodge />
      <View className="items-center gap-4 px-10">
        <ThemedText
          variant="primary"
          size="title"
          className={cn('text-center', isSpanish ? '' : 'px-10')}
        >
          {t('income.update.title')}
        </ThemedText>
        <ThemedText size="subtitle" className="text-center">
          {t('income.update.subtitle')}
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
          value={`${currency} ${transformValueToCurrency(monthlyIncome, true)}`}
          onChangeText={updateMonthlyIncomeSelection}
        />
        <View className="mx-10">
          <ThemedText className="text-center">{t('income.update.subtitle')}</ThemedText>
        </View>
      </View>

      <View className="p-10">
        <Button onPress={updateMonthlyIncome} disabled={isPending}>
          {isPending ? t('income.update.saving') : t('income.update.save')}
        </Button>
      </View>
    </View>
  );
}
