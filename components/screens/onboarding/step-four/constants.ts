import { TFunction } from 'i18next';
import { CurrencyType } from '~/shared/types/settings.types';

export function getCurrencyOptions(t: TFunction) {
  return [
    {
      id: CurrencyType.ARGENTINE_PESO,
      title: t('currency.names.argentinePeso'),
      description: 'ARS',
      icon: '$',
      disabled: false,
    },
    {
      id: CurrencyType.EURO,
      title: t('currency.names.euro'),
      description: 'EUR',
      icon: '€',
      disabled: false,
    },
    {
      id: CurrencyType.DOLLAR,
      title: t('currency.names.dollar'),
      description: 'USD',
      icon: '﹩',
      disabled: false,
    },
    {
      id: CurrencyType.POUND,
      title: t('currency.names.pound'),
      description: 'GBP',
      icon: '£',
      disabled: false,
    },
    {
      id: CurrencyType.YEN,
      title: t('currency.names.yen'),
      description: 'JPY',
      icon: '¥',
      disabled: false,
    },
    {
      id: CurrencyType.RUPEE,
      title: t('currency.names.rupee'),
      description: 'INR',
      icon: '₹',
      disabled: false,
    },
  ];
}
