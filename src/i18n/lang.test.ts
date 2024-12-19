import { test } from 'vitest';
import { languages } from './index';

test('all languages have same structure as English', () => {
  const enShape = JSON.parse(
    JSON.stringify(languages.en, (_, value) => (typeof value === 'object' ? value : null)),
  ) as Partial<typeof languages.en>;

  // Get all non-English languages
  const otherLanguages = Object.entries(languages).filter(([lang]) => lang !== 'en');

  // Store all errors
  const errors: string[] = [];

  // Check each language
  for (const [langName, langObj] of otherLanguages) {
    try {
      const langShape = JSON.parse(
        JSON.stringify(langObj, (_, value) => (typeof value === 'object' ? value : null)),
      ) as Partial<typeof languages.en>;

      // Find missing keys
      const missingKeys = findMissingKeys(enShape, langShape, []);
      if (missingKeys.length > 0) {
        errors.push(`${langName} is missing keys: ${missingKeys.join(', ')}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) errors.push(`Error processing ${langName}: ${error.message}`);
    }
  }

  // If there are any errors, fail the test with all error messages
  if (errors.length > 0) {
    throw new Error('\n' + errors.join('\n'));
  }
});

// Helper function to recursively find missing keys
function findMissingKeys(reference: Record<string, any>, target: Record<string, any>, path: string[] = []): string[] {
  const missingKeys: string[] = [];

  for (const [key, value] of Object.entries(reference)) {
    const currentPath = [...path, key];

    if (!(key in target)) {
      missingKeys.push(currentPath.join('.'));
    } else if (typeof value === 'object' && value !== null) {
      missingKeys.push(...findMissingKeys(value, target[key], currentPath));
    }
  }

  return missingKeys;
}
