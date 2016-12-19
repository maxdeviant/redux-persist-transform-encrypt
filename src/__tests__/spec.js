import createEncryptor, { createProgressiveEncryptor } from '../';

describe('redux-persist-transform-encrypt', () => {
  it('can encrypt incoming state', () => {
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

  it('can decrypt outgoing state', () => {
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

  it('can encrypt incoming state progressively', () => {
    const encryptTransform = createProgressiveEncryptor({
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

  it.skip('can decrypt outgoing state progressively', () => {
    const encryptTransform = createProgressiveEncryptor({
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
