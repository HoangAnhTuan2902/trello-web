import CloseIcon from '@mui/icons-material/Close';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Column from './Column/Column';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';

function ListColumns({ isLoading, columns, createNewColumn, createNewCard, deleteColumnDetails }) {
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);

  const toggleNewColumnForm = () => {
    setNewColumnTitle('');
    setOpenNewColumnForm((prev) => !prev);
  };

  const addNewColumn = () => {
    if (!newColumnTitle || newColumnTitle.trim().length < 3) {
      toast.error('title phải có độ dài lớn hơn 3 ký tự');
      return;
    }
    const newColumnData = {
      title: newColumnTitle,
    };
    createNewColumn(newColumnData);
    setNewColumnTitle('');
    setOpenNewColumnForm((prev) => !prev);
  };

  return (
    <SortableContext items={columns?.map((column) => column._id)} strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          overflowX: 'auto',
          overflowY: 'hidden',
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
        }}
      >
        {/* Loading Skeleton for Columns */}
        {columns?.map((column) => (
          <Column
            key={column._id}
            isLoading={isLoading}
            deleteColumnDetails={deleteColumnDetails}
            createNewCard={createNewCard}
            column={column}
          />
        ))}

        {/* Box to add new column */}
        {!openNewColumnForm ? (
          isLoading ? (
            <Skeleton animation="wave" variant="rounded" height={50} width={230} sx={{ mx: 2 }} />
          ) : (
            <Box
              sx={{
                minWidth: '230px',
                maxWidth: '230px',
                mx: 2,
                borderRadius: '6px',
                height: 'fit-content',
                bgcolor: '#ffffff3d',
              }}
            >
              <Button
                onClick={toggleNewColumnForm}
                sx={{
                  color: 'white',
                  width: '100%',
                  justifyContent: 'flex-start',
                  pl: 2.5,
                  py: 1,
                }}
                startIcon={<NoteAddIcon />}
              >
                Add New Column
              </Button>
            </Box>
          )
        ) : (
          <Box
            sx={{
              minWidth: '230px',
              maxWidth: '230px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <TextField
              label="Enter column title..."
              variant="standard"
              type="text"
              size="small"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
                '& .MuiInput-underline': {
                  '&::after': { borderBottom: '2px solid white' },
                  '&::before': { border: 'none' },
                  '&:hover': { border: '0px' },
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                borderRadius: '6px',
              }}
            >
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={addNewColumn}
                sx={{
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.primary.main,
                  bgcolor: (theme) => theme.palette.primary.main,

                  '&:hover': { bgcolor: (theme) => theme.palette.primary.main },
                }}
              >
                add new column
              </Button>
              <CloseIcon
                onClick={toggleNewColumnForm}
                fontSize="small"
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.primary.main },
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
}

export default ListColumns;
