/* eslint-disable no-restricted-imports */
// Boards list

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'

import { ReactComponent as HomeIcon } from '~/assets/home.svg'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'

import { SvgIcon, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

function Boards() {
  const [view, setView] = useState('list')

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
              sx={{ gap: 1 }}
              orientation="vertical"
              value={view}
              exclusive
              onChange={handleChange}
              fullWidth
            >
              <ToggleButton
                color="primary"
                component={Link}
                to={'workspace'}
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
                <SvgIcon fontSize="" component={TrelloIcon} inheritViewBox />
                Template
              </ToggleButton>
              <ToggleButton color="primary" component={Link} to={'home'} fullWidth sx={toggleButtonSx} value="quit">
                <SvgIcon fontSize="" component={HomeIcon} inheritViewBox />
                Home Page
              </ToggleButton>
            </ToggleButtonGroup>
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
