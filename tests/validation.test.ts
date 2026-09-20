import { expect } from 'chai';
import { Validation } from '../src/utils/validators';

describe('Validation', () => {
  it('should validate required strings', () => {
    expect(Validation.isRequired('')).to.equal(false);
    expect(Validation.isRequired('  Book  ')).to.equal(true);
  });

  it('should validate publication years', () => {
    expect(Validation.isValidYear('1999')).to.equal(true);
    expect(Validation.isValidYear('2026')).to.equal(true);
    expect(Validation.isValidYear('abc')).to.equal(false);
    expect(Validation.isValidYear('2500')).to.equal(false);
    expect(Validation.isValidYear('99')).to.equal(false);
  });

  it('should validate numeric ids', () => {
    expect(Validation.isNumericId('1725533394038')).to.equal(true);
    expect(Validation.isNumericId('abc')).to.equal(false);
    expect(Validation.isNumericId('1725a')).to.equal(false);
  });

  it('should validate email addresses', () => {
    expect(Validation.isValidEmail('user@example.com')).to.equal(true);
    expect(Validation.isValidEmail('user@')).to.equal(false);
    expect(Validation.isValidEmail('invalid-email')).to.equal(false);
  });
});
