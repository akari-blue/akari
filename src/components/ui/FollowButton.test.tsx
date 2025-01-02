import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { FollowButton } from './FollowButton';

describe('FollowButton', () => {
  test('renders follow', () => {
    const { container } = render(<FollowButton following={false} handle="test" />);
    expect(container).not.toBeEmptyDOMElement();
    expect(container).toHaveTextContent('follow');
  });

  test('renders unfollow', () => {
    const { container } = render(<FollowButton following={true} handle="test" />);
    expect(container).not.toBeEmptyDOMElement();
    expect(container).toHaveTextContent('unfollow');
  });
});
