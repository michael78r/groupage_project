import PropTypes from 'prop-types';
import React from 'react';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function TableNoData({ query }) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" paragraph>
            Non trouvé
          </Typography>

          <Typography variant="body2">
            Aucun résultat trouvé pour la réference &nbsp;
            <strong>&quot;{query}&quot;</strong>
             {/* et nature &nbsp;
            <strong>&quot;{query1}&quot;</strong>. */}
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}

TableNoData.propTypes = {
  query: PropTypes.string,
};
