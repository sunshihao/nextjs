import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    userName: "SSSH",
    userType: "human",
    date: "2023-03-02",
    content: "这是接收方的另一条聊天内容",
  },
  {
    userName: "AI",
    userType: "AI",
    date: "2023-03-02",
    content: "这是发送方的一条聊天内容",
  },
];

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    add_chat(state, action) {
      state.push(action.payload)
      return state;
    },
    del_chat(state) {
      return state;
    },
  },
});

export const { add_chat, del_chat } = chatSlice.actions;
export default chatSlice.reducer;
