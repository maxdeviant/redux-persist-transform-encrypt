# redux-persist-transform-encrypt

[![npm](https://img.shields.io/npm/v/redux-persist-transform-encrypt.svg?maxAge=3600)](https://www.npmjs.com/package/redux-persist-transform-encrypt)
[![CI](https://github.com/maxdeviant/redux-persist-transform-encrypt/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/maxdeviant/redux-persist-transform-encrypt/actions/workflows/ci.yml)

Encrypt your Redux store.

## Installation

`redux-persist-transform-encrypt` must be used in conjunction with `redux-persist`, so make sure you have that installed as well.

#### Yarn

```sh
yarn add redux-persist-transform-encrypt
```

#### npm

```sh
npm install redux-persist-transform-encrypt
```

## Usage

### Synchronous

```js
import { persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

const reducer = persistReducer(
  {
    transforms: [
      encryptTransform({
        secretKey: 'my-super-secret-key',
        onError: function (error) {
          // Handle the error.
        },
      }),
    ],
  },
  baseReducer
);
```

### Asynchronous

Asynchronous support was removed in v3.0.0, as it was never fully supported and is not able to be implemented correctly given the current constraints that `redux-persist` imposes on transforms. See [#48](https://github.com/maxdeviant/redux-persist-transform-encrypt/issues/48) for more details.

### Custom Error Handling

The `onError` property given to the `encryptTransform` options is an optional
function that receives an `Error` object as its only parameter. This allows
custom error handling from the parent application.

## Secret Key Selection

The `secretKey` provided to `encryptTransform` is used as a passphrase to generate a 256-bit AES key which is then used to encrypt the Redux store.

You **SHOULD NOT** use a single secret key for all users of your application, as this negates any potential security benefits of encrypting the store in the first place.

You **SHOULD NOT** hard-code or generate your secret key anywhere on the client, as this risks exposing the key since the JavaScript source is ultimately accessible to the end-user.

If you are only interested in persisting the store over the course of a single session and then invalidating the store, consider using the user's access token or session key as the secret key.

For long-term persistence, you will want to use a unique, deterministic key that is provided by the server. For example, the server could derive a hash from the user's ID and a salt (also stored server-side) and then return that hash to the client to use to decrypt the store. Placing this key retrieval behind authentication would prevent someone from accessing the encrypted store data if they are not authenticated as the user.
