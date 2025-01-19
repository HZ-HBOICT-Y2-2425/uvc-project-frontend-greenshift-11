import { describe, test, expect } from '@jest/globals';

describe('Additional Tests', () => {
    test('Should verify if a number is even', () => {
      const isEven = (num) => num % 2 === 0;
      expect(isEven(4)).toBe(true);
      expect(isEven(5)).toBe(false);
    });
  
    test('Should concatenate strings correctly', () => {
      const concatStrings = (a, b) => `${a} ${b}`;
      expect(concatStrings("Hello", "World")).toBe("Hello World");
    });
  });
  