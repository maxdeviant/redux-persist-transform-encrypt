import { expect } from 'chai';
import createEncryptor, { createProgressiveEncryptor } from '../src';

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

  it('can encrypt incoming state progressively', () => {
    const encryptTransform = createProgressiveEncryptor({
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

    expect(newState).to.eql(state);
  });
});
