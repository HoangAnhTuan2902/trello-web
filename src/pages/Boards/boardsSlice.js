import { createSlice } from '@reduxjs/toolkit'

const boardsSlice = createSlice({
  name: 'boardsSlice',
  initialState: {
    workSpaceDetails: {},
    workspaces: [],
    board: [],
    recentlyBoards: [],
  },
  reducers: {
    setRecentlyBoards: (state, action) => {
      state.recentlyBoards = action.payload
    },
    setBoard: (state, action) => {
      state.board = action.payload
    },
    addBoard: (state, action) => {
      state.board.push(action.payload)
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

export const { setBoard, addBoard, setWorkSpaces, setWorkSpaceDetails, addWorkSpace, setRecentlyBoards } =
  boardsSlice.actions
export default boardsSlice.reducer
