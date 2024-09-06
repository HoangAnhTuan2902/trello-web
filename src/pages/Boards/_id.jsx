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
	moveCardToDifferentColumnAPI,
	updateBoardDetailsAPI,
	updateColumnDetailsAPI,
} from '~/apis';
import { generatePlaceholderCard } from '~/utils/formatters';
import { mapOrder } from '~/utils/sorts';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Board() {
	const [board, setBoard] = useState(null);

	useEffect(() => {
		const boardId = '66d7cfc6633d62486c60be2a';
		fetchBoardDetailsAPI(boardId).then((board) => {
			// sắp xếp column trước khi đưa dữ liệu xuống comlonent con
			board.columns = mapOrder(board.columns, board.columnOrderIds, '_id');

			board.columns.forEach((column) => {
				if (isEmpty(column.cards)) {
					column.cards = [generatePlaceholderCard(column)];
					column.cardOrderIds = [column.cards[0]._id];
				} else {
					// sắp xếp card trước khi đưa dữ liệu xuống comlonent con
					column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id');
				}
			});
			// console.log('full board', board);

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
			// nếu column rỗng (chứa placeholder-card)
			if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
				columnToUpdate.cards = [createdCard];
				columnToUpdate.cardOrderIds = [createdCard._id];
			} else {
				columnToUpdate.cards.push(createdCard);
				columnToUpdate.cardOrderIds.push(createdCard._id);
			}
		}

		setBoard(newBoard);
	};

	// gọi API cập nhật vị trí column khi kéo thả
	const moveColumn = (dndOrderedColumns) => {
		// update state phía client
		const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id);
		const newBoard = { ...board };
		newBoard.columns = dndOrderedColumns;
		newBoard.columnOrderIds = dndOrderedColumnsIds;
		setBoard(newBoard);

		// gọi API update vị trí column
		updateBoardDetailsAPI(board._id, {
			columnOrderIds: dndOrderedColumnsIds,
		});
	};

	/**
	 * khi di chuyển card sang column khác:
	 * B1: cập nhật lại cardOrderIds của column cũ chứa nó
	 * B2: cập nhật lại cardOrderIds của column mới chứa nó
	 * B3: cập nhật lại columnId của card được kéo
	 */
	const moveCardToDifferentColumn = async (
		currentCardId,
		prevColumnId,
		nextColumnId,
		dndOrderedColumns,
	) => {
		// update state phía client
		const dndOrderedColumnsIds = dndOrderedColumns.map((column) => column._id);
		const newBoard = { ...board };
		newBoard.columns = dndOrderedColumns;
		newBoard.columnOrderIds = dndOrderedColumnsIds;
		setBoard(newBoard);

		// gọi Api
		let prevCardOrderIds =
			dndOrderedColumns.find((column) => column._id === prevColumnId)
				?.cardOrderIds || [];
		// xóa phần từ placeholder-card nếu có trong mảng cardOrderIds trước khi gửi dữ liệu lên BE
		if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = [];

		moveCardToDifferentColumnAPI({
			currentCardId,
			prevColumnId,
			prevCardOrderIds,
			nextColumnId,
			nextCardOrderIds: dndOrderedColumns.find(
				(column) => column._id === nextColumnId,
			)?.cardOrderIds,
		});
	};

	// gọi API cập nhật cardOrderIds khi kéo thả card trong column chứa nó
	const moveCardInTheSameColumn = (
		dndOrderedCards,
		dndOrderedCardIds,
		columnId,
	) => {
		// update state phía client
		const newBoard = { ...board };
		const columnToUpdate = newBoard.columns.find(
			(column) => column._id === columnId,
		);
		if (columnToUpdate) {
			columnToUpdate.cards = dndOrderedCards;
			columnToUpdate.cardOrderIds = dndOrderedCardIds;
		}
		setBoard(newBoard);

		// gọi API update vị trí card trong column
		updateColumnDetailsAPI(columnId, {
			cardOrderIds: dndOrderedCardIds,
		});
	};

	return (
		<Container
			disableGutters
			maxWidth={false}
			sx={{ height: '100vh' }}>
			<AppBar />
			{!board ? (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: (theme) => theme.trello.boardContentHeight,
					}}>
					<CircularProgress />
				</Box>
			) : (
				<>
					<BoardBar board={board} />
					<BoardContent
						moveColumn={moveColumn}
						createNewCard={createNewCard}
						createNewColumn={createNewColumn}
						moveCardInTheSameColumn={moveCardInTheSameColumn}
						moveCardToDifferentColumn={moveCardToDifferentColumn}
						board={board}
					/>
				</>
			)}
		</Container>
	);
}

export default Board;
