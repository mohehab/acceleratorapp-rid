import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Calender from './components/CalenderView'
import Sidebar from './components/Sidebar';

export default function Dashboard() {
  return (
      <Box>
        <Box
          component="main"
          sx={(theme) => ({
            display: 'flex',
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            direction="row"
            sx={{
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
              width: '100%'
            }}
          >
            <Sidebar />
            <Calender />
          </Stack>
        </Box>
      </Box>
  );
}