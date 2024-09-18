import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { Link } from 'react-router-dom'

function Column({ data, loading }) {
  const typographySx = { fontSize: 14, fontWeight: '600', color: '#fff' }
  const cardSx = {
    maxWidth: '180px',
    minWidth: '180px',
    minHeight: '90px',
    cursor: 'pointer',
    textDecoration: 'none',
    backgroundSize: 'cover',
    '&:hover': {
      bgcolor: (theme) => (theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : '#7f8c8d'),
      filter: 'brightness(80%)',
    },
  }
  return (
    <Stack sx={{ mt: 2, flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
      {loading
        ? [...Array(4)].map((_, index) => (
            <Skeleton key={index} sx={cardSx} variant="rounded" animation="wave"></Skeleton>
          ))
        : Array.isArray(data) &&
          data.length > 0 &&
          data?.map((board) => (
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
  )
}

export default Column
