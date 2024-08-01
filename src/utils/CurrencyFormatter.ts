const CONVERSION_RATE = 82.50; // Example conversion rate, 1 USD = 82.50 INR

export function convertUsdToCurrency(amount: number, currencySymbol: string = '₹'): string {
  // Convert the amount from USD to the target currency
  const convertedAmount = amount * CONVERSION_RATE;

  // Return the converted amount formatted as a currency string
  return `${currencySymbol} ${convertedAmount.toFixed(2)}`;
}