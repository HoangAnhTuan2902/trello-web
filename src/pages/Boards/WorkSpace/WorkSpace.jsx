import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchFullBoardAPI } from '~/apis'
import { setBoards } from '~/pages/Boards/boardsSlice'

function WorkSpace() {
  // const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  const boards = useSelector((state) => state.boardsSlice.boards)
  console.log('boards', boards)

  useEffect(() => {
    const getFullBoard = async () => {
      const result = await fetchFullBoardAPI()
      dispatch(setBoards(result))
      setLoading(false)
    }
    getFullBoard()
  }, [dispatch])

  const typographySx = { fontSize: 14, fontWeight: '600', color: '#fff' }
  const cardSx = {
    maxWidth: '180px',
    minWidth: '180px',
    minHeight: '90px',
    cursor: 'pointer',
    textDecoration: 'none',

    backgroundSize: 'cover', // Ensures the background image covers the card
    '&:hover': {
      bgcolor: (theme) => (theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : '#7f8c8d'),
      filter: 'brightness(80%)',
    },
  }

  return (
    <Box>
      <Stack sx={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', gap: 1 }}>
        <AccessTimeIcon />
        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: '600' }}>
          Recently viewed
        </Typography>
      </Stack>
      <Stack sx={{ mt: 2, flexDirection: 'row', gap: 2.5, flexWrap: 'wrap' }}>
        {loading
          ? [...Array(4)].map((_, index) => (
              <Skeleton key={index} sx={cardSx} variant="rounded" animation="wave"></Skeleton>
            ))
          : Array.isArray(boards) &&
            boards.length > 0 &&
            boards?.map((board) => (
              <Card
                key={board._id}
                sx={{ ...cardSx, backgroundImage: `url(${board.bgImage})` }}
                component={Link}
                to={`/root/boards/${board._id}`}
              >
                <CardContent>
                  <Typography sx={typographySx} color="text.primary" gutterBottom>
                    {board.title}
                  </Typography>
                </CardContent>
              </Card>
            ))}
      </Stack>
    </Box>
  )
}

export default WorkSpace
