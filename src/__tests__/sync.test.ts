import { encryptTransform } from '../sync';

describe('sync', () => {
  describe('configuration', () => {
    it('throws an error when not given any configuration', () => {
      expect(() =>
        encryptTransform(void 0 as any)
      ).toThrowErrorMatchingInlineSnapshot(
        `"redux-persist-transform-encrypt: No configuration provided."`
      );
    });

    it('throws an error when not given a secret key', () => {
      expect(() =>
        encryptTransform({
          secretKey: void 0 as any,
        })
      ).toThrowErrorMatchingInlineSnapshot(
        `"redux-persist-transform-encrypt: No secret key provided."`
      );
    });
  });

  describe('inbound', () => {
    it('encrypts the inbound state', () => {
      const transform = encryptTransform({
        secretKey: 'redux-is-awesome',
      });

      const key = 'testState';
      const state = {
        foo: 'bar',
      };

      const newState = transform.in(state, key, state);
      expect(typeof newState).toBe('string');
      expect(newState).not.toEqual(state);
    });
  });

  describe('outbound', () => {
    it('decrypts the outbound state', () => {
      const transform = encryptTransform({
        secretKey: 'redux-is-awesome',
      });

      const key = 'testState';
      const state = {
        foo: 'bar',
      };

      const encryptedState = transform.in(state, key, state);
      const decryptedState = transform.out(encryptedState, key, encryptedState);
      expect(decryptedState).toEqual(state);
    });
  });
});
