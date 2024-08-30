import { cyan, deepOrange, orange, teal } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = extendTheme({
	trello: {
		appBarHeight: 58,
		boardBarHeight: 60,
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
	components: {
		// Name of the component
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					'*::-webkit-scrollbar': {
						width: 4,
						height: 4,
					},
					'*::-webkit-scrollbar-thumb': {
						backgroundColor: '#7f8c8d',
						borderRadius: 2,
					},
					'*::-webkit-scrollbar-thumb:hover': {
						backgroundColor: '#bdc3c7',
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				// Name of the slot
				root: {
					// Some CSS
					textTransform: 'none',
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				// Name of the slot
				root: ({ theme }) => ({
					color: theme.palette.primary.main,
					fontSize: '0.875rem',
				}),
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: ({ theme }) => ({
					color: theme.palette.primary.main,
					fontSize: '0.875rem',
					'.MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.primary.light,
					},
					'&:hover': {
						'.MuiOutlinedInput-notchedOutline': {
							borderColor: theme.palette.primary.main,
						},
					},
					'&.Mui-focused': {
						'.MuiOutlinedInput-notchedOutline': {
							borderWidth: '1px',
						},
					},
				}),
			},
		},
	},
});

export default theme;
