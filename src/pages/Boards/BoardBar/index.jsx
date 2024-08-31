import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import Chip from '@mui/material/Chip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const MENU_STYLES = {
	color: 'primary.main',
	bgcolor: 'white',
	border: 'none',
	paddingX: '5px',
	borderRadius: '4px',
	'& .MuiSvgIcon-root': {
		color: 'primary.main',
	},
	'&:hover': {
		bgcolor: 'primary.100',
	},
};

function BoardBar() {
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
				borderTop: '1px solid #00bfa5',
				paddingX: 2,
			}}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<Chip
					sx={MENU_STYLES}
					icon={<DashboardIcon />}
					label='Tuan Dev MERN Stack'
					clickable
				/>
				<Chip
					sx={MENU_STYLES}
					icon={<VpnLockIcon />}
					label='Public/Private Workspaces'
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
					variant='outlined'>
					Invite
				</Button>
				<AvatarGroup
					sx={{
						'& .MuiAvatar-root': {
							width: 34,
							height: 34,
							fontSize: 14,
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
