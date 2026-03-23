import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import CurrencyCard from '~/components/currency-card';
import ModalScreenNodge from '~/components/modal-screen-nodge';
import { Button, FlashList, PrimitiveRadioGroup, ThemedText, useToast } from '~/components/ui';
import { useSettings, useUpdateSettings } from '~/libs/fetcher';
import { CurrencyType } from '~/shared/types/settings.types';
import { cn } from '~/shared/utils/tailwind';
import { CURRENCY_OPTIONS } from '../onboarding/step-four/constants';

export default function UpdateCurrencyScreen() {
  const [currency, setCurrency] = useState<CurrencyType>(CurrencyType.DOLLAR);

  const { data: settings, isLoading } = useSettings();
  const { mutateAsync: updateSettings, isPending } = useUpdateSettings();

  const { addToast } = useToast();
  const router = useRouter();

  useEffect(
    function refreshCurrencyWithUserData() {
      if (isLoading) return;
      const currentUserCurrency = settings?.currency as CurrencyType;
      if (currentUserCurrency) setCurrency(currentUserCurrency);
    },
    [settings, isLoading]
  );

  const updateCurrencySelection = (value: CurrencyType) => {
    setCurrency(value);
  };

  const updateCurrency = useCallback(() => {
    if (!settings?.id) return;
    updateSettings(
      { id: settings.id, input: { currency } },
      {
        onSuccess: () => {
          router.navigate('/(home)/settings');
        },
        onError: () => {
          addToast({
            message: 'Error uploading your currency, please try again later',
            type: 'error',
          });
        },
      }
    );
  }, [currency]);

  return (
    <View className="flex-1 gap-4">
      <ModalScreenNodge />
      <View className="items-center gap-4 px-5">
        <ThemedText variant="primary" size="title" className="px-10 text-center">
          Update your preferred currency
        </ThemedText>
        <ThemedText size="subtitle" className="text-center">
          Select the main currency you use for your daily expenses.
        </ThemedText>
      </View>

      <PrimitiveRadioGroup
        className="flex-1 px-10"
        value={currency}
        onValueChange={(value) => updateCurrencySelection(value as CurrencyType)}
      >
        <FlashList
          data={CURRENCY_OPTIONS}
          horizontal={false}
          renderItem={({ item }) => {
            const isSelected = currency === item.id;
            return (
              <CurrencyCard
                {...item}
                key={item.id}
                value={item.id}
                onPress={() => updateCurrencySelection(item.id)}
                className={cn(
                  isSelected ? 'bg-brand-brand500/15 border-brand-brand500 border-2' : ''
                )}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </PrimitiveRadioGroup>

      <View className="p-10">
        <Button onPress={updateCurrency} disabled={isPending}>
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </View>
    </View>
  );
}
