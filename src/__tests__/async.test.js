import createEncryptor from '../async'
global.console.warn = jest.fn()

describe('async', () => {
  it('should display a warning when using the async transform', () => {
    const encryptTransform = createEncryptor({
      secretKey: 'async-in-progress'
    })
    expect(global.console.warn).toHaveBeenCalledWith(
      'redux-persist-transform-encrypt: async support is still a work in progress.'
    )
  })

  it('should encrypt incoming state asynchronously', () => {
    const encryptTransform = createEncryptor({
      secretKey: 'redux-is-awesome'
    })
    const key = 'testState'
    const state = {
      foo: 'bar'
    }
    return encryptTransform.in(state, key).then(newState => {
      expect(typeof newState).toBe('string')
      expect(newState).not.toEqual(state)
    })
  })

  xit('should decrypt outgoing state asynchronously', () => {
    const encryptTransform = createEncryptor({
      secretKey: 'redux-is-awesome'
    })
    const key = 'testState'
    const state = {
      foo: 'bar'
    }
    return encryptTransform
      .in(state, key)
      .then(encryptedState => {
        return encryptTransform.out(encryptedState, key)
      })
      .then(newState => {
        expect(newState).toEqual(state)
      })
  })
})
