var CryptoJS = require('crypto-js');
var Stream = require('readable-stream');

export default class AsyncCryptor {
  constructor(secretKey) {
    const salt = CryptoJS.lib.WordArray.random(8);
    const cipher = CryptoJS.kdf.OpenSSL.execute(secretKey, 8, 4, salt);
    this.key = CryptoJS.enc.Utf8.parse(secretKey);
    this.cryptorParams = {
      iv: cipher.iv,
    };
  }

  encrypt(state) {
    const encryptor = CryptoJS.algo.AES.createEncryptor(this.key, this.cryptorParams);
    return this._execute(encryptor, state);
  }

  decrypt(state) {
    const decryptor = CryptoJS.algo.AES.createDecryptor(this.key, this.cryptorParams);
    return this._execute(decryptor, state, true);
  }

  _execute(cryptor, state, decrypt = false) {
    return new Promise((resolve, reject) => {
      try {
        const stream = new Stream();
        let processedState = '';
        stream
          .on('data', data => {
            processedState += cryptor.process(data.toString());
          })
          .on('end', () => {
            processedState += cryptor.finalize();
            resolve(processedState);
          });
        stream.push(state);
        stream.push(null);
      } catch (err) {
        reject(err);
      }
    });
  }
}
