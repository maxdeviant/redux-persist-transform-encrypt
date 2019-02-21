import CryptoJSCore from 'crypto-js/core'
import AES from 'crypto-js/aes'
import Stream from 'readable-stream'
import { makeConfig } from './helpers'

export default class AsyncCryptor {
  constructor(secretKey, configParam) {
    this.key = CryptoJSCore.enc.Utf8.parse(secretKey)
    this.cryptorParams = makeConfig(configParam)
  }

  encrypt(state) {
    const encryptor = CryptoJSCore.algo.AES.createEncryptor(
      this.key,
      this.cryptorParams
    )
    return this._execute(encryptor, state)
  }

  decrypt(state) {
    const decryptor = CryptoJSCore.algo.AES.createDecryptor(
      this.key,
      this.cryptorParams
    )
    return this._execute(decryptor, state, true)
  }

  _execute(cryptor, state, decrypt = false) {
    return new Promise((resolve, reject) => {
      try {
        const stream = new Stream()
        let processedState = ''
        stream
          .on('data', data => {
            processedState += cryptor.process(data.toString())
          })
          .on('end', () => {
            processedState += cryptor.finalize()
            resolve(processedState)
          })
        stream.push(state)
        stream.push(null)
      } catch (err) {
        reject(err)
      }
    })
  }
}
