import stringify from 'json-stringify-safe';
import CryptoJS from 'crypto-js';
import ProgressiveCryptor from './ProgressiveCryptor';

export function makeEncryptor(secretKey, progressive = false) {
  return (state, key) => {
    if (typeof state !== 'string') {
      state = stringify(state);
    }

    return CryptoJS.AES.encrypt(state, secretKey).toString();
  }
}

export function makeDecryptor(secretKey, progressive = false) {
  return (state, key) => {
    if (typeof state !== 'string') {
      if (process.env.NODE_ENV !== 'production') {
        console.error('redux-persist-transform-encrypt: expected outbound state to be a string');
      }

      return state;
    }

    try {
      const bytes = CryptoJS.AES.decrypt(state, secretKey);
      const newState = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      return newState;
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(err);
      }

      return null;
    }
  }
}

export function makeProgressiveEncryptor(secretKey) {
  return (state, key) => {
    if (typeof state !== 'string') {
      state = stringify(state);
    }
    const progressiveCryptor = new ProgressiveCryptor(state, secretKey);
    return progressiveCryptor.encrypt(encryptedState => {
      return encryptedState;
    });
  };
}

export function makeProgressiveDecryptor(secretKey) {
  return (state, key) => {
    if (typeof state !== 'string') {
      if (process.env.NODE_ENV !== 'production') {
        console.error('redux-persist-transform-encrypt: expected outbound state to be a string');
      }

      return state;
    }

    try {
      const progressiveCryptor = new ProgressiveCryptor(state, secretKey);
      progressiveCryptor.decrypt(decryptedState => {
        return JSON.parse(decryptedState.toString(CryptoJS.enc.Utf8));
      });
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(err);
      }

      return null;
    }
  }
}
