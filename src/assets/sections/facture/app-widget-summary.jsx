import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { fShortenNumber } from '../../utils/format-number';
import { formatterMontant } from '../../components/formatterMontant';

// ----------------------------------------------------------------------

export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 2,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      {/* {icon && <Box sx={{ width: 35, height: 35 }}>{icon}</Box>} */}

      <Stack spacing={0.1}>
        <Typography variant="h5">{formatterMontant(total)}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title} {icon && <Box sx={{ width: 15, height: 15 }}>{icon}</Box>}
        </Typography>
      </Stack>
    </Card>
  );
}

// AppWidgetSummary.propTypes = {
//   color: PropTypes.string,
//   icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
//   sx: PropTypes.object,
//   title: PropTypes.string,
//   total: PropTypes.number,
// };
