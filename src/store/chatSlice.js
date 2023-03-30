import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chats',
  initialState: {
    chats: []
  },
  reducers: {
    onAddChat(state, action) {
      console.log(state)
      console.log(action)

      state.chats.push({ 
        id: `${{title: action.payload}} - ${state.chats.length + 1}`, 
        title: action.payload.title,
        description: action.payload.description
      })
    },
    clickDelete(state, action) {
      state.chats = state.chats.filter(chat => chat.id !== action.payload.id)
    }
  }
})

export const {onAddChat, clickDelete} = chatSlice.actions

export default chatSlice.reducer