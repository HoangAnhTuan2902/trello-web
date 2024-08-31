import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Box from '@mui/material/Box';
import Column from './Column/Column';
import { Button } from '@mui/material';

function ListColumns({ columns }) {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'flex-start',
				overflowX: 'auto',
				overflowY: 'hidden',
				bgcolor: 'inherit',
				width: '100%',
				height: '100%',
				'&::-webkit-scrollbar-track': {
					m: 2,
				},
			}}>
			{/* Column */}
			{columns?.map((column) => (
				<Column
					column={column}
					key={column._id}
				/>
			))}

			{/* Box add new column */}
			<Box
				sx={{
					minWidth: '200px',
					maxWidth: '200px',
					mx: 2,
					borderRadius: '6px',
					height: 'fit-content',
					bgcolor: '#ffffff3d',
				}}>
				<Button
					sx={{
						color: 'white',
						width: '100%',
						justifyContent: 'flex-start',
						pl: 2.5,
						py: 1,
					}}
					startIcon={<NoteAddIcon />}>
					Add New Column
				</Button>
			</Box>
		</Box>
	);
}

export default ListColumns;
