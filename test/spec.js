import { expect } from 'chai';
const createEncryptor = require('../');

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

    expect(newState).to.be.a('string');
    expect(newState).to.not.eql(state);
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

    expect(newState).to.eql(state);
  });
});
