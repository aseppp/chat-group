import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  dataById: null,
  isAdd: null,
  isOpen: false,
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
    setOpen: (state) => {
      state.isOpen = true;
    },
    setClose: (state) => {
      state.isOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadDatas, loadData, onAdd, clear, setOpen, setClose } =
  channelSlice.actions;

export default channelSlice.reducer;
