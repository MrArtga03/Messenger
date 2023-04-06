import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './chatSlice'
import messageSlice from './messageSlice'
import chatItemVariables from './chatItemVariables'

export default configureStore({
  reducer: {
    chats: chatReducer,
    messages: messageSlice,
    variables: chatItemVariables
  }
})