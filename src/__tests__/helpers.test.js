import { makeEncryptor, handleError } from '../helpers'

describe('makeEncryptor', () => {
  it('should ensure the incoming state is a string', () => {
    const encryptor = makeEncryptor(state =>
      state
        .split('')
        .reverse()
        .join('')
    )
    const key = '123'
    const state = {
      a: 1
    }
    expect(typeof encryptor(state, key)).toBe('string')
  })
})

describe('errorHandler', () => {
  it('should handle an error given an error handler', () => {
    const errorHandler = jest.fn()
    handleError(errorHandler, new Error('error message'))
    expect(errorHandler).toHaveBeenCalledWith(new Error('error message'))
  })

  it('should not throw if an invalid handler is given', () => {
    const errorHandler = 'not a function'
    expect(() => {
      handleError(errorHandler, 'error message')
    }).not.toThrow()
  })
})
