//Boards list

import Container from '@mui/material/Container';

import { Outlet, useParams } from 'react-router-dom';

function Boards() {
	const params = useParams();

	return (
		<Container
			disableGutters
			maxWidth={false}
			sx={{ height: (theme) => `calc(100vh - ${theme.trello.appBarHeight})` }}>
			{!params.boardId ? <p>Boards list</p> : <Outlet />}
		</Container>
	);
}

export default Boards;
