import { describe, it, expect } from 'vitest';
import { BSkyPostLabel } from './types/BSkyPostLabel';

describe('BSkyPostLabel schema validation', () => {
  it('should validate the post data correctly', () => {
    // Example production data (replace with actual data)
    const prodData = [
      {
        src: 'source_example',
        uri: 'http://example.com',
        cid: 'example_cid',
        val: 'example_value',
        cts: '2024-12-22T00:00:00Z',
      },
      {
        src: 'another_source',
        uri: 'http://anotherexample.com',
        cid: 'another_cid',
        val: 'another_value',
        cts: '2024-12-22T01:00:00Z',
      },
    ];

    // Loop over each item in the production data and validate
    prodData.forEach((dataItem) => {
      // Validate each item against the BSkyPostLabel schema
      const result = BSkyPostLabel.safeParse(dataItem);

      // Test if the result is valid
      expect(result.success).toBe(true);

      // Optionally, log or inspect errors if validation fails
      if (!result.success) {
        console.error('Validation errors:', result.error.errors);
      }
    });
  });

  it('should throw validation error if data structure is wrong', () => {
    const invalidData = {
      src: 'source_example',
      uri: 'http://example.com',
      // Missing cid, val, and cts fields
    };

    const result = BSkyPostLabel.safeParse(invalidData);

    // Log only the validation error messages
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => `${err.path[0]} is missing or invalid`);
      expect(errorMessages).toEqual(['cid is missing or invalid', 'val is missing or invalid', 'cts is missing or invalid']);
    }

    // Expect the validation to fail
    expect(result.success).toBe(false);
  });
});
