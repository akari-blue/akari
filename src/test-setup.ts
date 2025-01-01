import '@/i18n';
import '@/index.css';
import '@testing-library/react/dont-cleanup-after-each';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, expect } from 'vitest';
import { debug, setDomPreviewContext } from 'dom-preview';

beforeEach(() => {
  setDomPreviewContext(expect.getState().currentTestName ?? 'initial');
});

afterEach(() => {
  // Run dom-preview's debug if the test fails
  // if (context.task?.result?.state === 'fail') {
  debug();
  // }
  // Clean up react-testing-library. We need to manually do this because we
  // turn off the automatic teardown in the vite.config.
  // This needs to happen after dom-preview.
  cleanup();
});
