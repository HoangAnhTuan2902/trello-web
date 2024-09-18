import { createSlice } from '@reduxjs/toolkit'

const boardsSlice = createSlice({
  name: 'boardsSlice',
  initialState: {
    workspaces: [],
    boards: [],
    board: [],
    workSpaceDetails: {},
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
    setWorkSpaces: (state, action) => {
      state.workspaces = action.payload
    },
    setWorkSpaceDetails: (state, action) => {
      state.workSpaceDetails = action.payload
    },
    addWorkSpace: (state, action) => {
      state.workspaces.push(action.payload)
    },
  },
})

export const { setBoards, setBoard, addBoard, setWorkSpaces, setWorkSpaceDetails, addWorkSpace } = boardsSlice.actions
export default boardsSlice.reducer
