import CryptoJS from 'crypto-js';
import { createTransform } from 'redux-persist';
import stringify from 'json-stringify-safe';
import ProgressiveCryptor from './ProgressiveCryptor';

function makeEncryptor(secretKey, progressive) {
  return (state, key) => {
    if (typeof state !== 'string') {
      state = stringify(state);
    }

    if (progressive) {
      new ProgressiveCryptor(state, secretKey).encrypt((encryptedState) => {
        return encryptedState;
      });
    }

    return CryptoJS.AES.encrypt(state, secretKey).toString();
  }
}

function makeDecryptor(secretKey, progressive) {
  return (state, key) => {
    if (typeof state !== 'string') {
      if (process.env.NODE_ENV !== 'production') {
        console.error('redux-persist-transform-encrypt: expected outbound state to be a string');
      }

      return state;
    }

    try {
      if (progressive) {
        new ProgressiveCryptor(state, secretKey).decrypt(decryptedState => {
          return JSON.parse(decryptedState.toString(CryptoJS.enc.Utf8));
        });
      } else {
        const bytes = CryptoJS.AES.decrypt(state, secretKey);
        const newState = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        return newState;
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(err);
      }

      return null;
    }
  }
}

export function createEncryptor(config) {
  const inbound = makeEncryptor(config.secretKey);
  const outbound = makeDecryptor(config.secretKey);

  return createTransform(inbound, outbound, config);
}

export function createProgressiveEncryptor(config) {
  const inbound = makeEncryptor(config.secretKey, true);
  const outbound = makeDecryptor(config.secretKey, true);

  return createTransform(inbound, outbound, config);
}

export default createEncryptor;
