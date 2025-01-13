import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useSkyZoo } from './useSkyZoo';
import { TestRouterProvider } from '@/test/helpers/test-router-provider';

describe('useSkyZoo', () => {
  test('returns user position', async () => {
    const { result } = renderHook(() => useSkyZoo({ did: 'did:plc:k6acu4chiwkixvdedcmdgmal' }), {
      wrapper: ({ children }) => <TestRouterProvider>{children}</TestRouterProvider>,
    });

    expect(result.current.data).toBe(undefined);
    expect(result.current.error).toBe(null);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      did: 'did:plc:k6acu4chiwkixvdedcmdgmal',
      pos_atproto: 13658725,
      pos_bsky: 13591459,
      createdAt: '2024-10-21T12:09:43.477Z',
    });
  });
});
