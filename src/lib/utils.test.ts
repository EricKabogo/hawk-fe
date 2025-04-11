// src/lib/utils.test.ts
import { formatPrice } from './utils';

describe('formatPrice', () => {
  test('formats price with KES currency by default', () => {
    expect(formatPrice(1000)).toBe('KSh 1,000.00');
    expect(formatPrice(1500.75)).toBe('KSh 1,500.75');
    expect(formatPrice(0)).toBe('KSh 0.00');
  });

  test('formats price with specified currency', () => {
    expect(formatPrice(1000, 'USD')).toBe('$1,000.00');
    expect(formatPrice(1500.75, 'EUR')).toBe('€1,500.75');
  });
});