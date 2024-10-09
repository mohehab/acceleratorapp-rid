import 'react-big-calendar/lib/css/react-big-calendar.css';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { useState } from 'react'
import Typography from '@mui/material/Typography';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import EventsModal from './EventsModal';

const localizer = momentLocalizer(moment)

export default function Calender() {
  const [events, setEvents] = useState([])
  const [openModel, setOpenModel] = useState(false)
  const [mode, setMode] = useState('')
  const [selectedEvent, setSelectedEvent] = useState({})

  const handleEvent = (event) => {
    if (mode === 'Create') {
      let eventVal = event
      eventVal.id = events.length + 1
      setEvents([...events, eventVal])
    }
    if (mode === 'Edit') {
      const evtIndex = events.findIndex(item => item.id === event.id)
      if (evtIndex > -1) {
        const eventsList = [...events]
        eventsList[evtIndex] = event
        setEvents(eventsList)
      }
    }
    localStorage.setItem('Events', JSON.stringify(events));
  }

  const handleModalMode = (mode, event) => {
    if (mode === 'create') {
      setMode('Create')
    }
    if (mode === 'edit') {
      setMode('Edit')
      setSelectedEvent(event)
    }
    setOpenModel(true)
  }

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id))
    localStorage.setItem('Events', JSON.stringify(events));
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Calender
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Calendar 
          localizer={localizer} 
          selectable
          events={events}
          style={{ height: 500, width: "100%" }}
          onSelectEvent={(e) => handleModalMode('edit', e)}
          onSelectSlot={() => handleModalMode('create')} />

        <EventsModal 
          open={openModel} 
          closeModal={() => setOpenModel(false)}
          mode={mode}
          selected={selectedEvent}
          deleteEvent={(id) => handleDelete(id)}
          createEvent={(event) => handleEvent(event)} />
      </Grid>
    </Box>
  );
}