import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { FormattedNumber } from './formatted-number';

describe('FormattedNumber', () => {
  test('renders', () => {
    const { container } = render(<FormattedNumber value={1000} unit="followers" />);
    expect(container).toHaveTextContent('1K followers');
  });

  test('renders with a prefix', () => {
    const { container } = render(<FormattedNumber value={1000} unit="followers" prefix="+" />);
    expect(container).toHaveTextContent('+1K followers');
  });

  test('renders in compact notation', () => {
    const { container } = render(<FormattedNumber value={1000} unit="followers" prefix="+" notation="compact" />);
    expect(container).toHaveTextContent('+1K followers');
  });

  test('renders in standard notation', () => {
    const { container } = render(<FormattedNumber value={1000} unit="followers" prefix="+" notation="standard" />);
    expect(container).toHaveTextContent('+1,000 followers');
  });

  test('renders nothing when value is undefined', () => {
    const { container } = render(<FormattedNumber value={undefined} unit="followers" />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders in a different language', () => {
    Object.defineProperty(navigator, 'languages', {
      value: ['ar-SA'],
    });
    const { container } = render(<FormattedNumber value={1000} unit="followers" />);
    expect(container).toHaveTextContent('١ ألف followers');
  });
});
