import test from 'ava';
import sinon from 'sinon';
import { encryptTransform } from '../sync.js';

test('encryptTransform throws an error when not given any configuration', t => {
  t.throws(() => encryptTransform(void 0 as any), {
    instanceOf: Error,
    message: 'redux-persist-transform-encrypt: No configuration provided.',
  });
});

test('encryptTransform throws an error when not given a secret key', t => {
  t.throws(() => encryptTransform({ secretKey: void 0 as any }), {
    instanceOf: Error,
    message: 'redux-persist-transform-encrypt: No secret key provided.',
  });
});

test('encryptTransform encrypts the inbound state', t => {
  const transform = encryptTransform({
    secretKey: 'redux-is-awesome',
  });

  const key = 'testState';
  const state = {
    foo: 'bar',
  };

  const newState = transform.in(state, key, state);
  t.is(typeof newState, 'string');
  t.not(newState, state);
});

test('encryptTransform decrypts the outbound state', t => {
  const transform = encryptTransform({
    secretKey: 'redux-is-awesome',
  });

  const key = 'testState';
  const state = {
    foo: 'bar',
  };

  const encryptedState = transform.in(state, key, state);
  const decryptedState = transform.out(encryptedState, key, encryptedState);
  t.deepEqual(decryptedState, state);
});

test('encryptTransform calls the error handler when the decryption fails', t => {
  const inboundTransform = encryptTransform({
    secretKey: 'redux-is-awesome',
  });

  const key = 'testState';
  const state = {
    foo: 'bar',
  };

  const encryptedState = inboundTransform.in(state, key, state);

  const handleError = sinon.spy();
  const transform = encryptTransform({
    secretKey: 'different-secret',
    onError: handleError,
  });

  transform.out(encryptedState, key, encryptedState);
  t.true(
    handleError.calledOnceWith(
      sinon.match
        .instanceOf(Error)
        .and(
          sinon.match.has(
            'message',
            'redux-persist-transform-encrypt: Could not decrypt state. Please verify that you are using the correct secret key.'
          )
        )
    )
  );
});

test('encryptTransform round-trip works when the inbound state is already a JSON string', t => {
  const transform = encryptTransform({
    secretKey: 'redux-is-awesome',
  });

  const key = 'testState';
  const state = JSON.stringify({
    foo: 'bar',
  });

  const encryptedState = transform.in(state, key, state);
  const decryptedState = transform.out(encryptedState, key, encryptedState);
  t.deepEqual(decryptedState, state);
});

test('encryptTransform round-trip works when the inbound state is a plain string', t => {
  const transform = encryptTransform({
    secretKey: 'redux-is-awesome',
  });

  const key = 'testState';
  const state = 'Hello World';

  const encryptedState = transform.in(state, key, state);
  const decryptedState = transform.out(encryptedState, key, encryptedState);
  t.deepEqual(decryptedState, state);
});
