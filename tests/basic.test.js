import { describe, test, expect } from '@jest/globals';

describe('Basic Test', () => {
    test('Should return true for basic assertion', () => {
      expect(true).toBe(true);
    });
  
    test('Should check if a name variable equals a value', () => {
      const name = "GitHub Actions";
      expect(name).toBe("GitHub Actions");
    });
  });
  