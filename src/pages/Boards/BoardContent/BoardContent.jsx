import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';

function BoardContent() {
	return (
		<Box
			sx={{
				p: '10px 0',
				width: '100%',
				alignItems: 'flex-start',
				bgcolor: (theme) =>
					theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
				height: (theme) => theme.trello.boardContentHeight,
			}}>
			<ListColumns />
		</Box>
	);
}

export default BoardContent;
