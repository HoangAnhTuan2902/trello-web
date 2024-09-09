// import { cyan, deepOrange, orange, teal } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const APP_BAR_HEIGHT = 58;
const BOARD_BAR_HEIGHT = 60;
const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTER_HEIGHT = '56px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - (${APP_BAR_HEIGHT}px + ${BOARD_BAR_HEIGHT}px))`;

// Create a theme instance.
const theme = extendTheme({
	trello: {
		appBarHeight: APP_BAR_HEIGHT,
		boardBarHeight: BOARD_BAR_HEIGHT,
		boardContentHeight: BOARD_CONTENT_HEIGHT,
		columnHeaderHeight: COLUMN_HEADER_HEIGHT,
		columnFooterHeight: COLUMN_FOOTER_HEIGHT,
	},
	font: {
		logoFont: 'Playwrite CU, cursive',
	},
	// colorSchemes: {
	// 	light: {
	// 		palette: {
	// 			primary: teal,
	// 			secondary: deepOrange,
	// 		},
	// 	},
	// 	dark: {
	// 		palette: {
	// 			primary: cyan,
	// 			secondary: orange,
	// 		},
	// 	},
	// },
	components: {
		// Name of the component
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					'*::-webkit-scrollbar': { width: 6, height: 6 },
					'*::-webkit-scrollbar-thumb': {
						backgroundColor: '#95afc0',
						borderRadius: 6,
					},
					'*::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bdc3c7' },
				},
			},
		},
		MuiButton: {
			styleOverrides: { root: { textTransform: 'none', borderWidth: '0.5px' } },
		},
		MuiInputLabel: { styleOverrides: { root: { fontSize: '0.875rem' } } },
		MuiTypography: {
			styleOverrides: {
				root: {
					'&.MuiTypography-body1': { fontSize: '0.875rem' },
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					fontSize: '0.875rem',
					'& .MuiOutlinedInput-notchedOutline': { borderWidth: '.5px' },
					'&:hover .MuiOutlinedInput-notchedOutline': { borderWidth: '2px' },
					'&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
						borderWidth: '2px',
					},
				},
			},
		},
	},
});

export default theme;
