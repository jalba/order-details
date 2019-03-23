import big from 'big.js';

export function calculateTotal(items) {
  return items.reduce((sum, item) => (big(item.total).plus(sum).toFixed(2)), 0);
}
