var CryptoJS = require('crypto-js');
var ProgressiveCryptor = require('./ProgressiveCryptor').default;
var reduxPersist = require('redux-persist');
var stringify = require('json-stringify-safe');
var createTransform = reduxPersist.createTransform;

function makeEncryptor(secretKey, progressive) {
  return function (state, key) {
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
  return function (state, key) {
    if (typeof state !== 'string') {
      if (process.env.NODE_ENV !== 'production') {
        console.error('redux-persist-transform-encrypt: expected outbound state to be a string');
      }

      return state;
    }

    try {
      if (progressive) {
        new ProgressiveCryptor(state, secretKey).decrypt((decryptedState) => {
          return JSON.parse(decryptedState.toString(CryptoJS.enc.Utf8));
        });
      } else {
        var bytes = CryptoJS.AES.decrypt(state, secretKey);
        var newState = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

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
  var inbound = makeEncryptor(config.secretKey);
  var outbound = makeDecryptor(config.secretKey);

  return createTransform(inbound, outbound, config);
}

export function createProgressiveEncryptor(config) {
  var inbound = makeEncryptor(config.secretKey, true);
  var outbound = makeDecryptor(config.secretKey, true);

  return createTransform(inbound, outbound, config);
}

export default createEncryptor;
