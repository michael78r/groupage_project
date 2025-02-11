import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// ----------------------------------------------------------------------

export default function AppWidget({ title, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 1,
        py: 3,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 50, height: 50 }}>{icon}</Box>}

      <Stack spacing={0.1}>
        <Typography variant="h5">{total}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
      </Stack>

      {/* <InfoOutlinedIcon /> */}
    </Card>
  );
}

// AppWidget.propTypes = {
//   color: PropTypes.string,
//   icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
//   sx: PropTypes.object,
//   title: PropTypes.string,
//   total: PropTypes.number,
// };
