import { createSlice } from '@reduxjs/toolkit'

const boardsSlice = createSlice({
  name: 'boardsSlice',
  initialState: {
    boards: [],
    board: [],
  },
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload
    },
    setBoard: (state, action) => {
      state.board = action.payload
    },
    addBoard: (state, action) => {
      state.boards.push(action.payload)
    },
  },
})

export const { setBoards, setBoard, addBoard } = boardsSlice.actions
export default boardsSlice.reducer
