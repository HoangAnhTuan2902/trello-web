/* eslint-disable no-restricted-imports */
//Boards list

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { Outlet, useParams } from 'react-router-dom';

function Boards() {
  const params = useParams();

  return (
    <Container disableGutters maxWidth={false} sx={{ height: (theme) => `calc(100vh - ${theme.trello.appBarHeight})` }}>
      {!params.boardId ? (
        <Box>
          <Grid container>
            <Grid item xs={2}></Grid>
          </Grid>
          Boards list
        </Box>
      ) : (
        <Outlet />
      )}
    </Container>
  );
}

export default Boards;
