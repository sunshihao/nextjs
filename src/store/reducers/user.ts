import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {}
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    upd_user(state, action) {
      return state;
    }
  },
});

export const { upd_user } = userSlice.actions;
export default userSlice.reducer;
