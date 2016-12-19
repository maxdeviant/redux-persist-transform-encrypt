import createEncryptor from '../async';

describe('async', () => {
  xit('should encrypt incoming state asynchronously', () => {
    const encryptTransform = createEncryptor({
      secretKey: 'redux-is-awesome'
    });
    const key = 'testState';
    const state = {
      foo: 'bar'
    };
    const newState = encryptTransform.in(state, key);
    expect(typeof newState).toBe('string');
    expect(newState).not.toEqual(state);
  });

  xit('should decrypt outgoing state asynchronously', () => {
    const encryptTransform = createEncryptor({
      secretKey: 'redux-is-awesome'
    });
    const key = 'testState';
    const state = {
      foo: 'bar'
    };
    const encryptedState = encryptTransform.in(state, key);
    const newState = encryptTransform.out(encryptedState, key);
    expect(newState).toEqual(state);
  });
});
