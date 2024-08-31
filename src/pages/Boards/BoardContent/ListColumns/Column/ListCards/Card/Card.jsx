import Typography from '@mui/material/Typography';
import { Card as MuiCard } from '@mui/material';
import CardContent from '@mui/material/CardContent';

import GroupIcon from '@mui/icons-material/Group';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CommentIcon from '@mui/icons-material/Comment';
import CardMedia from '@mui/material/CardMedia';

function Card({ tempraryHideMedia }) {
	if (tempraryHideMedia) {
		return (
			<MuiCard
				sx={{
					cursor: 'pointer',
					boxShadow: '0 0 3px rgba(0,0,0,0.2)',
					overflow: 'unset',
				}}>
				<CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
					<Typography>TuanDev MERN Stack</Typography>
				</CardContent>
			</MuiCard>
		);
	}
	return (
		<MuiCard
			sx={{
				cursor: 'pointer',
				boxShadow: '0 0 3px rgba(0,0,0,0.2)',
				overflow: 'unset',
			}}>
			<CardMedia
				sx={{ height: 140 }}
				image='https://res.cloudinary.com/dmjafhfiu/image/upload/v1723908223/eg3zykskafjptqhxti93.webp'
				title='green iguana'
			/>
			<CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
				<Typography>TuanDev MERN Stack</Typography>
			</CardContent>
			<CardActions sx={{ p: '0 4px 8px 4px' }}>
				<Button
					startIcon={<GroupIcon />}
					size='small'>
					20
				</Button>
				<Button
					startIcon={<AttachmentIcon />}
					size='small'>
					20
				</Button>
				<Button
					startIcon={<CommentIcon />}
					size='small'>
					20
				</Button>
			</CardActions>
		</MuiCard>
	);
}

export default Card;
