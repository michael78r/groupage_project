import { useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from '../../components/label';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function ColisTableRow({
  selected,
  reference,
  nature,
  cbm,
  poids,
  date,
  colis_id,
  onDeleteColis,
  manifest_id,
  is_recu,
  handleClick,
  tabValue,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const deleteColis = (id) => {
    setOpen(null)
    onDeleteColis(id)
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {tabValue === 'all' || tabValue === 'manifesté' ?
          <TableCell padding="checkbox"></TableCell>
          :
          <TableCell padding="checkbox">
            <Checkbox disableRipple checked={selected} onChange={handleClick} />
          </TableCell>}

        {/* <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={nature} src={reference} />
            <Typography variant="subtitle2" noWrap>
              {reference}
            </Typography>
          </Stack>
        </TableCell> */}

        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {reference}
          </Typography></TableCell>

        <TableCell>{nature}</TableCell>

        <TableCell>{cbm}</TableCell>

        <TableCell>{poids}</TableCell>

        <TableCell>{date}</TableCell>

        <TableCell align="center">
          {manifest_id === null ? is_recu === 0 ? <Label color='error'>non recu</Label> : <Label color='success'>recu</Label> : ""}
          {manifest_id !== null ? <Label color='warning'>manifesté</Label> : ""}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Modifier
        </MenuItem>

        <MenuItem onClick={() => deleteColis(colis_id)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Supprimer
        </MenuItem>
      </Popover>
    </>
  );
}

ColisTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
