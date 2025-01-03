import { render } from '@testing-library/react';
import { describe, expect, test, vitest } from 'vitest';
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

    vitest.spyOn(console, 'error').mockImplementation(() => vitest.fn());
    const { container } = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    );
    vitest.restoreAllMocks();
    expect(container).toHaveTextContent('test');
  });
});
