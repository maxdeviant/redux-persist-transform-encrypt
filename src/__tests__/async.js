import createEncryptor from '../async';

describe('async', () => {
  it('should encrypt incoming state asynchronously', () => {
    const encryptTransform = createEncryptor({
      secretKey: 'redux-is-awesome'
    });
    const key = 'testState';
    const state = {
      foo: 'bar'
    };
    return encryptTransform.in(state, key).then(newState => {
      expect(typeof newState).toBe('string');
      expect(newState).not.toEqual(state);
    });
  });

  it('should decrypt outgoing state asynchronously', () => {
    const encryptTransform = createEncryptor({
      secretKey: 'redux-is-awesome'
    });
    const key = 'testState';
    const state = {
      foo: 'bar'
    };
    return encryptTransform.in(state, key).then(encryptedState => {
      return encryptTransform.out(encryptedState, key);
    }).then(newState => {
      expect(newState).toEqual(state);
    });
  });
});
