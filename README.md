# redux-persist-transform-encrypt
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
