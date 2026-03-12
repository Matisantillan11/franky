export const transformValueToCurrency = (value: string, withDecimal?: boolean) => {
  if (!value) return '';

  const onlyNumbers = value.replace(/\D/g, '');
  if (!onlyNumbers) return '';

  if (onlyNumbers.length <= 3) {
    return `$ ${onlyNumbers}`;
  }

  if (!withDecimal) {
    return `$ ${onlyNumbers}`;
  }

  const integerPart = onlyNumbers.slice(0, -2).replace(/^0+(?!$)/, '');
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decimalPart = onlyNumbers.slice(-2);
  return `$ ${formattedIntegerPart},${decimalPart}`;
};

export const transformCurrencyToString = (value?: string) => {
  if (!value) return '';
  return value.replace(/\D/g, '');
};

export const transformValueToInteger = (value?: number) => {
  if (!value || typeof value !== 'number') return value;
  const stringValue = value.toString();
  const valueWithoutDecimals = Number(stringValue.slice(0, -2));

  if (isNaN(valueWithoutDecimals)) return value;

  return valueWithoutDecimals;
};
