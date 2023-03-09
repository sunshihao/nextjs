import { createSlice } from "@reduxjs/toolkit";

type SocketTs = {
  socketInstance?: WebSocket | undefined;
};

const initialState: SocketTs = {
  socketInstance: undefined,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    set_socket_intance(state, action) {
    //   if (!state.socketInstance) {
        state.socketInstance = action.payload;
    //   }
      return state;
    },
  },
});

export const { set_socket_intance } = socketSlice.actions;
export default socketSlice.reducer;
