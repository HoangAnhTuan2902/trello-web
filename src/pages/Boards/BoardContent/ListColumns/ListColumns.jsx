import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Box from '@mui/material/Box';
import Column from './Column/Column';
import { Button } from '@mui/material';

import {
	SortableContext,
	horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

function ListColumns({ columns }) {
	/** SortableContext yêu cầu item là 1 mảng để có thể áp dụng animation */
	return (
		<SortableContext
			items={columns?.map((column) => column._id)} // Adjusted to pass item IDs
			strategy={horizontalListSortingStrategy}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'flex-start',
					overflowX: 'auto',
					overflowY: 'hidden',
					bgcolor: 'inherit',
					width: '100%',
					height: '100%',
					'&::-webkit-scrollbar': {
						height: '8px',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: '#888',
						borderRadius: '4px',
					},
					'&::-webkit-scrollbar-thumb:hover': {
						backgroundColor: '#555',
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
		</SortableContext>
	);
}

export default ListColumns;
