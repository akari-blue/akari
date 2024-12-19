import { expect, test } from 'vitest';
import { languages } from './index';

test('all languages have same structure as English', () => {
  const enShape = JSON.parse(
    JSON.stringify(languages.en, (_, value) => (typeof value === 'object' ? value : null)),
  ) as Partial<typeof languages.en>;

  // Get all non-English languages
  const otherLanguages = Object.entries(languages).filter(([lang]) => lang !== 'en');

  // Check each language
  for (const [langName, langObj] of otherLanguages) {
    const langShape = JSON.parse(
      JSON.stringify(langObj, (_, value) => (typeof value === 'object' ? value : null)),
    ) as Partial<typeof languages.en>;
    expect(langShape, `${langName} has missing keys`).toMatchObject(enShape);
  }
});
