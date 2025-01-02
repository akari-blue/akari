import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Loading } from './loading';

describe('Loading', () => {
  test('renders', () => {
    const { container } = render(<Loading />);
    expect(container).not.toBeEmptyDOMElement();
  });
});
