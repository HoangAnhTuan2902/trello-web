import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { fetchFullBoardAPI } from '~/apis'

function WorkSpace() {
  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(true) // Thêm state loading để theo dõi quá trình tải dữ liệu

  const typographySx = { fontSize: 14, fontWeight: '600', color: '#fff' }
  const cardSx = {
    maxWidth: '180px',
    minWidth: '180px',
    minHeight: '90px',
    cursor: 'pointer',
    textDecoration: 'none',
    // backgroundImage: 'url("https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg")',
    backgroundSize: 'cover', // Ensures the background image covers the card
    '&:hover': {
      bgcolor: (theme) => (theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : '#7f8c8d'),
      filter: 'brightness(80%)',
    },
  }

  useEffect(() => {
    const getFullBoard = async () => {
      const result = await fetchFullBoardAPI()
      setBoards(result)
      setLoading(false)
    }
    getFullBoard()
  }, [])

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
          : boards.length > 0 &&
            boards?.map((board) => (
              <Card key={board._id} sx={cardSx} component={Link} to={`/root/boards/${board._id}`}>
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
