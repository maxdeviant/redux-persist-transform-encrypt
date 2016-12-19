import stringify from 'json-stringify-safe';
import CryptoJS from 'crypto-js';
import ProgressiveCryptor from './ProgressiveCryptor';

export function makeEncryptorHelper(secretKey, transform) {
  return (state, key) => {
    if (typeof state !== 'string') {
      state = stringify(state);
    }
    return transform(secretKey, state);
  };
}

export function makeEncryptor(secretKey) {
  return makeEncryptorHelper(secretKey, (secret, state) =>
    CryptoJS.AES.encrypt(state, secret).toString());
}

export function makeDecryptorHelper(secretKey, transform) {
  return (state, key) => {
    if (typeof state !== 'string') {
      if (process.env.NODE_ENV !== 'production') {
        console.error('redux-persist-transform-encrypt: expected outbound state to be a string');
      }
      return state;
    }
    try {
      return transform(secretKey, state);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(err);
      }
      return null;
    }
  };
}

export function makeDecryptor(secretKey, progressive = false) {
  return makeDecryptorHelper(secretKey, (secret, state) => {
    const bytes = CryptoJS.AES.decrypt(state, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  });
}

export function makeProgressiveEncryptor(secretKey) {
  return makeEncryptorHelper(secretKey, (secret, state) => {
    const progressiveCryptor = new ProgressiveCryptor(state, secretKey);
    return progressiveCryptor.encrypt(encryptedState => {
      return encryptedState;
    });
  });
}

export function makeProgressiveDecryptor(secretKey) {
  return makeDecryptorHelper(secretKey, (secret, state) => {
    const progressiveCryptor = new ProgressiveCryptor(state, secret);
    return progressiveCryptor.decrypt(decryptedState => {
      return JSON.parse(decryptedState.toString(CryptoJS.enc.Utf8));
    });
  });
}
