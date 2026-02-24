import { useState } from 'react';
import { View } from 'react-native';
import CurrencyCard from '~/components/currency-card';
import { FlashList, PrimitiveRadioGroup, ThemedText } from '~/components/ui';
import { cn } from '~/shared/utils/tailwind';
import { CURRENCY_OPTION, CURRENCY_OPTIONS } from './constants';

export default function StepFour() {
  const [selectedCurrency, setSelectedCurrency] = useState<CURRENCY_OPTION>(
    CURRENCY_OPTION.ARGENTINE_PESO
  );

  return (
    <View className="flex-1 gap-4">
      <View className="items-center gap-4 px-10">
        <ThemedText variant="primary" size="title" className="px-10 text-center">
          Choose your currency
        </ThemedText>
        <ThemedText size="subtitle" className="text-center">
          Select the main currency you use for your daily expenses.
        </ThemedText>
      </View>

      <PrimitiveRadioGroup
        className="flex-1 px-10"
        value={selectedCurrency}
        onValueChange={(value) => setSelectedCurrency(value as CURRENCY_OPTION)}
      >
        <FlashList
          data={CURRENCY_OPTIONS}
          horizontal={false}
          renderItem={({ item }) => {
            const isSelected = selectedCurrency === item.id;
            return (
              <CurrencyCard
                {...item}
                key={item.id}
                value={item.id}
                onPress={() => setSelectedCurrency(item.id)}
                className={cn(
                  isSelected ? 'bg-brand-brand500/15 border-brand-brand500 border-2' : ''
                )}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          className="shadow-inset-md"
        />
      </PrimitiveRadioGroup>
    </View>
  );
}
