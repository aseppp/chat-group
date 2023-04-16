import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './features/userSlice';
import channelSlice from './features/channelSlice';

export const rootReducer = combineReducers({
  user: userSlice,
  channel: channelSlice,
});
