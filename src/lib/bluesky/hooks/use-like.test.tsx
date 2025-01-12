import { expect, test } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { TestRouterProvider } from '@/test/helpers/test-router-provider';
import { useLike } from './use-like';
import { http, HttpResponse } from 'msw';
import { createHttpServer } from '@/test/helpers/create-http-server';

createHttpServer(
  http.post('/xrpc/com.atproto.repo.deleteRecord', () => {
    return HttpResponse.json({
      commit: { cid: 'bafyreib2de3vdnwvnps6nfd42emyszkgkkcd57gv45sx7grfxg7m7kduem', rev: '3lee7w4jni22w' },
    });
  }),
);

test.fails('likes post', async () => {
  const { result } = renderHook(() => useLike(), {
    wrapper: ({ children }) => <TestRouterProvider>{children}</TestRouterProvider>,
  });

  expect(result.current.data).toBe(undefined);
  expect(result.current.error).toBe(null);

  await result.current.mutateAsync({
    uri: 'at://imlunahey.com/app.bsky.feed.post/3lee7w4jni22w',
    cid: 'bafyreib2de3vdnwvnps6nfd42emyszkgkkcd57gv45sx7grfxg7m7kduem',
    like: true,
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});

test.fails('unlikes post', async () => {
  const { result } = renderHook(() => useLike(), {
    wrapper: ({ children }) => <TestRouterProvider>{children}</TestRouterProvider>,
  });

  expect(result.current.data).toBe(undefined);
  expect(result.current.error).toBe(null);

  await result.current.mutateAsync({
    uri: 'at://imlunahey.com/app.bsky.feed.post/3lee7w4jni22w',
    cid: 'bafyreib2de3vdnwvnps6nfd42emyszkgkkcd57gv45sx7grfxg7m7kduem',
    like: false,
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
});
