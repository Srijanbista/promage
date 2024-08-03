// slices/projectsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    data: [],
    isLoading: false,
  },
  reducers: {
    setProjects: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setProjects, setLoading } = projectsSlice.actions;
export default projectsSlice.reducer;
