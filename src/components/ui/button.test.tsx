import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  test('renders', () => {
    const { container } = render(<Button>Button</Button>);
    expect(container).not.toBeEmptyDOMElement();
  });
});
