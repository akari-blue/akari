import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { Debug } from './Debug';
import { useSettings } from '@/hooks/useSetting';

describe('Debug', () => {
  test('renders nothing unless devMode is enabled', () => {
    useSettings.setState((state) => ({ ...state, experiments: { ...state.experiments, devMode: false } }));
    const { container } = render(<Debug value={{ test: 'test' }} isOpen={true} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders when open', () => {
    useSettings.setState((state) => ({ ...state, experiments: { ...state.experiments, devMode: true } }));
    const { container } = render(<Debug value={{ test: 'test' }} isOpen={true} />);
    expect(container).not.toBeEmptyDOMElement();
  });

  test('renders nothing when closed', () => {
    useSettings.setState((state) => ({ ...state, experiments: { ...state.experiments, devMode: true } }));
    const { container } = render(<Debug value={{ test: 'test' }} isOpen={false} />);
    expect(container).not.toBeEmptyDOMElement();
  });

  test('opens and closes when button is clicked', async () => {
    useSettings.setState((state) => ({ ...state, experiments: { ...state.experiments, devMode: true } }));
    const { container, getByRole } = render(<Debug value={{ test: 'test' }} isOpen={false} />);
    expect(container).not.toHaveTextContent('test');
    await userEvent.click(getByRole('button'));
    expect(container.parentElement).toHaveTextContent('test');
    await userEvent.click(getByRole('button'));
    expect(container).not.toHaveTextContent('test');
  });
});
