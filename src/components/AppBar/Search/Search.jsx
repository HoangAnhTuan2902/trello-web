import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'

import { fetchFullBoardAPI } from '~/apis'
import './Search.scss'

const cardSx = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  boxShadow: '0',
  cursor: 'pointer',
  transition: 'all 0.1s linear',
  textDecoration: 'none',
  '&:hover': {
    bgcolor: 'rgba(0, 0, 0, 0.1)',
  },
}

function Search() {
  const [boards, setBoards] = useState([]) // Thay null thành mảng rỗng

  useEffect(() => {
    const getAllBoards = async () => {
      const res = await fetchFullBoardAPI()
      if (res) {
        setBoards(res)
      }
    }

    getAllBoards()
  }, [])

  // Kiểm tra xem boards có dữ liệu chưa
  const options = boards.map((board) => ({
    value: board.title,
    label: (
      <Card sx={cardSx} component={Link} to={`/root/boards/${board._id}`}>
        <CardMedia
          component="img"
          sx={{ width: 30, height: 30, ml: 2, borderRadius: '2px' }}
          image={board.bgImage || ''}
          alt={board.title}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', m: '4px 4px 4px 8px' }}>
          <CardContent sx={{ flex: '1 0 auto', p: 0, '&:last-child': { paddingBottom: 0 } }}>
            <Typography fontSize={'14px'} lineHeight={'1.2'} component="div" variant="h6">
              {board.title}
            </Typography>
            <Typography fontSize={'12px'} lineHeight={'1.2'} variant="subtitle1" color="text.secondary">
              {board.description}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    ),
  }))

  return (
    <div className="search-container">
      <Select
        className="search"
        classNamePrefix="search-item"
        options={options}
        menuPortalTarget={document.body} // Gắn dropdown vào body để không bị ẩn
        menuPosition="fixed" // Cố định vị trí của dropdown khi cuộn trang
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Đặt z-index cao
        }}
        placeholder="Search..."
        isClearable
      />
    </div>
  )
}

export default Search
