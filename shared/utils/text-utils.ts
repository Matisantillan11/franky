export const transformValueToCurrency = (value: string, withDecimal?: boolean) => {
  if (!value) return '';

  const onlyNumbers = value.replace(/\D/g, '');
  if (!onlyNumbers) return '';

  if (!withDecimal) {
    return `$ ${onlyNumbers}`;
  }

  // Pad to minimum 3 digits so last 2 are always cents (ATM-style input)
  const padded = onlyNumbers.padStart(3, '0');
  const integerPart = padded.slice(0, -2).replace(/^0+(?!$)/, '') || '0';
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decimalPart = padded.slice(-2);
  return `$ ${formattedIntegerPart},${decimalPart}`;
};

export const transformCurrencyToString = (value?: string) => {
  if (!value) return '';
  return value.replace(/\D/g, '');
};
