import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { FormattedNumber } from './FormattedNumber';

describe('FormattedNumber', () => {
  test('renders', () => {
    const { container } = render(<FormattedNumber value={1000} unit="followers" />);
    expect(container).not.toBeEmptyDOMElement();
  });
});
