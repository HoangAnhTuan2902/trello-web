import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import LightModeIcon from '@mui/icons-material/LightMode';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

function ModeSelect() {
	const handleChange = (event) => {
		setMode(event.target.value);
	};

	const { mode, setMode } = useColorScheme();

	return (
		<FormControl size='small'>
			<InputLabel id='label-select-dark-light-mode'>Mode</InputLabel>
			<Select
				labelId='label-select-dark-light-mode'
				id='select-dark-light-mode'
				value={mode}
				label='mode'
				onChange={handleChange}>
				<MenuItem value='light'>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-start' }}>
						<LightModeIcon fontSize='16' />
						Light
					</Box>
				</MenuItem>
				<MenuItem value='dark'>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-start' }}>
						<DarkModeIcon fontSize='16' />
						Dark
					</Box>
				</MenuItem>
				<MenuItem value='system'>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-start' }}>
						<SettingsBrightnessIcon fontSize='16' />
						System
					</Box>
				</MenuItem>
			</Select>
		</FormControl>
	);
}
export default ModeSelect;
