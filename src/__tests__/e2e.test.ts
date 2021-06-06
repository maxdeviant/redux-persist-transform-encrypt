import { Action, createStore, Store } from 'redux';
import {
  Persistor,
  persistReducer,
  persistStore,
  Storage,
} from 'redux-persist';
import { encryptTransform } from '../sync';

const inMemoryStorage = () => {
  const memory = new Map<string, any>();

  const storage: Storage = {
    getItem: key =>
      new Promise(resolve => {
        resolve(memory.get(key));
      }),
    setItem: (key, item) =>
      new Promise<void>(resolve => {
        memory.set(key, item);
        resolve();
      }),
    removeItem: key =>
      new Promise<void>(resolve => {
        memory.delete(key);
        resolve();
      }),
  };

  return { storage, memory };
};

const persistStoreAsync = (store: Store) =>
  new Promise<Persistor>(resolve => {
    const persistor = persistStore(store, void 0, () => resolve(persistor));
  });

describe('end-to-end', () => {
  it('works with `redux-persist`', async () => {
    type CounterAction = Action<'INCREMENT'> | Action<'DECREMENT'>;

    const counter = (state = { count: 0 }, action: CounterAction) => {
      switch (action.type) {
        case 'INCREMENT':
          return { ...state, count: state.count + 1 };
        case 'DECREMENT':
          return { ...state, count: state.count - 1 };
        default:
          return state;
      }
    };

    const { storage } = inMemoryStorage();
    const transform = encryptTransform({
      secretKey: 'e2e-test',
    });

    const key = 'counter';
    const persistedCounter = persistReducer(
      {
        key,
        storage,
        transforms: [transform],
      },
      counter
    );

    const store = createStore(persistedCounter);
    const persistor = await persistStoreAsync(store);

    store.dispatch({ type: 'INCREMENT' });
    store.dispatch({ type: 'INCREMENT' });

    await persistor.flush();

    const rehydratedStore = createStore(persistedCounter);
    await persistStoreAsync(rehydratedStore);

    expect(rehydratedStore.getState()).toStrictEqual(store.getState());
  });
});
