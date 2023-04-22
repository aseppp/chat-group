import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './rootReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// import { configureStore } from '@reduxjs/toolkit';
// import userSlice from './features/userSlice';
// import channelSlice from './features/channelSlice';
// import messageSlice from './features/messageSlice';
// import globalSlice from './features/globalSlice';

// export const store = configureStore({
//   reducer: {
//     user: userSlice,
//     channel: channelSlice,
//     message: messageSlice,
//     global: globalSlice,
//   },
// });
