import PropTypes from 'prop-types';
import React from 'react';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '../../../components/table/utils'; 

// ----------------------------------------------------------------------

export default function HistoriqueTableHead({
  order,
  orderBy,
  headLabel,
  onRequestSort,
}) {
  const onSort = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (

    <TableHead>
      <TableRow>
        <TableCell></TableCell>

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id === 'mode_paiement' ||headCell.id === 'date' || headCell.id === 'reference' || headCell.id === 'montant' || headCell.id === 'reste_a_payer' ? 'right' : (headCell.align || 'left')}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={onSort(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>

  );
}

HistoriqueTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  headLabel: PropTypes.array,
  onRequestSort: PropTypes.func,
};
