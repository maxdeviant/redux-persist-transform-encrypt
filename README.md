# redux-persist-transform-encrypt

[![npm](https://img.shields.io/npm/v/redux-persist-transform-encrypt.svg?maxAge=3600&style=flat-square)](https://www.npmjs.com/package/redux-persist-transform-encrypt)
[![Travis](https://img.shields.io/travis/maxdeviant/redux-persist-transform-encrypt.svg?maxAge=3600&style=flat-square)](https://travis-ci.org/maxdeviant/redux-persist-transform-encrypt)

Encrypt your Redux store.

## Usage

### Synchronous

```js
import { persistReducer } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';

const encryptor = createEncryptor({
  secretKey: 'my-super-secret-key'
});

const reducer = persistReducer(
  {
    transforms: [encryptor]
  },
  baseReducer
);
```

### Asynchronous

**Note:** Asynchronous support is still a work in progress.

```js
import { persistReducer } from 'redux-persist';
import createAsyncEncryptor from 'redux-persist-transform-encrypt/async';

const asyncEncryptor = createAsyncEncryptor({
  secretKey: 'my-super-secret-key'
});

const reducer = persistReducer(
  {
    transforms: [asyncEncryptor]
  },
  baseReducer
);
```
