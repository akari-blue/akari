import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { LikeNotification } from './LikeNotification';
import { likeNotification } from '@/lib/bluesky/types.data';
import { useBlueskyStore } from '@/lib/bluesky/store';
import { TestRouterProvider } from '@/test/helpers/test-router-provider';

describe('LikeNotification', () => {
  test('renders', () => {
    useBlueskyStore.setState({ session: { did: 'did:web:testabc123' } as any });

    const notification = likeNotification;
    const { container } = render(
      <TestRouterProvider>
        <LikeNotification notifications={[notification]} />
      </TestRouterProvider>,
    );
    expect(container).not.toBeEmptyDOMElement();
  });
});
