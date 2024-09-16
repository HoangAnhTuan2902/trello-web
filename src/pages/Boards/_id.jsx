// Board Details
import Container from '@mui/material/Container'

import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardDetailsAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { setBoard } from './boardsSlice'

function Board() {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const param = useParams()
  const dispatch = useDispatch()
  const board = useSelector((state) => state.boardsSlice.board)

  useEffect(() => {
    const loadBoardData = async () => {
      try {
        const board = await fetchBoardDetailsAPI(param.boardId)

        // Sắp xếp các cột theo `columnOrderIds`
        board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

        board.columns.forEach((column) => {
          if (isEmpty(column.cards)) {
            // Thêm placeholder nếu cột không có card
            column.cards = [generatePlaceholderCard(column)]
            column.cardOrderIds = [column.cards[0]._id]
          } else {
            // Sắp xếp các card theo `cardOrderIds`
            column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
          }
        })

        dispatch(setBoard(board))

        // Đặt loading timeout
        setIsLoading(false)
      } catch (error) {
        navigate('/user/login') // Redirect nếu xảy ra lỗi
      }
    }

    loadBoardData()

    // Cleanup setTimeout nếu component unmount
    return () => clearTimeout()
  }, [dispatch, navigate, param.boardId])

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight})`,
        backgroundImage: `url(${board.bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        objectFit: 'cover',
      }}
    >
      <BoardBar isLoading={isLoading} />
      <BoardContent isLoading={isLoading} />
    </Container>
  )
}

export default Board
