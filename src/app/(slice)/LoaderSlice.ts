import { createSlice } from "@reduxjs/toolkit";

export interface LoaderState {
  isLoading: boolean;
}

const initialState: LoaderState = {
  isLoading: false,
};

const LoaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
});
export const { startLoading, stopLoading } = LoaderSlice.actions;
export default LoaderSlice.reducer;
