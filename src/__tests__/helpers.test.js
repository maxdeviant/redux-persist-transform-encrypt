import {
  makeEncryptor
} from '../helpers';

describe('makeEncryptor', () => {
  it('should ensure the incoming state is a string', () => {
    const encryptor = makeEncryptor(state => state.split('').reverse().join(''));
    const key = '123';
    const state = {
      a: 1
    };
    expect(typeof encryptor(state, key)).toBe('string');
  });
});
