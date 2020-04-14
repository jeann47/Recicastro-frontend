import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'control',
      storage,
      whitelist: ['mats', 'transactions', 'employees', 'WorkFlow'],
    },
    reducers
  );
  return persistedReducer;
};
