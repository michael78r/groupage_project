import PropTypes from 'prop-types';
import React from 'react';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function TableNoData() {
  return (
    <TableRow>
      <TableCell align="center" colSpan={11} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" paragraph>
          Aucun résultat
          </Typography>

          {/* <Typography variant="body2">
            Aucun résultat
          </Typography> */}
        </Paper>
      </TableCell>
    </TableRow>
  );
}

TableNoData.propTypes = {
  query: PropTypes.string,
};
