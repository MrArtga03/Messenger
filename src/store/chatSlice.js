import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chats',
  initialState: {
    chats: []
  },
  reducers: {
    onAddChat(state, action) {
      state.chats.push({ 
        id: `${action.payload.title} - ${state.chats.length + 1}`, 
        title: action.payload.title,
        description: action.payload.description,
        lastMessage: action.payload.lastMessage,
        lastTime: action.payload.lastTime
      })
    },

    addLastMessageToChat(state, action) {
      state.chats = state.chats.map((chat) => {
        if(chat.id === action.payload.id) {
          return {
            ...chat,
            lastMessage: action.payload.lastMessage,
            lastTime: action.payload.lastTime
          }
        }
        return chat
      })
    },

    clickDelete(state, action) {
      state.chats = state.chats.filter(chat => chat.id !== action.payload.id)
    }
  }
})

export const {onAddChat, addLastMessageToChat, clickDelete} = chatSlice.actions

export default chatSlice.reducer