# redux-persist-transform-encrypt

[![npm](https://img.shields.io/npm/v/redux-persist-transform-encrypt.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/redux-persist-transform-encrypt)

Encrypt your Redux store.

## Usage

```js
import createEncryptor from 'redux-persist-transform-encrypt';

const encryptor = createEncryptor({
  secretKey: 'my-super-secret-key'
});

persistStore(store, {
  transforms: [
    encryptor
  ]
});

```
