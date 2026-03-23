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
