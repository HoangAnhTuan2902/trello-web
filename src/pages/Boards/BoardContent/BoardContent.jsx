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
		const { active, over } = event;

		// Nếu không có phần tử nào được kéo qua phần tử nào thì return
		if (!over) return;

		if (active.id !== over.id) {
			/** lấy vị trí cũ của phần tử được kéo (active)  */
			const oldIndex = orderedColumns.findIndex(
				(column) => column._id === active.id,
			);
			/** lấy vị trí mới của phần tử được kéo (active)  */
			const newIndex = orderedColumns.findIndex(
				(column) => column._id === over.id,
			);

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
