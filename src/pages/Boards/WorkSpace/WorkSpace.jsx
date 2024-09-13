import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';

function WorkSpace() {
  const cardSx = {
    maxWidth: '180px',
    minWidth: '180px',
    minHeight: '90px',
    cursor: 'pointer',
    fontWeight: '600',
    '&:hover': {
      bgcolor: (theme) => (theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : '#7f8c8d'),
    },
  };
  const typographySx = { fontSize: 14, fontWeight: '600' };

  return (
    <Box>
      <Stack sx={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', gap: 1 }}>
        <AccessTimeIcon />
        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: '600' }}>
          Recently viewed
        </Typography>
      </Stack>
      <Stack sx={{ mt: 2, flexDirection: 'row', gap: 2.5, flexWrap: 'wrap' }}>
        <Card sx={cardSx}>
          <CardContent>
            <Typography sx={typographySx} color="text.primary" gutterBottom>
              Word of the Day
            </Typography>
          </CardContent>
        </Card>
        <Card sx={cardSx}>
          <CardContent>
            <Typography sx={typographySx} color="text.primary" gutterBottom>
              Word of the Day
            </Typography>
          </CardContent>
        </Card>
        <Card sx={cardSx}>
          <CardContent>
            <Typography sx={typographySx} color="text.primary" gutterBottom>
              Word of the Day
            </Typography>
          </CardContent>
        </Card>
        <Card sx={cardSx}>
          <CardContent>
            <Typography sx={typographySx} color="text.primary" gutterBottom>
              Word of the Day
            </Typography>
          </CardContent>
        </Card>
        <Card sx={cardSx}>
          <CardContent>
            <Typography sx={typographySx} color="text.primary" gutterBottom>
              Word of the Day
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default WorkSpace;
