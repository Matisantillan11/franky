import { CurrencyType } from '~/shared/types/settings.types';

export const CURRENCY_OPTIONS = [
  {
    id: CurrencyType.ARGENTINE_PESO,
    title: 'Argentine Peso',
    description: 'ARS',
    icon: '$',
    disabled: false,
  },
  {
    id: CurrencyType.EURO,
    title: 'Euro',
    description: 'EUR',
    icon: '€',
    disabled: false,
  },
  {
    id: CurrencyType.DOLLAR,
    title: 'United States Dollar',
    description: 'USD',
    icon: '﹩',
    disabled: false,
  },
  {
    id: CurrencyType.POUND,
    title: 'Pound',
    description: 'GBP',
    icon: '£',
    disabled: false,
  },
  {
    id: CurrencyType.YEN,
    title: 'Yen',
    description: 'JPY',
    icon: '¥',
    disabled: false,
  },
  {
    id: CurrencyType.RUPEE,
    title: 'Rupee',
    description: 'INR',
    icon: '₹',
    disabled: false,
  },
];
