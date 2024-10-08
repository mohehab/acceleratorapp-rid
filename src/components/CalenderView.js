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

  const handleEvent = (event) => {
    setOpenModel(false)
    let eventVal = event
    eventVal.id = events.length + 1
    setEvents([...events, eventVal])
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
          onSelectEvent={(e) => console.log(e)}
          onSelectSlot={() => setOpenModel(true)} />

        <EventsModal 
          open={openModel} 
          closeModal={() => setOpenModel(false)}
          createEvent={(event) => handleEvent(event)} />
      </Grid>
    </Box>
  );
}