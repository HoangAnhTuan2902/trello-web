import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

import { capitalizeFirstLetter } from '~/utils/formatters';

const MENU_STYLES = {
	color: 'white',
	bgcolor: 'transparent',
	border: 'none',
	paddingX: '5px',
	borderRadius: '4px',
	'& .MuiSvgIcon-root': {
		color: 'white',
	},
	'&:hover': {
		bgcolor: 'primary.100',
	},
};

function BoardBar({ board }) {
	return (
		<Box
			sx={{
				width: '100%',
				height: (theme) => theme.trello.boardBarHeight,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: 2,
				overflowX: 'auto',
				bgcolor: (theme) =>
					theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
				paddingX: 2,
			}}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<Tooltip title={board?.description}>
					<Chip
						sx={MENU_STYLES}
						icon={<DashboardIcon />}
						label={board?.title}
						clickable
					/>
				</Tooltip>
				<Chip
					sx={MENU_STYLES}
					icon={<VpnLockIcon />}
					label={capitalizeFirstLetter(board?.type)}
					clickable
				/>
				<Chip
					sx={MENU_STYLES}
					icon={<AddToDriveIcon />}
					label='Add To Google Drive'
					clickable
				/>
				<Chip
					sx={MENU_STYLES}
					icon={<BoltIcon />}
					label='Automation'
					clickable
				/>
				<Chip
					sx={MENU_STYLES}
					icon={<FilterListIcon />}
					label='Filters'
					clickable
				/>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<Button
					startIcon={<PersonAddIcon />}
					variant='outlined'
					sx={{
						color: 'white',
						borderColor: 'white',
						'&:hover': {
							borderColor: 'white',
							boxShadow: '0 0 6px 1px #ecf0f1',
						},
					}}>
					Invite
				</Button>
				<AvatarGroup
					sx={{
						gap: 1.2,
						'& .MuiAvatar-root': {
							width: 34,
							height: 34,
							fontSize: 14,
							border: 'none',
							color: 'white',
							cursor: 'pointer',
							'&.first-of-type': {
								bgcolor: 'a4b0be',
							},
						},
					}}
					max={6}>
					<Tooltip title='Tuan Dev'>
						<Avatar
							alt='Tuan Dev'
							src='https://res.cloudinary.com/dmjafhfiu/image/upload/v1725001471/z4332691207128_8766e90860547379f456c2ab9d9a7585_vb6ycu.jpg'
						/>
					</Tooltip>
					<Tooltip title='Tuan Dev'>
						<Avatar
							alt='Tuan Dev'
							src='https://res.cloudinary.com/dmjafhfiu/image/upload/v1725001471/z4332691207128_8766e90860547379f456c2ab9d9a7585_vb6ycu.jpg'
						/>
					</Tooltip>
					<Tooltip title='Tuan Dev'>
						<Avatar
							alt='Tuan Dev'
							src='https://res.cloudinary.com/dmjafhfiu/image/upload/v1725001471/z4332691207128_8766e90860547379f456c2ab9d9a7585_vb6ycu.jpg'
						/>
					</Tooltip>
					<Tooltip title='Tuan Dev'>
						<Avatar
							alt='Tuan Dev'
							src='https://res.cloudinary.com/dmjafhfiu/image/upload/v1725001471/z4332691207128_8766e90860547379f456c2ab9d9a7585_vb6ycu.jpg'
						/>
					</Tooltip>
					<Tooltip title='Tuan Dev'>
						<Avatar
							alt='Tuan Dev'
							src='https://res.cloudinary.com/dmjafhfiu/image/upload/v1725001471/z4332691207128_8766e90860547379f456c2ab9d9a7585_vb6ycu.jpg'
						/>
					</Tooltip>
					<Tooltip title='Tuan Dev'>
						<Avatar
							alt='Tuan Dev'
							src='https://res.cloudinary.com/dmjafhfiu/image/upload/v1725001471/z4332691207128_8766e90860547379f456c2ab9d9a7585_vb6ycu.jpg'
						/>
					</Tooltip>
					<Tooltip title='Tuan Dev'>
						<Avatar
							alt='Tuan Dev'
							src='https://res.cloudinary.com/dmjafhfiu/image/upload/v1725001471/z4332691207128_8766e90860547379f456c2ab9d9a7585_vb6ycu.jpg'
						/>
					</Tooltip>
					<Tooltip title='Tuan Dev'>
						<Avatar
							alt='Tuan Dev'
							src='https://res.cloudinary.com/dmjafhfiu/image/upload/v1725001471/z4332691207128_8766e90860547379f456c2ab9d9a7585_vb6ycu.jpg'
						/>
					</Tooltip>
					<Tooltip title='Tuan Dev'>
						<Avatar
							alt='Tuan Dev'
							src='https://res.cloudinary.com/dmjafhfiu/image/upload/v1725001471/z4332691207128_8766e90860547379f456c2ab9d9a7585_vb6ycu.jpg'
						/>
					</Tooltip>
					<Tooltip title='Tuan Dev'>
						<Avatar
							alt='Tuan Dev'
							src='https://res.cloudinary.com/dmjafhfiu/image/upload/v1725001471/z4332691207128_8766e90860547379f456c2ab9d9a7585_vb6ycu.jpg'
						/>
					</Tooltip>
					<Tooltip title='Tuan Dev'>
						<Avatar
							alt='Tuan Dev'
							src='https://res.cloudinary.com/dmjafhfiu/image/upload/v1725001471/z4332691207128_8766e90860547379f456c2ab9d9a7585_vb6ycu.jpg'
						/>
					</Tooltip>
					<Tooltip title='Tuan Dev'>
						<Avatar
							alt='Tuan Dev'
							src='https://res.cloudinary.com/dmjafhfiu/image/upload/v1725001471/z4332691207128_8766e90860547379f456c2ab9d9a7585_vb6ycu.jpg'
						/>
					</Tooltip>
				</AvatarGroup>
			</Box>
		</Box>
	);
}

export default BoardBar;
