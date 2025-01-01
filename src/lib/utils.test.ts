import { expect, test } from 'vitest';
import { cn } from './utils';

test('adds class names together', () => {
  const className = cn('text-red-500', 'bg-blue-500');
  expect(className).toBe('text-red-500 bg-blue-500');
});

test('merges similar classes', () => {
  const className = cn('bg-red-500', 'bg-blue-500');
  expect(className).toBe('bg-blue-500');
});
