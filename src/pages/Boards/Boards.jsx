/* eslint-disable no-restricted-imports */
// Boards list

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as HomeIcon } from '~/assets/home.svg'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'

import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'

function Boards() {
  const params = useParams()
  const navigate = useNavigate()
  const [value, setValue] = useState(0)

  useEffect(() => {
    // Update the value based on the current path
    if (params.boardId) {
      switch (params.boardId) {
        case 'workspace':
          setValue(0)
          break
        case 'template':
          setValue(1)
          break
        case 'spam':
          setValue(2)
          break
        default:
          setValue(0)
      }
    }
  }, [params.boardId])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    switch (newValue) {
      case 0:
        navigate('workspace')
        break
      case 1:
        navigate('template')
        break
      case 2:
        navigate('spam')
        break
      default:
        break
    }
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight}px)`,
        mt: 4,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1d2125' : 'transparent'),
      }}
    >
      <Container disableGutters maxWidth={'lg'}>
        <Grid container spacing={4}>
          <Grid item lg={3}>
            <Box sx={{ width: '100%' }}>
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
                role="navigation"
                sx={{
                  '& .Mui-selected': {
                    bgcolor: (theme) => theme.palette.Button.inheritContainedHoverBg,
                    color: 'primary.dark',
                  },
                }}
              >
                <Tab
                  sx={{ borderRadius: 2, justifyContent: 'flex-start', minHeight: '40px' }}
                  icon={<TrelloIcon />}
                  iconPosition="start"
                  label="Board"
                />
                <Tab
                  sx={{ borderRadius: 2, justifyContent: 'flex-start', minHeight: '40px' }}
                  icon={<TrelloIcon />}
                  iconPosition="start"
                  label="Template"
                />
                <Tab
                  sx={{ borderRadius: 2, justifyContent: 'flex-start', minHeight: '40px' }}
                  icon={<HomeIcon />}
                  iconPosition="start"
                  label="Home Page"
                />
              </Tabs>
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
