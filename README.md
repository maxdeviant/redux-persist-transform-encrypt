# redux-persist-transform-encrypt

[![npm](https://img.shields.io/npm/v/redux-persist-transform-encrypt.svg?maxAge=3600&style=flat-square)](https://www.npmjs.com/package/redux-persist-transform-encrypt)
[![Travis](https://img.shields.io/travis/maxdeviant/redux-persist-transform-encrypt.svg?maxAge=3600&style=flat-square)](https://travis-ci.org/maxdeviant/redux-persist-transform-encrypt)

Encrypt your Redux store.

## Usage

### Synchronous

```js
import { persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

const encryptor = encryptTransform({
  secretKey: 'my-super-secret-key',
  onError: function (error) {
    // Handle the error.
  },
});

const reducer = persistReducer(
  {
    transforms: [encryptor],
  },
  baseReducer
);
```

### Asynchronous

Asynchronous support was removed in v3.0.0, as it was never fully supported and is not able to be implemented correctly. See [#48](https://github.com/maxdeviant/redux-persist-transform-encrypt/issues/48) for more details.

### Custom Error Handling

The `onError` property given to the `encryptTransform` options is an optional
function that receives an `Error` object as its only parameter. This allows
custom error handling from the parent application.
