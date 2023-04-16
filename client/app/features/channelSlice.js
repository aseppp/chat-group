import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  dataById: null,
};

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    loadDatas: (state, action) => {
      state.data = action.payload;
    },
    loadData: (state, action) => {
      state.dataById = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadDatas, loadData } = channelSlice.actions;

export default channelSlice.reducer;
