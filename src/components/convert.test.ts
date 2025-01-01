import { describe, expect, test } from 'vitest';
import { convertJSONToPost } from './convert';

describe('convert', () => {
  test('convertJSONToPost', () => {
    const json = {};
    const post = convertJSONToPost(json);

    expect(post).toEqual({
      facets: [],
      position: 0,
      text: '',
    });
  });
});
