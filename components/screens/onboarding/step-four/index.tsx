import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import CurrencyCard from '~/components/currency-card';
import { FlashList, PrimitiveRadioGroup, ThemedText } from '~/components/ui';
import { CurrencyType } from '~/shared/types/settings.types';
import { cn } from '~/shared/utils/tailwind';
import { getCurrencyOptions } from './constants';

export default function StepFour({
  currency,
  updateCurrency,
}: {
  currency: CurrencyType;
  updateCurrency: (currency: CurrencyType) => void;
}) {
  const { t } = useTranslation();
  const currencyOptions = getCurrencyOptions(t);

  return (
    <View className="flex-1 gap-4">
      <View className="items-center gap-4 px-10">
        <ThemedText variant="primary" size="title" className="px-10 text-center">
          {t('onboarding.step4.title')}
        </ThemedText>
        <ThemedText size="subtitle" className="text-center">
          {t('onboarding.step4.subtitle')}
        </ThemedText>
      </View>

      <PrimitiveRadioGroup
        className="flex-1 px-10"
        value={currency}
        onValueChange={(value) => updateCurrency(value as CurrencyType)}
      >
        <FlashList
          data={currencyOptions}
          horizontal={false}
          renderItem={({ item }) => {
            const isSelected = currency === item.id;
            return (
              <CurrencyCard
                {...item}
                key={item.id}
                value={item.id}
                onPress={() => updateCurrency(item.id)}
                className={cn(
                  isSelected ? 'bg-brand-brand500/15 border-brand-brand500 border-2' : ''
                )}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </PrimitiveRadioGroup>
    </View>
  );
}
