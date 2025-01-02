import { render } from '@testing-library/react';
import { FacetedText } from './FacetedText';
import { describe, expect, test } from 'vitest';
import { textPostWithFacets } from '@/lib/bluesky/types.data';
import { TestRouterProvider } from '@/test/helpers/test-router-provider';

describe('FacetedText', () => {
  test('renders text with no facets', () => {
    const { container } = render(<FacetedText facets={[]} text="abc123" />);
    expect(container).not.toBeEmptyDOMElement();
  });

  test('renders text with facets', () => {
    const { container } = render(
      <TestRouterProvider>
        <FacetedText facets={textPostWithFacets.record.facets} text={textPostWithFacets.record.text} />
      </TestRouterProvider>,
    );
    expect(container).not.toBeEmptyDOMElement();
  });
});
