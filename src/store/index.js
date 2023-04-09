import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './chatSlice'
import messageSlice from './messageSlice'

export default configureStore({
  reducer: {
    chats: chatReducer,
    messages: messageSlice
  }
})