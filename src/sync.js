import { createTransform } from 'redux-persist';
import CryptoJSCore from 'crypto-js/core';
import AES from 'crypto-js/aes';
import { makeEncryptor, makeDecryptor } from './helpers';

const makeSyncEncryptor = secretKey =>
  makeEncryptor(state => AES.encrypt(state, secretKey).toString());

const makeSyncDecryptor = (secretKey, onError) =>
  makeDecryptor(state => {
    const bytes = AES.decrypt(state, secretKey);
    const decryptedString = bytes.toString(CryptoJSCore.enc.Utf8);
    if (!decryptedString) {
      throw new Error(
        'Could not decrypt state. Please verify that you are using the correct secret key.'
      );
    }
    return JSON.parse(decryptedString);
}, onError);

export default config => {
  const inbound = makeSyncEncryptor(config.secretKey);
  const outbound = makeSyncDecryptor(config.secretKey, config.onError);
  return createTransform(inbound, outbound, config);
};
