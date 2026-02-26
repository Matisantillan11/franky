export const transformValueToCurrency = (value: string, withDecimal?: boolean) => {
  if (!value) return '';

  const onlyNumbers = value.replace(/\D/g, '');
  if (!onlyNumbers) return '';

  if (onlyNumbers.length <= 3) {
    return `$ ${onlyNumbers}`;
  }

  const integerPart = onlyNumbers.slice(0, -2).replace(/^0+(?!$)/, '');

  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  if (!withDecimal) {
    return `$ ${formattedIntegerPart}`;
  }

  const decimalPart = onlyNumbers.slice(-2);
  return `$ ${formattedIntegerPart},${decimalPart}`;
};

export const clearValue = (value?: string) => {
  if (!value) return '';
  return value.replace(/\D/g, '');
};
