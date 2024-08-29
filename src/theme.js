import { cyan, deepOrange, orange, teal } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = extendTheme({
	trello: {
		appBarHeight: 48,
		boardBarHeight: 58,
	},
	colorSchemes: {
		light: {
			palette: {
				primary: teal,
				secondary: deepOrange,
			},
		},
		dark: {
			palette: {
				primary: cyan,
				secondary: orange,
			},
		},
	},
});

export default theme;
