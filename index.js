var CryptoJS = require('crypto-js');
var reduxPersist = require('redux-persist');
var Stream = require('readable-stream');
var stringify = require('json-stringify-safe');
var createTransform = reduxPersist.createTransform;

class ProgressiveCryptor {
  constructor(state, secretKey) {
    var salt = CryptoJS.lib.WordArray.random(8);
    var cipher = CryptoJS.kdf.OpenSSL.execute(secretKey, 8, 4, salt);

    this.state = state;
    this.key = CryptoJS.enc.Utf8.parse(secretKey);

    this.cryptorParams = {
      iv: cipher.iv,
    };
  }

  start() {
    var stream = new Stream;
    var processedState = '';

    stream
    .on('data', (data) => {
      processedState += this.processor.process(data.toString());
    })
    .on('end', () => {
      processedState += this.processor.finalize();
      return processedState;
    });

    stream.push(this.state);
    stream.push(null);
  }

  encrypt() {
    this.processor = CryptoJS.algo.AES.createEncryptor(this.key, this.cryptorParams);
    this.start();
  }

  decrypt() {
    this.processor = CryptoJS.algo.AES.createDecryptor(this.key, this.cryptorParams);
    this.start();
  }
}

function createEncryptor(secretKey) {
  return function (state, key) {
    if (typeof state !== 'string') {
      state = stringify(state);
    }

    return new ProgressiveCryptor(state, secretKey).encrypt();
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
      var bytes = new ProgressiveCryptor(state, secretKey).decrypt();
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
