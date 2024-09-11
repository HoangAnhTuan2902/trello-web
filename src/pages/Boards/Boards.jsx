//Boards list

import Container from '@mui/material/Container';

import { Outlet, useParams } from 'react-router-dom';
import useAuth from '~/customHook/useAuth';

function Boards() {
	const params = useParams();
	const { isAuthenticated, user } = useAuth();

	return (
		<Container
			disableGutters
			maxWidth={false}
			sx={{ height: '100vh' }}>
			{!params.boardId ? <p>Boards list</p> : <Outlet />}
		</Container>
	);
}

export default Boards;
