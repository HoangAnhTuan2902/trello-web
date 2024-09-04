import AppsIcon from '@mui/icons-material/Apps';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg';

import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import ModeSelect from '~/components/ModeSelect/ModeSelect';
import Profliles from './Menus/Profliles';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Templates from './Menus/Templates';
import Workspaces from './Menus/Workspaces';

import SearchIcon from '@mui/icons-material/Search';

function AppBar() {
	const [searchValue, setSearchValue] = useState('');

	return (
		<Box
			sx={{
				width: '100%',
				height: (theme) => theme.trello.appBarHeight,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: 2,
				paddingX: 2,
				overflowX: 'auto',
				bgcolor: (theme) =>
					theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0',
			}}>
			<Box>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<AppsIcon sx={{ color: 'white' }} />
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<SvgIcon
							fontSize='small'
							component={TrelloIcon}
							inheritViewBox
							sx={{ color: 'white' }}
						/>
						<Typography
							variant='span'
							sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
							trello
						</Typography>
					</Box>
					<Box
						sx={{
							display: { xs: 'none', md: 'flex' },
							gap: 1,
						}}>
						<Workspaces />
						<Recent />
						<Starred />
						<Templates />
						<Button
							sx={{
								color: 'white',
								'&:hover': {
									borderColor: 'white',
								},
							}}
							startIcon={<LibraryAddIcon />}
							variant='outlined'>
							Create
						</Button>
					</Box>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<TextField
					id='outlined-basic'
					label='Search...'
					variant='outlined'
					size='small'
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SearchIcon sx={{ color: 'white' }} />
							</InputAdornment>
						),

						endAdornment: searchValue && (
							<InputAdornment position='end'>
								<CloseIcon
									onClick={() => setSearchValue('')}
									fontSize='small'
									sx={{ color: 'white', cursor: 'pointer' }}
								/>
							</InputAdornment>
						),
					}}
					sx={{
						minWidth: 120,
						maxWidth: 180,
						'& label': { color: 'white' },
						'& input': { color: 'white' },
						'& label.Mui-focused': { color: 'white' },
						'& .MuiOutlinedInput-root': {
							'& fieldset': { borderColor: 'white' },
							'&:hover fieldset': { borderColor: 'white' },
							'&.Mui-focused fieldset': { borderColor: 'white' },
						},
					}}
				/>
				<ModeSelect />
				<Tooltip title='Notifications'>
					<Badge
						color='error'
						variant='dot'
						sx={{ cursor: 'pointer' }}>
						<NotificationsNoneIcon sx={{ color: 'white' }} />
					</Badge>
				</Tooltip>
				<Tooltip
					title='Notifications'
					sx={{ cursor: 'pointer' }}>
					<HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
				</Tooltip>
				<Profliles />
			</Box>
		</Box>
	);
}

export default AppBar;
