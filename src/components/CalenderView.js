import 'react-big-calendar/lib/css/react-big-calendar.css';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { useState } from 'react'
import Typography from '@mui/material/Typography';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment)

export default function Calender() {
  const [events, setEvent] = useState([])
  const [openModel, setOpenModel] = useState(false)

  const handleSelect = ({start, end}) => {
    setEvent([...events, {
      title: 'New Event',
      start,
      end
    }])
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
          onSelectSlot={handleSelect} />
      </Grid>
    </Box>
  );
}