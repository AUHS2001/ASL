import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    confirmNotification: false,
  },

  reducers: {
    setConfirmNotification: (state, action) => {
      state.confirmNotification = action.payload
    }
  }
})

export const {
  setConfirmNotification
} = userSlice.actions

export default userSlice.reducer