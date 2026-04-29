export const users = {
  valid: { email: 'qa.user@example.com', password: 'Password123!', displayName: 'QA User' },
  invalid: { email: 'qa.user@example.com', password: 'wrong-password' }
} as const;

export const products = {
  backpack: { name: 'Trail Backpack', price: 79 },
  bottle: { name: 'Steel Bottle', price: 24 }
} as const;

export const checkout = {
  shippingName: 'Patrycja Rutkowska',
  address: 'Automation Street 1',
  cardNumber: '4111111111111111'
} as const;

export const search = {
  query: 'bag',
  filter: 'Under $100'
} as const;
