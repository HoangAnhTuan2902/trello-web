import Box from '@mui/material/Box';

function BoardContent() {
	return (
		<Box
			sx={{
				width: '100%',
				backgroundColor: 'primary.main',
				display: 'flex',
				alignItems: 'center',
				height: (theme) => `calc(100vh - (${theme.trello.appBarHeight}px + ${theme.trello.boardBarHeight}px))`,
			}}>
			Board Content
		</Box>
	);
}

export default BoardContent;
