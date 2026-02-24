export enum CURRENCY_OPTION {
  EURO = 'euro',
  DOLLAR = 'dollar',
  POUND = 'pound',
  YEN = 'yen',
  RUPEE = 'rupee',
  ARGENTINE_PESO = 'argentine_peso',
}

export const CURRENCY_OPTIONS = [
  {
    id: CURRENCY_OPTION.ARGENTINE_PESO,
    title: 'Argentine Peso',
    description: 'ARS',
    icon: '$',
    disabled: false,
  },
  {
    id: CURRENCY_OPTION.EURO,
    title: 'Euro',
    description: 'EUR',
    icon: '€',
    disabled: false,
  },
  {
    id: CURRENCY_OPTION.DOLLAR,
    title: 'United States Dollar',
    description: 'USD',
    icon: '﹩',
    disabled: false,
  },
  {
    id: CURRENCY_OPTION.POUND,
    title: 'Pound',
    description: 'GBP',
    icon: '£',
    disabled: false,
  },
  {
    id: CURRENCY_OPTION.YEN,
    title: 'Yen',
    description: 'JPY',
    icon: '¥',
    disabled: false,
  },
  {
    id: CURRENCY_OPTION.RUPEE,
    title: 'Rupee',
    description: 'INR',
    icon: '₹',
    disabled: false,
  },
];
