import { expect, test } from 'vitest';
import { useAuth } from './useAuth';
import { renderHook } from '@testing-library/react';
import { TestRouterProvider } from '@/test/helpers/test-router-provider';

test('renders', () => {
  const { result } = renderHook(() => useAuth(), {
    wrapper: ({ children }) => <TestRouterProvider>{children}</TestRouterProvider>,
  });

  expect(result.current.isAuthenticated).toBe(false);
  expect(result.current.isLoading).toBe(false);
  expect(result.current.error).toBe(null);
  expect(result.current.login).toBeDefined();
  expect(result.current.logout).toBeDefined();
});
