import PropTypes from 'prop-types';
import React from 'react';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function TableNoRes({colSpan}) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={colSpan} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" paragraph>
           Aucun Resultat
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}
