import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

export const globalSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onclose: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onOpen, onclose } = globalSlice.actions;

export default globalSlice.reducer;
