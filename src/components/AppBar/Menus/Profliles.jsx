import { useState } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';

function Profliles() {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box>
			<Tooltip title='Account settings'>
				<IconButton
					onClick={handleClick}
					size='small'
					sx={{ padding: 0 }}
					aria-controls={open ? 'basic-menu-profliles' : undefined}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}>
					<Avatar
						sx={{ width: 30, height: 30 }}
						alt='TuanDev'
						src='https://res.cloudinary.com/dmjafhfiu/image/upload/v1725001471/z4332691207128_8766e90860547379f456c2ab9d9a7585_vb6ycu.jpg'
					/>
				</IconButton>
			</Tooltip>
			<Menu
				id='basic-menu-profliles'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button-profliles',
				}}>
				<MenuItem onClick={handleClose}>
					<Avatar sx={{ width: 28, height: 28, marginRight: 2 }} /> Profile
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Avatar sx={{ width: 28, height: 28, marginRight: 2 }} /> My account
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<PersonAdd fontSize='small' />
					</ListItemIcon>
					Add another account
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<Settings fontSize='small' />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<Logout fontSize='small' />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</Box>
	);
}

export default Profliles;
