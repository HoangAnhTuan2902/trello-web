import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sorts';
import {
	DndContext,
	// PointerSensor,
	useSensor,
	useSensors,
	MouseSensor,
	TouchSensor,
	DragOverlay,
	defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';

const ACTIVE_DRAG_ITEM_TYPE = {
	COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
	CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
};

function BoardContent({ board }) {
	const [orderedColumns, setOrderedColumns] = useState([]);
	// cùng 1 thời điểm chỉ có 1 phần tử được kéo (column hoặc card)
	const [activeDragItemId, setActiveDragItemId] = useState(null);
	const [activeDragItemType, setActiveDragItemType] = useState(null);
	const [activeDragItemData, setActiveDragItemData] = useState(null);

	useEffect(() => {
		setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'));
	}, [board]);

	// tìm column theo cardId
	const findColumnByCardId = (cardId) => {
		return orderedColumns.find((column) =>
			column?.cards?.map((card) => card._id)?.includes(cardId),
		);
	};

	// https://docs.dndkit.com/api-documentation/sensors
	// const pointerSensor = useSensor(PointerSensor, {
	// 	activationConstraint: { distance: 10 },
	// });

	// yêu cầu chuột di chuyển ít nhất 10px mới gọi event
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: { distance: 10 },
	});

	// nhấn giữ 250ms và di chuyển ít nhất 500px mới gọi event
	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: { delay: 250, tolerance: 500 },
	});

	// ưu tiên sử dụng kết hợp 2 loại sensors là MouseSensor và TouchSensor để có trải nghiệm mobile tốt nhất, không bị bug
	// const sensors = useSensors(pointerSensor);
	const sensors = useSensors(mouseSensor, touchSensor);

	//trigger khi kết thúc kéo (drag) 1 phần tử => hành động thả (drop)
	const handleDragEnd = (event) => {
		// console.log('handleDragEnd', event);

		if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
			// console.log('hành động kéo thả card');
			return;
		}
		const { active, over } = event;

		// nếu không tồn tại active hoặc over (khi kéo ra khỏi phạm vi container) thì return
		if (!active || !over) return;

		if (active.id !== over.id) {
			/** lấy vị trí cũ của phần tử được kéo (active)  */
			const oldIndex = orderedColumns.findIndex(
				(column) => column._id === active.id,
			);
			/** lấy vị trí mới của phần tử được kéo (active)  */
			const newIndex = orderedColumns.findIndex(
				(column) => column._id === over.id,
			);

			if (oldIndex !== -1 && newIndex !== -1) {
				const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
				setOrderedColumns(dndOrderedColumns);
			}

			// dùng arrayMove của dnd-kit để sắp xếp lại mảng Columns ban đầu
			// docs: https://docs.dndkit.com/presets/sortable#arraymove
			const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
			setOrderedColumns(dndOrderedColumns);

			/** xử lý gọi api cập nhật sắp xếp */
			// const dndOrderedColumnsIds = dndOrderedColumns.map(
			// 	(column) => column._id,
			// );
			// console.log('dndOrderedColumnsIds', dndOrderedColumnsIds);
		}
		setActiveDragItemId(null);
		setActiveDragItemType(null);
		setActiveDragItemData(null);
	};

	// trigger trong quá trình kéo (drag) phần tử
	const handleDragOver = (event) => {
		// return khi kéo Column
		if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

		// xử lý kéo card qua lại giữa các column
		// console.log('handleDragOver', event);

		const { active, over } = event;
		// nếu không tồn tại active hoặc over (khi kéo ra khỏi phạm vi container) thì return
		if (!active || !over) return;

		//activeDraggingCard là card đang kéo
		const {
			id: activeDraggingCardId,
			data: { current: activeDraggingCardData },
		} = active;
		// overCard là card mà activeDraggingCard kéo qua
		const { id: overCardId } = over;

		// tìm 2 column theo cardId
		const activeColumn = findColumnByCardId(activeDraggingCardId);
		const overColumn = findColumnByCardId(overCardId);

		// nếu không tồn tại 1 trong 2 column thì return
		if (!activeColumn || !over) return;

		// chỉ xử lý khi kéo card qua lại giữa các column, kéo về column cũ không xử lý
		if (activeColumn?._id !== overColumn?._id) {
			setOrderedColumns((prevColumns) => {
				// tìm vị trí của overCard đang kéo trong column đích (nơi activeCard sắp được thả)
				const overCardIndex = overColumn?.cards?.findIndex(
					(card) => card?._id === overCardId,
				);

				// logic tính toán 'cardIndex' mới (trên hoặc dưới của overCard) lấy chuẩn ra từ code của thư viện
				let newCardIndex;
				const isBelowOverItem =
					active.rect.current.translated &&
					active.rect.current.translated.top > over.rect.top + over.rect.height;

				const modifier = isBelowOverItem ? 1 : 0;

				newCardIndex =
					overCardIndex >= 0
						? overCardIndex + modifier
						: overColumn?.card?.length + 1;

				const nextColumns = cloneDeep(prevColumns);

				const nextActiveColumn = nextColumns.find(
					(column) => column?._id === activeColumn?._id,
				);
				const nextOverColumn = nextColumns.find(
					(column) => column?._id === overColumn?._id,
				);

				// column cũ
				if (nextActiveColumn) {
					// xóa card đang kéo khỏi column cũ
					nextActiveColumn.cards = nextActiveColumn?.cards?.filter(
						(card) => card?._id !== activeDraggingCardId,
					);

					// cập nhật lại cardOrderIds của column cũ để đồng bộ dữ liệu
					nextActiveColumn.cardOrderIds = nextActiveColumn?.cards?.map(
						(card) => card?._id,
					);
				}
				// column mới
				if (nextOverColumn) {
					// kiểm tra xem card đang kéo đã tồn tại trong overColumn đích chưa, nếu có thì xóa nó đi
					nextOverColumn.cards = nextOverColumn?.cards?.filter(
						(card) => card?._id !== activeDraggingCardId,
					);
				}

				if (nextOverColumn) {
					// thêm card đang kéo vào vị trí mới trong overColum đích
					nextOverColumn.cards = nextOverColumn?.cards?.toSpliced(
						newCardIndex,
						0,
						activeDraggingCardData,
					);
					// cập nhật lại cardOrderIds của column cũ để đồng bộ dữ liệu
					nextOverColumn.cardOrderIds = nextOverColumn?.cards?.map(
						(card) => card?._id,
					);
				}

				console.log('nextColumns', nextColumns);

				return nextColumns;
			});
		}
	};

	//trigger khi bắt đầu kéo (Drag) 1 phần tử
	const handleDragStart = (event) => {
		// console.log('handleDragStart', event);
		setActiveDragItemId(event?.active?.id);
		setActiveDragItemType(
			event?.active?.data?.current?.columnId
				? ACTIVE_DRAG_ITEM_TYPE.CARD
				: ACTIVE_DRAG_ITEM_TYPE.COLUMN,
		);
		setActiveDragItemData(event?.active?.data?.current);
	};

	// Aniamtion khi (drop) thả phần tử
	const dropAnimation = {
		sideEffects: defaultDropAnimationSideEffects({
			styles: { active: { opacity: 0.5 } },
		}),
	};

	return (
		<DndContext
			sensors={sensors}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}>
			<Box
				sx={{
					p: '10px 0',
					width: '100%',
					alignItems: 'flex-start',
					bgcolor: (theme) =>
						theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
					height: (theme) => theme.trello.boardContentHeight,
				}}>
				<ListColumns columns={orderedColumns} />
				<DragOverlay dropAnimation={dropAnimation}>
					{!activeDragItemType && null}
					{activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
						<Column column={activeDragItemData} />
					)}
					{activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
						<Card card={activeDragItemData} />
					)}
				</DragOverlay>
			</Box>
		</DndContext>
	);
}

export default BoardContent;
