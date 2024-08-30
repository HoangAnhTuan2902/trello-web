import Box from '@mui/material/Box';
import AppsIcon from '@mui/icons-material/Apps';
import SvgIcon from '@mui/material/SvgIcon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg';
import TextField from '@mui/material/TextField';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Badge from '@mui/material/Badge';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import ModeSelect from '~/components/ModeSelect';
import Workspaces from './Menus/Workspaces';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Templates from './Menus/Templates';
import Tooltip from '@mui/material/Tooltip';
import Profliles from './Menus/Profliles';

function AppBar() {
	return (
		<Box
			px={2}
			sx={{
				width: '100%',
				height: (theme) => theme.trello.appBarHeight,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}>
			<Box>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<AppsIcon sx={{ color: 'primary.main' }} />
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<SvgIcon
							fontSize='small'
							component={TrelloIcon}
							inheritViewBox
							sx={{ color: 'primary.main' }}
						/>
						<Typography
							variant='span'
							sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>
							trello
						</Typography>
					</Box>
					<Workspaces />
					<Recent />
					<Starred />
					<Templates />

					<Button variant='outlined'>Create</Button>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<TextField
					id='outlined-basic'
					label='Search...'
					variant='outlined'
					size='small'
				/>
				<ModeSelect />
				<Tooltip title='Notifications'>
					<Badge
						color='secondary'
						variant='dot'
						sx={{ cursor: 'pointer' }}>
						<NotificationsNoneIcon sx={{ color: 'primary.main' }} />
					</Badge>
				</Tooltip>
				<Tooltip
					title='Notifications'
					sx={{ cursor: 'pointer' }}>
					<HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.main' }} />
				</Tooltip>
				<Profliles />
			</Box>
		</Box>
	);
}

export default AppBar;
