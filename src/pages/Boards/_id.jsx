// Board Details
import Container from '@mui/material/Container';

import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
	createNewCardAPI,
	createNewColumnAPI,
	deleteColumnDetailsAPI,
	fetchBoardDetailsAPI,
	moveCardToDifferentColumnAPI,
	updateBoardDetailsAPI,
	updateColumnDetailsAPI,
} from '~/apis';
import AppBar from '~/components/AppBar/AppBar';
import { generatePlaceholderCard } from '~/utils/formatters';
import { mapOrder } from '~/utils/sorts';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { useNavigate } from 'react-router-dom';

function Board() {
	const [board, setBoard] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const boardId = '66dfef9c114ada1d9ac8a671';

		const loadBoardData = async () => {
			try {
				const board = await fetchBoardDetailsAPI(boardId);

				// Sắp xếp các cột theo `columnOrderIds`
				board.columns = mapOrder(board.columns, board.columnOrderIds, '_id');

				board.columns.forEach((column) => {
					if (isEmpty(column.cards)) {
						// Thêm placeholder nếu cột không có card
						column.cards = [generatePlaceholderCard(column)];
						column.cardOrderIds = [column.cards[0]._id];
					} else {
						// Sắp xếp các card theo `cardOrderIds`
						column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id');
					}
				});

				setBoard(board);

				// Đặt loading timeout
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			} catch (error) {
				navigate('/user/login'); // Redirect nếu xảy ra lỗi
			}
		};

		loadBoardData();

		// Cleanup setTimeout nếu component unmount
		return () => clearTimeout();
	}, [navigate]); // Thêm `navigate` vào dependency array nếu bạn sử dụng nó

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

	// xóa 1 column và card bên trong
	const deleteColumnDetails = (columnId) => {
		// update state phía client
		const newBoard = { ...board };
		newBoard.columns = newBoard.columns.filter(
			(column) => column._id !== columnId,
		);
		newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
			(_id) => _id !== columnId,
		);
		setBoard(newBoard);
		//gọi API
		deleteColumnDetailsAPI(columnId).then((res) => {
			toast.success(res?.deleteResult);
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
		// <Container
		// 	disableGutters
		// 	maxWidth={false}
		// 	sx={{ height: '100vh' }}>
		// 	{!board ? (
		// 		<Box
		// 			sx={{
		// 				display: 'flex',
		// 				alignItems: 'center',
		// 				justifyContent: 'center',
		// 				height: (theme) => theme.trello.boardContentHeight,
		// 			}}>
		// 			<CircularProgress />
		// 		</Box>
		// 	) : (
		// 		<>
		// 			<AppBar />
		// 			<BoardBar
		// 				board={board}
		// 				isLoading={isLoading}
		// 			/>
		// 			<BoardContent
		// 				isLoading={isLoading}
		// 				board={board}
		// 				moveColumn={moveColumn}
		// 				createNewCard={createNewCard}
		// 				createNewColumn={createNewColumn}
		// 				deleteColumnDetails={deleteColumnDetails}
		// 				moveCardInTheSameColumn={moveCardInTheSameColumn}
		// 				moveCardToDifferentColumn={moveCardToDifferentColumn}
		// 			/>
		// 		</>
		// 	)}
		// </Container>
		<Container
			disableGutters
			maxWidth={false}
			sx={{ height: '100vh' }}>
			<AppBar isLoading={isLoading} />
			<BoardBar
				board={board}
				isLoading={isLoading}
			/>
			<BoardContent
				isLoading={isLoading}
				board={board}
				moveColumn={moveColumn}
				createNewCard={createNewCard}
				createNewColumn={createNewColumn}
				deleteColumnDetails={deleteColumnDetails}
				moveCardInTheSameColumn={moveCardInTheSameColumn}
				moveCardToDifferentColumn={moveCardToDifferentColumn}
			/>
		</Container>
	);
}

export default Board;
