import { CurrencyType } from '../types/settings.types';

export function getCurrencySymbol(currency: CurrencyType) {
  switch (currency) {
    case CurrencyType.DOLLAR:
      return '$ USD';
    case CurrencyType.EURO:
      return '€ EUR';
    case CurrencyType.ARGENTINE_PESO:
      return '$ ARS';
    case CurrencyType.POUND:
      return '£ GBP';
    case CurrencyType.YEN:
      return '¥ JPY';
    case CurrencyType.RUPEE:
      return '₹ INR';
    default:
      return '$ USD';
  }
}

export function getCurrencyWithoutSuffix(currency: CurrencyType) {
  switch (currency) {
    case CurrencyType.DOLLAR:
      return '$';
    case CurrencyType.EURO:
      return '€';
    case CurrencyType.ARGENTINE_PESO:
      return '$';
    case CurrencyType.POUND:
      return '£';
    case CurrencyType.YEN:
      return '¥';
    case CurrencyType.RUPEE:
      return '₹';
    default:
      return '$';
  }
}
