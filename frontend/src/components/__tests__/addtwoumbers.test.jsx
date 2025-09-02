/**
 * Unit tests for addNumbers.
 *
 * Test framework: Jest/Vitest style (describe/it/expect).
 * - This suite is written to be compatible with Jest and Vitest without additional deps.
 * - No DOM or React rendering is required since addNumbers is a pure function.
 *
 * Scope: Focuses on the behavior introduced in the PR diff (simple addition).
 * Coverage: happy paths, edge cases (negatives, floats, extremes), and unexpected inputs.
 */

import { describe, it, expect } from 'vitest'; // Vitest provides ESM-friendly globals.
import addNumbers, { addNumbers as namedAddNumbers } from '../addNumbers';

describe('addNumbers', () => {
  it('exports both default and named variants that behave identically', () => {
    expect(typeof addNumbers).toBe('function');
    expect(typeof namedAddNumbers).toBe('function');
    expect(addNumbers(2, 3)).toBe(5);
    expect(namedAddNumbers(2, 3)).toBe(5);
  });

  describe('happy paths (numbers)', () => {
    it('adds two positive integers', () => {
      expect(addNumbers(5, 10)).toBe(15);
      expect(addNumbers(0, 0)).toBe(0);
    });

    it('adds a positive and a negative integer', () => {
      expect(addNumbers(7, -2)).toBe(5);
      expect(addNumbers(-7, 2)).toBe(-5);
    });

    it('adds two negative integers', () => {
      expect(addNumbers(-5, -8)).toBe(-13);
    });

    it('adds floating-point numbers', () => {
      expect(addNumbers(0.1, 0.2)).toBeCloseTo(0.3, 10);
      expect(addNumbers(-0.1, 0.2)).toBeCloseTo(0.1, 10);
    });

    it('handles large safe integers', () => {
      expect(addNumbers(Number.MAX_SAFE_INTEGER, 0)).toBe(Number.MAX_SAFE_INTEGER);
      // Precision caveat near the safe integer boundary:
      expect(addNumbers(Number.MAX_SAFE_INTEGER, 1)).not.toBe(Number.MAX_SAFE_INTEGER); // behavior exists, not guaranteeing exact value
    });
  });

  describe('IEEE-754 and special values', () => {
    it('propagates NaN', () => {
      expect(Number.isNaN(addNumbers(NaN, 1))).toBe(true);
      expect(Number.isNaN(addNumbers(1, NaN))).toBe(true);
    });

    it('handles Infinity and -Infinity', () => {
      expect(addNumbers(Infinity, 1)).toBe(Infinity);
      expect(addNumbers(-Infinity, -1)).toBe(-Infinity);
      expect(addNumbers(Infinity, -Infinity)).toBeNaN(); // Infinity - Infinity => NaN
    });
  });

  describe('unexpected inputs (documenting JS semantics, not enforcing)', () => {
    it('performs string concatenation if either operand is a string', () => {
      expect(addNumbers('5', 10)).toBe('510');
      expect(addNumbers(5, '10')).toBe('510');
      expect(addNumbers('5', '10')).toBe('510');
    });

    it('coerces null and undefined per JS + rules', () => {
      // null -> 0 in numeric context
      expect(addNumbers(null, 1)).toBe(1);
      // undefined -> NaN
      expect(Number.isNaN(addNumbers(undefined, 1))).toBe(true);
    });

    it('throws on mixing BigInt and Number', () => {
      expect(() => addNumbers(1n, 2)).toThrow(TypeError);
      expect(() => addNumbers(1, 2n)).toThrow(TypeError);
    });

    it('adds two BigInts if both operands are BigInt (mirrors + behavior)', () => {
      // Note: This passes only if addNumbers is generic '+' which supports BigInt+BigInt.
      // If your build/transpiler forbids BigInt in this environment, feel free to skip this test.
      expect(addNumbers(1n, 2n)).toBe(3n);
    });

    it('handles objects via toString/valueOf where applicable', () => {
      // Object with valueOf
      const withValueOf = { valueOf: () => 7 };
      expect(addNumbers(withValueOf, 3)).toBe(10);

      // Plain objects -> NaN when coerced to number
      expect(Number.isNaN(addNumbers({}, 1))).toBe(true);
    });
  });

  describe('commutativity and basic properties', () => {
    it('is commutative for numeric operands', () => {
      const a = 123.456;
      const b = -78.9;
      expect(addNumbers(a, b)).toBe(addNumbers(b, a));
    });

    it('has 0 as additive identity', () => {
      const v = 42;
      expect(addNumbers(v, 0)).toBe(v);
      expect(addNumbers(0, v)).toBe(v);
    });
  });
});