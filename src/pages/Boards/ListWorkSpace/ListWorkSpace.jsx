import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchFullBoardAPI } from '~/apis'
import Column from '~/components/Column'
import { setBoards } from '~/pages/Boards/boardsSlice'

function ListWorkSpace() {
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  const boards = useSelector((state) => state.boardsSlice.boards)

  useEffect(() => {
    const getFullBoard = async () => {
      const result = await fetchFullBoardAPI()
      dispatch(setBoards(result))
      setLoading(false)
    }
    getFullBoard()
  }, [dispatch])

  return (
    <Box>
      <Stack sx={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', gap: 1 }}>
        <AccessTimeIcon />
        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: '600' }}>
          Recently viewed
        </Typography>
      </Stack>
      <Column data={boards} loading={loading} />
    </Box>
  )
}

export default ListWorkSpace
