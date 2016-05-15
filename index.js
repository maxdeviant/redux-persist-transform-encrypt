var CryptoJS = require('crypto-js');
var reduxPersist = require('redux-persist');
var stringify = require('json-stringify-safe');
var createTransform = reduxPersist.createTransform;

function createEncryptor(secretKey) {
  return function (state, key) {
    if (typeof state !== 'string') {
      state = stringify(state);
    }

    return CryptoJS.AES.encrypt(state, secretKey).toString();
  }
}

function createDecryptor(secretKey) {
  return function (state, key) {
    if (typeof state !== 'string') {
      if (process.env.NODE_ENV !== 'production') {
        console.error('redux-persist-transform-encrypt: expected outbound state to be a string');
      }

      return state;
    }

    try {
      var bytes = CryptoJS.AES.decrypt(state, secretKey);
      var newState = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      return newState;
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(err);
      }

      return null;
    }
  }
}

module.exports = function (config) {
  var inbound = createEncryptor(config.secretKey);
  var outbound = createDecryptor(config.secretKey);

  return createTransform(inbound, outbound, config);
};
