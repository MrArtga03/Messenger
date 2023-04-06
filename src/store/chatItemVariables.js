import { createSlice } from "@reduxjs/toolkit";

const chatItemVariables = createSlice({
  name: 'variables',
  initialState: {
    title: '',
    description: ''
  },

  reducers: {
    setTitle(state, action) {
      state.title = action.payload
    },

    setDescription(state, action) {
      state.description = action.payload
    },
  }
})

export const { setTitle, setDescription } = chatItemVariables.actions

export default chatItemVariables.reducer