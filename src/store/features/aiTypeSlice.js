import { createSlice } from "@reduxjs/toolkit";

const aiTypeSlice = createSlice({
  name: "aiType",
  initialState: {scenario:null},

  reducers: {
    setAIType: (state, action) => {
      state.scenario = action.payload;
    },
  },
});

export const { setAIType } = aiTypeSlice.actions;

export default aiTypeSlice.reducer;
