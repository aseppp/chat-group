import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './features/userSlice';
import channelSlice from './features/channelSlice';
import messageSlice from './features/messageSlice';

export const rootReducer = combineReducers({
  user: userSlice,
  channel: channelSlice,
  message: messageSlice,
});
