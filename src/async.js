import { createTransform } from 'redux-persist';
import CryptoJSCore from 'crypto-js/core';
import { makeEncryptor, makeDecryptor } from './helpers';
import AsyncCryptor from './AsyncCryptor';

const makeAsyncEncryptor = cryptor =>
  makeEncryptor(state => {
    return cryptor.encrypt(state).then(encryptedState => {
      return encryptedState;
    });
  });

const makeAsyncDecryptor = cryptor =>
  makeDecryptor(state => {
    return cryptor.decrypt(state).then(decryptedState => {
      return JSON.parse(decryptedState.toString(CryptoJSCore.enc.Utf8));
    });
  });

export default config => {
  const asyncCryptor = new AsyncCryptor(config.secretKey);
  const inbound = makeAsyncEncryptor(asyncCryptor);
  const outbound = makeAsyncDecryptor(asyncCryptor);
  return createTransform(inbound, outbound, config);
};
