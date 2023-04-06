import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [], 
    text: '',
    time: ''
  },
  reducers: {
    addMessage(state, action) {
      state.messages.push({
        id: `${action.payload.message} - ${state.messages.length + 1}`,
        time: action.payload.time,
        text: action.payload.message,
        owner: Math.round(Math.random())
      })
    }
  }
})

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer