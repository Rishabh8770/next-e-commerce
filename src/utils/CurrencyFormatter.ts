const CONVERSION_RATE = 82.50;

export function convertUsdToCurrency(amount: number, currencySymbol: string = '₹'): string {
  const convertedAmount = amount * CONVERSION_RATE;

  return `${currencySymbol} ${convertedAmount.toFixed(2)}`;
}