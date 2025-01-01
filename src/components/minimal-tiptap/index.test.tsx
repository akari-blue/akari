import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MinimalTiptapEditor } from '.';
import { TooltipProvider } from '../ui/tooltip';

describe('MinimalTiptapEditor', () => {
  test('renders', () => {
    const { container } = render(
      <TooltipProvider>
        <MinimalTiptapEditor />
      </TooltipProvider>,
    );
    expect(container).not.toBeEmptyDOMElement();
  });
});
