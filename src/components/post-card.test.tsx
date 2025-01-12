import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { PostCard } from './post-card';
import { TestRouterProvider } from '@/test/helpers/test-router-provider';
import { imagePost, textPost } from '@/lib/bluesky/types.data';

describe('PostCard', () => {
  test('renders nothing without a post', () => {
    const post = null;
    const { container } = render(
      <TestRouterProvider>
        <PostCard post={post} />
      </TestRouterProvider>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  // times out because children are still fetching data
  test('renders a text post', () => {
    const { container } = render(
      <TestRouterProvider>
        <PostCard post={textPost} />
      </TestRouterProvider>,
    );
    expect(container).not.toBeEmptyDOMElement();
  });

  test('renders an image post', () => {
    const { container } = render(
      <TestRouterProvider>
        <PostCard post={imagePost} />
      </TestRouterProvider>,
    );
    expect(container).not.toBeEmptyDOMElement();
  });
});
