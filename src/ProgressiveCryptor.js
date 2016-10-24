var CryptoJS = require('crypto-js');
var Stream = require('readable-stream');

export default class ProgressiveCryptor {
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
    new Promise((resolve, reject) => {
      try {
        var stream = new Stream;
        var processedState = '';

        stream
        .on('data', (data) => {
          processedState += this.processor.process(data.toString());
        })
        .on('end', () => {
          processedState += this.processor.finalize();
          resolve(processedState);
        });

        stream.push(this.state);
        stream.push(null);
      } catch (err) {
        reject(err);
      }
    });
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
