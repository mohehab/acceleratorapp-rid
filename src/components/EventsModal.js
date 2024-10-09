import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

export default function EventsModal({ open, closeModal, createEvent, selected, mode, deleteEvent }) {
  const [title, setTitle] = useState('')
  const [start, setStartDate] = useState('')
  const [end, setEndDate] = useState('')

  useEffect(() => {
    if (Object.keys(selected).length > 0) {
        setTitle(selected.title)
        setStartDate(selected.start)
        setEndDate(selected.end)
    }
  }, [selected])

  const handleEvent = () => {
    if (mode === 'Create') {
      createEvent({ title, start, end })
    }
    if (mode === 'Edit') {
      createEvent({ id: selected.id, title, start, end })
    }
    handleCloseModel()
  }

  const handleDelete = () => {
    deleteEvent(selected.id)
    handleCloseModel()
  }

  const handleCloseModel = () => {
    setTitle('')
    setStartDate('')
    setEndDate('')
    closeModal()
  }

  return (
    <Modal
        open={open}
        onClose={closeModal}>
        <Box sx={{ ...style, width: 400 }}>
            <h2 id="parent-modal-title">{ mode } Event</h2>
            <TextField id="outlined-basic" label="Title" value={title} variant="outlined" fullWidth margin="dense" onChange={(e) => setTitle(e.target.value)} />
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker label="Starting date" value={moment(start)} fullWidth margin="dense" onChange={(newValue) => setStartDate(newValue.toDate())} />
                <DateTimePicker label="Ending date" value={moment(end)} fullWidth margin="dense" onChange={(newValue) => setEndDate(newValue.toDate())} />
            </LocalizationProvider>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={() => handleEvent()}>{ mode }</Button>
                <Button variant="outlined" onClick={() => handleDelete()}>Delete</Button>
                <Button variant="outlined" onClick={() => handleCloseModel()}>Cancel</Button>
            </Stack>
        </Box>
    </Modal>
  )
}
