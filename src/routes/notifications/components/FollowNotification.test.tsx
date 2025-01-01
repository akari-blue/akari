import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { FollowNotification } from './FollowNotification';
import { followNotification } from '@/lib/bluesky/types.data';

describe('FollowNotification', () => {
  test('renders', () => {
    const notification = followNotification;
    const { container } = render(<FollowNotification notification={notification} />);
    expect(container).not.toBeEmptyDOMElement();
  });
});
