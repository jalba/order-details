const itemTemplate = {
  'product-id': (value) => value.length === 4,
  'quantity': (value) => parseInt(value) > 0,
  'unit-price': (value) => parseFloat(value) > 0,
  'total': (value) => parseFloat(value) > 0,
};

export function validateItems(items) {
  return items.every(item => Object.keys(item).every(field => itemTemplate[field](item[field])));
}