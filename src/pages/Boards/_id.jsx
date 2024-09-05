// Board Details
import Container from '@mui/material/Container';
import { isEmpty } from 'lodash';

import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
// import { mockData } from '~/apis/mock-data';
import { useEffect, useState } from 'react';
import {
	createNewCardAPI,
	createNewColumnAPI,
	fetchBoardDetailsAPI,
	updateBoardDetailsAPI,
} from '~/apis';
import { generatePlaceholderCard } from '~/utils/formatters';

function Board() {
	const [board, setBoard] = useState(null);

	useEffect(() => {
		const boardId = '66d7cfc6633d62486c60be2a';
		fetchBoardDetailsAPI(boardId).then((board) => {
			board.columns.forEach((column) => {
				if (isEmpty(column.cards)) {
					column.cards = [generatePlaceholderCard(column)];
					column.cardOrderIds = [column.cards[0]._id];
				}
			});
			setBoard(board);
		});
	}, []);

	const createNewColumn = async (newColumnData) => {
		const createdColumn = await createNewColumnAPI({
			...newColumnData,
			boardId: board._id,
		});

		// xử lý kéo thả card vào 1 column rỗng
		createdColumn.cards = [generatePlaceholderCard(createdColumn)];
		createdColumn.cardOrderIds = [createdColumn.cards[0]._id];

		const newBoard = { ...board };
		newBoard.columns.push(createdColumn);
		newBoard.columnOrderIds.push(createdColumn._id);
		setBoard(newBoard);
	};

	const createNewCard = async (newCardData) => {
		const createdCard = await createNewCardAPI({
			...newCardData,
			boardId: board._id,
		});
		const newBoard = { ...board };
		const columnToUpdate = newBoard.columns.find(
			(column) => column._id === createdCard.columnId,
		);
		if (columnToUpdate) {
			columnToUpdate.cards.push(createdCard);
			columnToUpdate.cardOrderIds.push(createdCard._id);
		}
		setBoard(newBoard);
	};

	// gọi API cập nhật vị trí column khi kéo thả
	const moveColumn = async (dndOrderedColumns) => {
		// update state phía client
		const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id);
		const newBoard = { ...board };
		newBoard.columns = dndOrderedColumns;
		newBoard.columnOrderIds = dndOrderedColumnsIds;
		setBoard(newBoard);

		// gọi API update vị trí column
		await updateBoardDetailsAPI(board._id, {
			columnOrderIds: dndOrderedColumnsIds,
		});
	};

	return (
		<Container
			disableGutters
			maxWidth={false}
			sx={{ height: '100vh' }}>
			<AppBar />
			<BoardBar board={board} />
			<BoardContent
				moveColumn={moveColumn}
				createNewCard={createNewCard}
				createNewColumn={createNewColumn}
				board={board}
			/>
		</Container>
	);
}

export default Board;
