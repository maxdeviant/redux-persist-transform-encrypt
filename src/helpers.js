import stringify from 'json-stringify-safe';

export const makeEncryptor = transform => (state, key) => {
  state = stringify(state);
  return transform(state);
};

export const makeDecryptor = transform => (state, key) => {
  if (typeof state !== 'string') {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        'redux-persist-transform-encrypt: expected outbound state to be a string'
      );
    }
    return state;
  }
  try {
    return transform(state);
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
    return null;
  }
};
