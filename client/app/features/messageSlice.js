import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdd: false,
  messages: null,
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    loadMessage: (state, action) => {
      state.messages = action.payload;
    },
    clearMessage: (state) => {
      state.messages = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadMessage, clearMessage } = messageSlice.actions;

export default messageSlice.reducer;
