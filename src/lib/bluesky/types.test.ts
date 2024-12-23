import { describe, it, expect } from 'vitest';
import { BSkyPostLabel } from './types/BSkyPostLabel';
import { TypeCompiler } from '@sinclair/typebox/compiler';

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

    const C = TypeCompiler.Compile(BSkyPostLabel);

    // Loop over each item in the production data and validate
    prodData.forEach((dataItem) => {
      // Validate each item against the BSkyPostLabel schema
      const result = C.Check(dataItem);

      // Test if the result is valid
      expect(result).toBe(true);

      // Optionally, log or inspect errors if validation fails
      if (!result) {
        const errors = [...C.Errors(dataItem)];
        console.error('Validation errors:', errors);
      }
    });
  });

  it('should throw validation error if data structure is wrong', () => {
    const invalidData = {
      src: 'source_example',
      uri: 'http://example.com',
      // Missing cid, val, and cts fields
    };

    const C = TypeCompiler.Compile(BSkyPostLabel);

    const result = C.Check(invalidData);
    const errors = [...C.Errors(invalidData)];

    // Log only the validation error messages
    if (!result) {
      const errorMessages = errors.map((err) => `${err.path.slice(1)} ${err.message}`);
      expect(errorMessages).toEqual([
        'cid Expected required property',
        'val Expected required property',
        'cts Expected required property',
        'cid Expected string',
        'val Expected string',
        'cts Expected string',
      ]);
    }

    // Expect the validation to fail
    expect(result).toBe(false);
  });
});
