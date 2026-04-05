import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { ScrollView, View } from 'react-native';

import Card from '~/components/card';
import {
  BackArrow,
  Button,
  Modal,
  Money,
  Shapes,
  ThemedText,
  Trash,
  Wallet,
  type BottomSheetModal,
} from '~/components/ui';
import { useSettings } from '~/libs/fetcher';
import { theme } from '~/shared/constants/theme';
import { CurrencyType } from '~/shared/types/settings.types';
import { getCurrencySymbol, getCurrencyWithoutSuffix } from '~/shared/utils/money-utils';
import { cn } from '~/shared/utils/tailwind';
import { transformValueToCurrency } from '~/shared/utils/text-utils';

export default function SettingsScreen() {
  const router = useRouter();
  const { data: settings } = useSettings();

  const monthlyBudget = transformValueToCurrency(settings?.monthlyIncome?.toString() ?? '0', true);

  const clearDataModalRef = useRef<BottomSheetModal>(null);

  const handleOpenClearDataModal = () => {
    clearDataModalRef.current?.present();
  };

  const handleConfirmClearData = () => {
    clearDataModalRef.current?.dismiss();
    router.push('/delete-data');
  };

  const navigateToUpdateCurrency = () => {
    router.navigate('/update-currency');
  };

  const navigateToUpdateMonthlyIncome = () => {
    router.navigate('/update-monthly-income');
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1">
      <View className="flex-row items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          leftIcon={<BackArrow color={theme.gray.gray400} size={20} />}
          onPress={() => router.back()}
        />
        <ThemedText variant="primary" className="text-2xl font-bold">
          Settings
        </ThemedText>
      </View>
      <View className="mt-10 h-full flex-col justify-between p-4">
        <View className="h-full flex-col gap-4">
          <View className="gap-4">
            <ThemedText variant="secondary">Account</ThemedText>
            <View>
              <Card
                disabled={false}
                variant="ghost"
                onPress={navigateToUpdateCurrency}
                icon={
                  <View className={cn('bg-brand-brand700 rounded-xl p-2')}>
                    <Money color={theme.brand.brand500} />
                  </View>
                }
                title="Currency"
                description="Primary display currency"
                rightIcon={
                  <ThemedText>
                    {getCurrencySymbol((settings?.currency as CurrencyType) ?? CurrencyType.DOLLAR)}
                  </ThemedText>
                }
              />
              <Card
                disabled={false}
                variant="ghost"
                icon={
                  <View className={cn('bg-brand-brand700 rounded-xl p-2')}>
                    <Wallet color={theme.brand.brand500} />
                  </View>
                }
                onPress={navigateToUpdateMonthlyIncome}
                title="Monthly Income"
                description="See your budget baseline"
                rightIcon={
                  <ThemedText>
                    {getCurrencyWithoutSuffix(settings?.currency as CurrencyType)} {monthlyBudget}
                  </ThemedText>
                }
              />
            </View>
          </View>

          <View className="gap-4">
            <ThemedText variant="secondary">Preferences</ThemedText>
            <View>
              <Card
                disabled={false}
                variant="ghost"
                icon={
                  <View className={cn('bg-brand-brand700 rounded-xl p-2')}>
                    <Shapes color={theme.brand.brand500} />
                  </View>
                }
                title="Categories"
                description="Manage expense and income categories"
                onPress={() => router.push('/all-categories')}
              />
              {/*  <Card
                disabled={false}
                variant="ghost"
                icon={
                  <View className={cn('bg-brand-brand700 rounded-xl p-2')}>
                    <Notifications color={theme.brand.brand500} />
                  </View>
                }
                title="Notifications"
                description="Manage notification preferences"
              /> */}
            </View>
          </View>
        </View>

        <Button
          leftIcon={<Trash size={20} color={theme.error.error500} />}
          className="bg-error-error500/30 active:bg-error-error500/20 mx-10 mt-16"
          onPress={handleOpenClearDataModal}
        >
          <ThemedText className="text-error-error500">Clear all my data</ThemedText>
        </Button>
      </View>

      <Modal ref={clearDataModalRef} snapPoints={['40%']}>
        <View className="items-center gap-6 px-4 pb-10">
          <View className="items-center gap-2">
            <ThemedText variant="primary" size="subtitle" className="text-xl">
              Permanent Reset
            </ThemedText>
            <ThemedText className="text-text-tertiary text-center">
              This will wipe your entire history, including custom categories. Only proceed if you
              want to start your workspace from scratch.
            </ThemedText>
          </View>
          <View className="mt-4 w-full flex-row gap-3">
            <Button
              variant="default"
              className="bg-error-error500 w-full"
              onPress={handleConfirmClearData}
            >
              Clear everything
            </Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
