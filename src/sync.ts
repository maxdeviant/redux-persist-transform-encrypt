import * as Aes from 'crypto-js/aes';
import * as CryptoJsCore from 'crypto-js/core';
import stringify from 'json-stringify-safe';
import { createTransform } from 'redux-persist';

export interface EncryptTransformConfig {
  secretKey: string;
  onError?: (err: Error) => void;
}

const makeError = (message: string) =>
  new Error(`redux-persist-transform-encrypt: ${message}`);

export const encryptTransform = (
  config: EncryptTransformConfig & Parameters<typeof createTransform>[2]
) => {
  if (typeof config === 'undefined') {
    throw makeError('No configuration provided.');
  }

  const { secretKey, onError, ...transformConfig } = config;
  if (!secretKey) {
    throw makeError('No secret key provided.');
  }

  const onErrorHandler =
    typeof !!onError && typeof onError === 'function' ? onError : console.warn;

  return createTransform(
    (inboundState, _key) =>
      Aes.encrypt(stringify(inboundState), secretKey).toString(),
    (outboundState, _key) => {
      if (typeof outboundState !== 'string') {
        return onErrorHandler(
          makeError('Expected outbound state to be a string.')
        );
      }

      try {
        const decryptedString = Aes.decrypt(outboundState, secretKey).toString(
          CryptoJsCore.enc.Utf8
        );
        if (!decryptedString) {
          throw new Error('Decrypted string is empty.');
        }

        try {
          return JSON.parse(decryptedString);
        } catch {
          return onErrorHandler(makeError('Failed to parse state as JSON.'));
        }
      } catch {
        return onErrorHandler(
          makeError(
            'Could not decrypt state. Please verify that you are using the correct secret key.'
          )
        );
      }
    },
    transformConfig
  );
};
