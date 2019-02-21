import { createTransform } from 'redux-persist'
import CryptoJSCore from 'crypto-js/core'
import AES from 'crypto-js/aes'
import { makeEncryptor, makeDecryptor, makeConfig } from './helpers'

const makeSyncEncryptor = (secretKey, cfg) =>
  makeEncryptor(state => AES.encrypt(state, secretKey, cfg).toString())

const makeSyncDecryptor = (secretKey, onError, cfg) =>
  makeDecryptor(state => {
    try {
      const bytes = AES.decrypt(state, secretKey, cfg)
      const decryptedString = bytes.toString(CryptoJSCore.enc.Utf8)
      return JSON.parse(decryptedString)
    } catch (err) {
      throw new Error(
        'Could not decrypt state. Please verify that you are using the correct secret key.'
      )
    }
  }, onError)

export default config => {
  const configParam = makeConfig(config)
  const inbound = makeSyncEncryptor(config.secretKey, configParam)
  const outbound = makeSyncDecryptor(
    config.secretKey,
    config.onError,
    configParam
  )
  return createTransform(inbound, outbound, config)
}
