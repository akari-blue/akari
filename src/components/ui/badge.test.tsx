import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Badge } from './badge';

describe('Badge', () => {
  test('renders', () => {
    const { container } = render(<Badge title="test title">Badge</Badge>);
    expect(container).not.toBeEmptyDOMElement();
  });
});
