import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { TestRouterProvider } from '@/test/helpers/test-router-provider';
import { PostEmbed } from './post-embed';

describe('PostEmbed', () => {
  test('renders nothing without an embed', () => {
    const embed = null;
    const { container } = render(
      <TestRouterProvider>
        <PostEmbed embed={embed} />
      </TestRouterProvider>,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
