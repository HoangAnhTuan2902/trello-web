import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchWorkSpacesDetails } from '~/apis'

import { ReactComponent as LockIcon } from '~/assets/lock.svg'

import { useDispatch, useSelector } from 'react-redux'
import Column from '~/components/Column'
import { setWorkSpaceDetails } from '~/pages/Boards/boardsSlice'

function WorkSpace() {
  const params = useParams()

  const dispatch = useDispatch()

  const workSpaceDetails = useSelector((state) => state.boardsSlice.workSpaceDetails)

  useEffect(() => {
    const getWorkSpaceDetail = async () => {
      const res = await fetchWorkSpacesDetails(params.workspaceId)

      dispatch(setWorkSpaceDetails(res))
    }
    getWorkSpaceDetail()
  }, [dispatch, params.workspaceId])

  return (
    <Box>
      <Box m={6}>
        <Stack sx={{ justifyContent: 'flex-start', flexDirection: 'row', gap: 1 }}>
          <Avatar sx={{ width: '60px', height: '60px' }} variant="rounded" src={workSpaceDetails?.avatar}>
            {workSpaceDetails?.title?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6">{workSpaceDetails.title}</Typography>
            <Stack direction={'row'} alignItems={'center'} gap={'3px'}>
              <SvgIcon fontSize="" inheritViewBox component={LockIcon} sx={{ fontSize: '15px' }} />
              <Typography>{workSpaceDetails.type}</Typography>
            </Stack>
          </Box>
        </Stack>
        <Typography color="#44546f" variant="inherit" fontSize={12}>
          {workSpaceDetails.description}
        </Typography>
      </Box>
      <Divider />

      <Stack mt={2.5} ml={2} direction={'row'} gap={1}>
        <PersonOutlineIcon />
        <Typography fontSize={17} fontWeight={700} variant="inherit">
          Your Boards
        </Typography>
      </Stack>
      <Box m={1}>
        <Column data={workSpaceDetails.boards} />
      </Box>
    </Box>
  )
}

export default WorkSpace
