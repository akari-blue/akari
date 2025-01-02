import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary', () => {
  test('renders', () => {
    const { container } = render(
      <ErrorBoundary>
        <div>hi</div>
      </ErrorBoundary>,
    );
    expect(container).not.toBeEmptyDOMElement();
  });

  test('renders error', () => {
    const ErrorComponent = () => {
      throw new Error('test');
    };

    const { container } = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    );
    expect(container).toHaveTextContent('test');
  });
});
