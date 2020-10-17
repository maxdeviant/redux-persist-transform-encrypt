import * as Aes from 'crypto-js/aes';
import * as CryptoJsCore from 'crypto-js/core';
import stringify from 'json-stringify-safe';
import { createTransform } from 'redux-persist';

type ErrorHandler = (err: unknown) => void;

export interface EncryptTransformConfig {
  secretKey: string;
  onError?: ErrorHandler;
}

const makeError = (message: string) =>
  new Error(`redux-persist-transform-encrypt: ${message}`);

export const encryptTransform = (config: EncryptTransformConfig) => {
  if (typeof config === 'undefined') {
    throw makeError('No configuration provided.');
  }

  const { secretKey } = config;
  if (!secretKey) {
    throw makeError('No secret key provided.');
  }

  const onError =
    typeof config.onError === 'function' ? config.onError : console.warn;

  return createTransform(
    (inboundState, _key) =>
      Aes.encrypt(stringify(inboundState), secretKey).toString(),
    (outboundState, _key) => {
      if (typeof outboundState !== 'string') {
        return onError(makeError('Expected outbound state to be a string.'));
      }

      try {
        const bytes = Aes.decrypt(outboundState, secretKey);
        const decryptedString = bytes.toString(CryptoJsCore.enc.Utf8);
        if (!decryptedString) {
          throw new Error('Decrypted string is empty.');
        }

        try {
          return JSON.parse(decryptedString);
        } catch (err) {
          return onError(makeError('Failed to parse state as JSON.'));
        }
      } catch {
        return onError(
          makeError(
            'Could not decrypt state. Please verify that you are using the correct secret key.'
          )
        );
      }
    }
  );
};