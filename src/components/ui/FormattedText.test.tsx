import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { FormattedText } from './FormattedText';
import { TestRouterProvider } from '@/test/helpers/test-router-provider';

describe('FormattedText', () => {
  test('renders text', () => {
    const { container } = render(<FormattedText text="abc123" />);
    expect(container).not.toBeEmptyDOMElement();
  });

  test('renders text with linkified URLs', () => {
    const { container } = render(
      <TestRouterProvider>
        <FormattedText text="abc123 https://google.com" linkify />
      </TestRouterProvider>,
    );
    expect(container).toHaveTextContent('abc123 google.com');
  });

  test('renders text with linkified mentions', () => {
    const { container } = render(
      <TestRouterProvider>
        <FormattedText text="abc123 @google.com" linkify />
      </TestRouterProvider>,
    );
    expect(container).toHaveTextContent('abc123 @google.com');
  });
});
