import createEncryptor from '../sync'

describe('sync', () => {
  it('can encrypt incoming state', () => {
    const encryptTransform = createEncryptor({
      secretKey: 'redux-is-awesome'
    })
    const key = 'testState'
    const state = {
      foo: 'bar'
    }
    const newState = encryptTransform.in(state, key)
    expect(typeof newState).toBe('string')
    expect(newState).not.toEqual(state)
  })

  it('can decrypt outgoing state', () => {
    const encryptTransform = createEncryptor({
      secretKey: 'redux-is-awesome'
    })
    const key = 'testState'
    const state = {
      foo: 'bar'
    }
    const encryptedState = encryptTransform.in(state, key)
    const newState = encryptTransform.out(encryptedState, key)
    expect(newState).toEqual(state)
  })

  it('should call our custom error handler when an incorrect key is provided', () => {
    const initialEncryptTransform = createEncryptor({
      secretKey: 'super-secret'
    })
    const key = 'testState'
    const state = {
      foo: 'bar'
    }
    const encryptedState = initialEncryptTransform.in(state, key)
    const customErrorHandler = jest.fn()
    const encryptTransform = createEncryptor({
      secretKey: 'different-secret',
      onError: customErrorHandler
    })
    const newState = encryptTransform.out(encryptedState, key)
    expect(customErrorHandler).toHaveBeenCalledWith(
      new Error(
        'Could not decrypt state. Please verify that you are using the correct secret key.'
      )
    )
  })

  it('should call our custom error handler when trying to decrypt something that is not a string', () => {
    const key = 'testState'
    const encryptedState = {
      foo: 'bar'
    }
    const customErrorHandler = jest.fn()
    const encryptTransform = createEncryptor({
      secretKey: 'super-secret',
      onError: customErrorHandler
    })
    const newState = encryptTransform.out(encryptedState, key)
    expect(customErrorHandler).toHaveBeenCalledWith(
      new Error(
        'redux-persist-transform-encrypt: expected outbound state to be a string'
      )
    )
  })
})
