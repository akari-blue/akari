import { render } from '@testing-library/react';
import { FacetedText } from './FacetedText';
import { expect, test } from 'vitest';

test('renders text', () => {
  const { container } = render(<FacetedText facets={[]} text="abc123" />);
  expect(container).not.toBeEmptyDOMElement();
});
