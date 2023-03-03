import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'chat',
  initialState: { chatList : []},
  reducers: {
    addChatList(state, action) {
      console.log('action', action)
      state.chatList = [
        ...state.chatList,
        action.payload
      ]
    },
    delChatList(state) {
      state.chatList = []
    }
  }
})

export const { addChatList, delChatList } = counterSlice.actions
export default counterSlice.reducer