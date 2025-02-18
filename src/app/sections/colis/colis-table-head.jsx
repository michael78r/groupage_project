import PropTypes from 'prop-types';
import React from 'react';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import Avatar from '@mui/material/Avatar';
import { visuallyHidden } from '../../components/table/utils';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Badge } from '@mui/material';

// ----------------------------------------------------------------------

export default function ColisTableHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
  tabValue,
  manifest,
  onManId,
  onAddColis,
  updateColis,
  onNumero,
  numero
}) {

  const [inputValue, setInputValue] = useState('');

  const [open, setOpen] = React.useState(false);

  const onSort = (property) => (event) => {
    onRequestSort(event, property);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const valideo = () => {
    onAddColis()
  };

  const updateo = () => {
    updateColis()
  };



  return (
    numSelected > 0 ?
      <TableHead sx={{ color: 'primary.main', '& th': { backgroundColor: 'primary.lighter' } }}>
        {tabValue === 'all' || tabValue === 'manifesté' ?
          <TableCell padding="checkbox"></TableCell> : <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        }
        <TableCell colSpan={6}>

          {tabValue === 'non_recu' &&
            <>
              <Chip
                label={`${numSelected} ${numSelected === 1 ? 'sélectionné' : 'sélectionnés'}`}
              />
              <Button color="primary" onClick={updateo} variant="contained" size="small">
                Recevoir
              </Button>
            </>
          }

          {/* <Chip onClick={updateo} avatar={<Badge badgeContent={numSelected} color="error" />} label={`${numSelected === 1 ? 'sélectionné' : 'sélectionnés'}`} />} */}
          {tabValue === 'recu' &&
            <>
              <Chip
                label={`${numSelected} ${numSelected === 1 ? 'sélectionné' : 'sélectionnés'}`}
              //icon={<DoneIcon />}
              />
              <Chip color="success" avatar={<Avatar alt="C" src="C" />} label={numero} onClick={handleClickOpen} />

              {numero !== 'Numero Conteneur' && numero !== '' && (
                <Button color="primary" onClick={valideo} variant="contained" size="small">
                  Ajouter
                </Button>
              )}
            </>}

        </TableCell>
        <TableCell></TableCell>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ajouter manifeste</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <Autocomplete
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                onChange={(event, newValue) => {
                  if (newValue) {
                    onManId(newValue.id);
                    onNumero(newValue.label)
                  } else {
                    onManId(null)
                    onNumero('Numero Conteneur');
                  }
                }}
                id="controllable-states-demo"
                options={manifest}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Manifest" />}
              />

            </Box>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Effacer</Button> */}
            {/* <Button onClick={ok}>Valider</Button> */}
          </DialogActions>
        </Dialog>
      </TableHead>
      :
      <TableHead>
        <TableRow>

          {tabValue === 'all' || tabValue === 'manifesté' ?
            <TableCell padding="checkbox"></TableCell> : <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            </TableCell>
          }
          {/* {numSelected > 0} */}

          {headLabel.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.align || 'left'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{
                width: headCell.width, minWidth: headCell.minWidth
              }}
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

ColisTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
  tabValue: PropTypes.string,
  onAddColis: PropTypes.func
};
