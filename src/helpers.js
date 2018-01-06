import stringify from 'json-stringify-safe'

export const handleError = (handler, err) => {
  if (typeof handler === 'function') {
    handler(err)
  }
}

export const makeEncryptor = transform => (state, key) => {
  state = stringify(state)
  return transform(state)
}

export const makeDecryptor = (transform, onError) => (state, key) => {
  if (typeof state !== 'string') {
    handleError(
      onError,
      'redux-persist-transform-encrypt: expected outbound state to be a string'
    )
    return state
  }
  try {
    return transform(state)
  } catch (err) {
    handleError(onError, err)
    return null
  }
}
