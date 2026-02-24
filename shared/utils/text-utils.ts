export const transformValueToMoney = (value: string) => {
  if (!value) return '';

  const onlyNumbers = value.replace(/\D/g, '');
  if (!onlyNumbers) return '';

  if (onlyNumbers.length <= 3) {
    return `$ ${onlyNumbers}`;
  }

  const integerPart = onlyNumbers.slice(0, -2).replace(/^0+(?!$)/, '');
  const decimalPart = onlyNumbers.slice(-2);

  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `$ ${formattedIntegerPart},${decimalPart}`;
};
