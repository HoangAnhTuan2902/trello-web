import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import LightModeIcon from '@mui/icons-material/LightMode';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useColorScheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function ModeSelect() {
	const handleChange = (event) => {
		setMode(event.target.value);
	};

	const { mode, setMode } = useColorScheme();

	return (
		<FormControl
			sx={{ m: 1, minWidth: 120 }}
			size='small'>
			<InputLabel id='label-select-dark-light-mode'>Mode</InputLabel>
			<Select
				labelId='label-select-dark-light-mode'
				id='select-dark-light-mode'
				value={mode}
				label='mode'
				onChange={handleChange}>
				<MenuItem value='light'>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
							justifyContent: 'flex-start',
						}}>
						<LightModeIcon fontSize='16' />
						Light
					</div>
				</MenuItem>
				<MenuItem value='dark'>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
							justifyContent: 'flex-start',
						}}>
						<DarkModeIcon fontSize='16' />
						Dark
					</div>
				</MenuItem>
				<MenuItem value='system'>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
							justifyContent: 'flex-start',
						}}>
						<SettingsBrightnessIcon fontSize='16' />
						System
					</div>
				</MenuItem>
			</Select>
		</FormControl>
	);
}

function App() {
	return (
		<Container
			disableGutters
			maxWidth={false}
			sx={{ height: '100vh' }}>
			<Box
				sx={{
					backgroundColor: 'primary.light',
					width: '100%',
					height: (theme) => theme.trello.appBarHeight,
					display: 'flex',
					alignItems: 'center',
				}}>
				<ModeSelect />
			</Box>
			<Box
				sx={{
					backgroundColor: 'primary.dark',
					width: '100%',
					height: (theme) => theme.trello.boardBarHeight,
					display: 'flex',
					alignItems: 'center',
				}}>
				Board Bar
			</Box>
			<Box
				sx={{
					width: '100%',
					backgroundColor: 'primary.light',
					display: 'flex',
					alignItems: 'center',
					height: (theme) =>
						`calc(100vh - (${theme.trello.appBarHeight}px + ${theme.trello.boardBarHeight}px))`,
				}}>
				Board Content
			</Box>
		</Container>
	);
}

export default App;
