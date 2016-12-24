import { createTransform } from 'redux-persist';
import CryptoJS from 'crypto-js';
import { makeEncryptor, makeDecryptor } from './helpers';

const makeSyncEncryptor = secretKey =>
  makeEncryptor(state =>
    CryptoJS.AES.encrypt(state, secretKey).toString());

const makeSyncDecryptor = secretKey =>
  makeDecryptor(state => {
    const bytes = CryptoJS.AES.decrypt(state, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  });

export default config => {
  const inbound = makeSyncEncryptor(config.secretKey);
  const outbound = makeSyncDecryptor(config.secretKey);
  return createTransform(inbound, outbound, config);
};
