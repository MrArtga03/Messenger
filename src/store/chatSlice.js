import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chats',
  initialState: {
    chatsList: [],
    messagesList: [],
    text: '',
    time: '',
  },
  reducers: {
    onAddChat(state, action) {
      state.chatsList.push({
        id: `${action.payload.title}-${state.chatsList.length + 1}`,
        title: action.payload.title,
        description: action.payload.description,
        messages: [],
      })
    },

    addMessage(state, action) {
      state.chatsList = state.chatsList.map(chat => {
        if (chat.id === action.payload.chatId) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              { text: action.payload.text, time: action.payload.time },
            ],
          }
        }

        return chat
      })
    },

    clickDelete(state, action) {
      state.chatsList = state.chatsList.filter(
        chat => chat.id !== action.payload.id,
      )
    },
  },
})

export const { onAddChat, addMessage, clickDelete } = chatSlice.actions

export default chatSlice.reducer
