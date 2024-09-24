import { ExpandLess, ExpandMore } from '@mui/icons-material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import SvgIcon from '@mui/material/SvgIcon'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { fetchFullWorkSpacesDetailsAPI } from '~/apis'
import { ReactComponent as HomeIcon } from '~/assets/home.svg'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import { ReactComponent as TrelloSubIcon } from '~/assets/trello_sub.svg'
import { setWorkSpaces } from './boardsSlice'

function Boards() {
  const [view, setView] = useState('list')
  const [open, setOpen] = useState({})

  const dispatch = useDispatch()
  const workspaces = useSelector((state) => state.boardsSlice.workspaces)
  const user = useSelector((state) => state.user.user)
  const userId = user?._id

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return // Kiểm tra nếu không có userId thì không gọi API

      try {
        const res = await fetchFullWorkSpacesDetailsAPI(userId)

        if (res) {
          dispatch(setWorkSpaces(res))
        }
      } catch (error) {
        // console.error("Error fetching workspaces details:", error);
      }
    }

    fetchData()
  }, [dispatch, userId])

  const handleClick = (key) => {
    setOpen((prevState) => ({
      ...prevState,
      [key]: Boolean(!prevState[key]),
    }))
  }

  const handleChange = (event, nextView) => {
    setView(nextView)
  }

  const toggleButtonSx = {
    border: 'none',
    textTransform: 'none',
    gap: 0.8,
    justifyContent: 'flex-start',
    borderRadius: '10px !important',
    height: '36px',
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        mt: 4,
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight}px)`,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1d2125' : 'transparent'),
      }}
    >
      <Container disableGutters maxWidth={'lg'}>
        <Grid container spacing={4}>
          <Grid item lg={3}>
            <ToggleButtonGroup
              sx={{ gap: 1, my: 1 }}
              orientation="vertical"
              value={view}
              exclusive
              onChange={handleChange}
              fullWidth
            >
              <ToggleButton
                color="primary"
                component={Link}
                to={'list-workspaces'}
                fullWidth
                sx={toggleButtonSx}
                value="list"
              >
                <SvgIcon fontSize="" component={TrelloIcon} inheritViewBox />
                Board
              </ToggleButton>
              <ToggleButton
                color="primary"
                component={Link}
                to={'template'}
                fullWidth
                sx={toggleButtonSx}
                value="module"
              >
                <SvgIcon fontSize="" component={TrelloSubIcon} inheritViewBox />
                Template
              </ToggleButton>
              <ToggleButton color="primary" component={Link} to={'home'} fullWidth sx={toggleButtonSx} value="quit">
                <SvgIcon fontSize="" component={HomeIcon} inheritViewBox />
                Home Page
              </ToggleButton>
            </ToggleButtonGroup>
            <Divider />
            <Typography margin={1}>workspaces</Typography>
            <Box sx={{ my: 1 }}>
              {workspaces &&
                workspaces.length > 0 &&
                workspaces?.map((workspace, index) => (
                  <List
                    key={workspace?._id}
                    sx={{ width: '100%', maxWidth: 360 }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ToggleButton
                      selected={open[index] ? true : false}
                      onClick={() => handleClick(index)}
                      sx={toggleButtonSx}
                      value={index}
                      fullWidth
                    >
                      <Avatar src={workspace?.avatar} sx={{ width: '26px', height: '26px' }} variant="rounded">
                        <Typography variant="h6" sx={{ fontSize: '16px' }}>
                          {workspace.title.charAt(0)}
                        </Typography>
                      </Avatar>
                      <Typography sx={{ mr: 'auto' }}>{workspace.title}</Typography>
                      {open[index] ? <ExpandLess /> : <ExpandMore />}
                    </ToggleButton>
                    <Collapse in={open[index]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ToggleButtonGroup
                          sx={{ gap: 1, my: 1, pl: '20px' }}
                          orientation="vertical"
                          value={view}
                          exclusive
                          onChange={handleChange}
                          fullWidth
                        >
                          <ToggleButton
                            component={Link}
                            to={`${workspace?._id}`} // Đường dẫn mà bạn muốn chuyển hướng tới
                            state={{ workspace }} // Dữ liệu kèm theo
                            color="primary"
                            fullWidth
                            sx={toggleButtonSx}
                            value={`${workspace?._id} - 1`}
                          >
                            <SvgIcon fontSize="" component={TrelloIcon} inheritViewBox />
                            Board
                          </ToggleButton>
                          <ToggleButton color="primary" fullWidth sx={toggleButtonSx} value={`${workspace?._id} - 2`}>
                            <SvgIcon fontSize="" component={HomeIcon} inheritViewBox />
                            Template
                          </ToggleButton>
                          <ToggleButton color="primary" fullWidth sx={toggleButtonSx} value={`${workspace?._id} - 3`}>
                            <SvgIcon fontSize="" component={HomeIcon} inheritViewBox />
                            Home Page
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </List>
                    </Collapse>
                  </List>
                ))}
            </Box>
          </Grid>
          <Grid item lg={9}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}

export default Boards
