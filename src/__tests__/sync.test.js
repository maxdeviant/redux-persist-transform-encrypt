import createEncryptor from '../sync'

describe('sync', () => {
  const testStates = new Map([
    [
      'object',
      {
        foo: 'bar'
      }
    ],
    ['string', 'just string'],
    ['number', 123],
    ['boolean', true],
    ['null', null]
  ])

  for (let [description, state] of testStates) {
    describe('state: ' + description, () => {
      it('can encrypt incoming state', () => {
        const encryptTransform = createEncryptor({
          secretKey: 'redux-is-awesome'
        })
        const key = 'testState'
        const newState = encryptTransform.in(state, key)
        expect(typeof newState).toBe('string')
        expect(newState).not.toEqual(state)
      })

      it('can decrypt outgoing state', () => {
        const encryptTransform = createEncryptor({
          secretKey: 'redux-is-awesome'
        })
        const key = 'testState'
        const encryptedState = encryptTransform.in(state, key)
        const newState = encryptTransform.out(encryptedState, key)
        expect(newState).toEqual(state)
      })

      it('should show a nice error message when an incorrect key is provided', () => {
        const initialEncryptTransform = createEncryptor({
          secretKey: 'super-secret'
        })
        const key = 'testState'
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
    })
  }

  let state = undefined
  describe('state: undefined', () => {
    it('can encrypt incoming state', () => {
      const encryptTransform = createEncryptor({
        secretKey: 'redux-is-awesome'
      })
      const key = 'testState'
      const newState = encryptTransform.in(state, key)
      expect(typeof newState).toBe('string')
      expect(newState).not.toEqual(state)
    })

    it('undefined will be decrypted to null', () => {
      const encryptTransform = createEncryptor({
        secretKey: 'redux-is-awesome'
      })
      const key = 'testState'
      const encryptedState = encryptTransform.in(state, key)
      const newState = encryptTransform.out(encryptedState, key)
      expect(newState).toEqual(null)
      expect(newState).not.toEqual(state)
    })
  })
})
