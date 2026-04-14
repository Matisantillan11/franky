import { useRouter } from 'expo-router';
import { Globe } from 'lucide-react-native';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import Card from '~/components/card';
import {
  BackArrow,
  Button,
  Modal,
  Money,
  Receipt,
  Shapes,
  ThemedText,
  Trash,
  User,
  Wallet,
  type BottomSheetModal,
} from '~/components/ui';
import { useSettings } from '~/libs/fetcher';
import { SUPPORTED_LANGUAGES, useLanguage, type Language } from '~/libs/i18n/useLanguage';
import { theme } from '~/shared/constants/theme';
import { CurrencyType } from '~/shared/types/settings.types';
import { getCurrencySymbol, getCurrencyWithoutSuffix } from '~/shared/utils/money-utils';
import { cn } from '~/shared/utils/tailwind';
import { transformValueToCurrency } from '~/shared/utils/text-utils';

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: settings } = useSettings();
  const { currentLanguage, changeLanguage } = useLanguage();

  const monthlyBudget = transformValueToCurrency(settings?.monthlyIncome?.toString() ?? '0', true);

  const clearDataModalRef = useRef<BottomSheetModal>(null);
  const languageModalRef = useRef<BottomSheetModal>(null);

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
          {t('settings.title')}
        </ThemedText>
      </View>
      <View className="mt-5 h-full flex-col justify-between p-4">
        <View className="flex-col gap-4">
          <View className="gap-4">
            <ThemedText variant="secondary">{t('settings.account.title')}</ThemedText>
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
                title={t('settings.account.currency.title')}
                description={t('settings.account.currency.description')}
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
                title={t('settings.account.monthlyIncome.title')}
                description={t('settings.account.monthlyIncome.description')}
                rightIcon={
                  <ThemedText>
                    {getCurrencyWithoutSuffix(settings?.currency as CurrencyType)} {monthlyBudget}
                  </ThemedText>
                }
              />
            </View>
          </View>

          <View className="gap-4">
            <ThemedText variant="secondary">{t('settings.preferences.title')}</ThemedText>
            <View>
              <Card
                disabled={false}
                variant="ghost"
                icon={
                  <View className={cn('bg-brand-brand700 rounded-xl p-2')}>
                    <Shapes color={theme.brand.brand500} />
                  </View>
                }
                title={t('settings.preferences.categories.title')}
                description={t('settings.preferences.categories.description')}
                onPress={() => router.push('/all-categories')}
              />
              <Card
                disabled={false}
                variant="ghost"
                icon={
                  <View className={cn('bg-brand-brand700 rounded-xl p-2')}>
                    <Globe size={24} color={theme.brand.brand500} />
                  </View>
                }
                title={t('settings.preferences.language.title')}
                description={t('settings.preferences.language.description')}
                rightIcon={<ThemedText>{currentLanguage === 'es' ? '🇪🇸' : '🇺🇸'}</ThemedText>}
                onPress={() => languageModalRef.current?.present()}
              />
            </View>
          </View>

          <View className="gap-4">
            <ThemedText variant="secondary">{t('settings.legal.title')}</ThemedText>
            <View>
              <Card
                disabled={false}
                variant="ghost"
                icon={
                  <View className={cn('bg-brand-brand700 rounded-xl p-2')}>
                    <User color={theme.brand.brand500} />
                  </View>
                }
                title={t('settings.legal.privacy.title')}
                description={t('settings.legal.privacy.description')}
                onPress={() => router.push('/privacy-policy')}
              />
              <Card
                disabled={false}
                variant="ghost"
                icon={
                  <View className={cn('bg-brand-brand700 rounded-xl p-2')}>
                    <Receipt color={theme.brand.brand500} />
                  </View>
                }
                title={t('settings.legal.terms.title')}
                description={t('settings.legal.terms.description')}
                onPress={() => router.push('/terms-conditions')}
              />
            </View>
          </View>
        </View>

        <Button
          leftIcon={<Trash size={20} color={theme.error.error500} />}
          className="bg-error-error500/30 active:bg-error-error500/20 mx-10"
          onPress={handleOpenClearDataModal}
        >
          <ThemedText className="text-error-error500">{t('settings.clearData.button')}</ThemedText>
        </Button>
      </View>

      <Modal ref={clearDataModalRef} snapPoints={['40%']}>
        <View className="items-center gap-6 px-4 pb-10">
          <View className="items-center gap-2">
            <ThemedText variant="primary" size="subtitle" className="text-xl">
              {t('settings.clearData.modal.title')}
            </ThemedText>
            <ThemedText className="text-text-tertiary text-center">
              {t('settings.clearData.modal.description')}
            </ThemedText>
          </View>
          <View className="mt-4 w-full flex-row gap-3">
            <Button
              variant="default"
              className="bg-error-error500 w-full"
              onPress={handleConfirmClearData}
            >
              {t('settings.clearData.modal.confirm')}
            </Button>
          </View>
        </View>
      </Modal>

      <Modal ref={languageModalRef} snapPoints={['35%']}>
        <View className="gap-6 px-4 pb-10">
          <View className="items-center gap-1">
            <ThemedText variant="primary" size="subtitle" className="text-xl">
              {t('language.title')}
            </ThemedText>
            <ThemedText className="text-text-tertiary text-center text-sm">
              {t('language.subtitle')}
            </ThemedText>
          </View>
          <View className="gap-3">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = currentLanguage === lang.code;
              return (
                <Button
                  key={lang.code}
                  variant={isSelected ? 'default' : 'outline'}
                  className={cn(isSelected ? 'bg-brand-brand500' : '')}
                  onPress={() => {
                    changeLanguage(lang.code as Language);
                    languageModalRef.current?.dismiss();
                  }}
                >
                  {lang.nativeLabel}
                </Button>
              );
            })}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
