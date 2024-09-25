import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecentViewedAPI } from '~/apis'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import Board from '~/components/Board'
import { setRecentlyBoards } from '~/pages/Boards/boardsSlice'

function ListWorkSpace() {
  const [loading, setLoading] = useState(true) // Initially true, since we're loading data
  const dispatch = useDispatch()
  const recentlyBoards = useSelector((state) => state.boardsSlice.recentlyBoards)
  const workspaces = useSelector((state) => state.boardsSlice.workspaces)

  const user = useSelector((state) => state.user.user)
  const userId = user?._id

  useEffect(() => {
    const getRecentlyBoards = async () => {
      if (!userId) return

      setLoading(true) // Set loading before making the API call
      try {
        const result = await getRecentViewedAPI(userId)
        dispatch(setRecentlyBoards(result))
      } finally {
        setLoading(false) // Set loading to false after API call
      }
    }

    getRecentlyBoards()
  }, [dispatch, userId])

  // Sorting the recently viewed boards by 'viewedAt'
  const sortRecentlyBoards = _.sortBy(recentlyBoards, ['viewedAt'])

  return (
    <Box sx={{ m: 1 }}>
      {/* Display Recently Viewed section */}
      {sortRecentlyBoards.length > 0 && (
        <Stack sx={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', gap: 1, mb: 2 }}>
          <AccessTimeIcon />
          <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: '600' }}>
            Recently viewed
          </Typography>
        </Stack>
      )}
      <Board data={sortRecentlyBoards} loading={loading} />

      {/* Display Workspaces */}
      <Box mt={8}>
        <Typography textTransform={'uppercase'} fontWeight={'700'} variant="h6">
          Your Workspaces
        </Typography>
        {workspaces.length > 0 ? (
          workspaces.map((workspace, index) => (
            <Box key={workspace._id} mt={index === 0 ? 2 : 7}>
              <Stack sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} gap={1}>
                  <Avatar sx={{ width: '32px', height: '32px' }} variant="rounded" src={workspace?.avatar}>
                    {workspace?.title?.charAt(0)}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: '700' }}>
                    {workspace.title}
                  </Typography>
                </Stack>
                <Chip icon={<TrelloIcon />} label="Board" sx={{ borderRadius: '4px' }} clickable />
              </Stack>
              <Board data={workspace.boards} />
            </Box>
          ))
        ) : (
          <Typography>You do not have a workspace yet</Typography>
        )}
      </Box>
    </Box>
  )
}

export default ListWorkSpace
