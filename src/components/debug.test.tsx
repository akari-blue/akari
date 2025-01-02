import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

const App = () => <div className="bg-red-500">dddd</div>;

describe('App', () => {
  it('should work as expected', () => {
    render(<App />);
  });
});
