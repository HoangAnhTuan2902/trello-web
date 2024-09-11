import axios from '~/apis/axiosConfig';
// import { API_ROOT } from '~/utils/constants';

/** Board */
export const fetchBoardDetailsAPI = async (boardId) => {
	const res = await axios.get(`/v1/boards/${boardId}`);
	return res;
};

export const updateBoardDetailsAPI = async (boardId, updateData) => {
	const res = await axios.put(`/v1/boards/${boardId}`, updateData);
	return res;
};

/** Column */
export const createNewColumnAPI = async (newColumnData) => {
	const res = await axios.post('/v1/columns', newColumnData);
	return res;
};

export const moveCardToDifferentColumnAPI = async (updateData) => {
	const res = await axios.put('/v1/boards/supports/moving_card', updateData);
	return res;
};

export const updateColumnDetailsAPI = async (ColumnId, updateData) => {
	const res = await axios.put(`/v1/columns/${ColumnId}`, updateData);
	return res;
};

export const deleteColumnDetailsAPI = async (ColumnId) => {
	const res = await axios.delete(`/v1/columns/${ColumnId}`);
	return res;
};

/** Card */
export const createNewCardAPI = async (newCardData) => {
	const res = await axios.post('/v1/cards', newCardData);
	return res;
};

/** Login */
export const loginAPI = async (loginData) => {
	const res = await axios.post('/v1/auth/login', loginData);
	return res;
};

/** Register */
export const registerAPI = async (registerData) => {
	const res = await axios.post('/v1/auth/register', registerData);
	return res;
};

export const checkAuthAPI = async () => {
	const res = await axios.get('/v1/auth/check');
	return res;
};
