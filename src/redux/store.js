// redux: state management tool
// redux-thunk: middleware for handling async actions

import { configureStore } from '@reduxjs/toolkit';
import userSlice from '~/customHook/userSlice';

const store = configureStore({
	reducer: {
		user: userSlice,
	},
});

export default store;
