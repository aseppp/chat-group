import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  dataById: null,
  isAdd: null,
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
    onAdd: (state) => {
      state.isAdd = true;
    },
    clear: (state) => {
      state.isAdd = false;
      state.dataById = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadDatas, loadData, onAdd, clear } = channelSlice.actions;

export default channelSlice.reducer;
