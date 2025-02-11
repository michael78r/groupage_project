import { useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from '../../components/label';
import Iconify from '../../components/iconify';
import {format} from 'date-fns'
import { useRouter } from '../../routes/hooks';

// ----------------------------------------------------------------------

export default function ClientTableRow({
  nom,prenom,shipping_mark,email,phone,total_cbm

}) {
  const [open, setOpen] = useState(null);


  const router = useRouter();

  const openMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const details = () => {
    setOpen(null);
    //router.push(`/detailsmanifeste?manifest_id=${manifest_id}&sk=${etat}`)

  };
  
  const closeMenu = () => {
    setOpen(null);
  };
  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell padding="checkbox">
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={nom} src={nom} />
            <Typography variant="subtitle2" noWrap>
              {nom} {prenom}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="center">{shipping_mark}</TableCell>

        <TableCell align="center">{email}</TableCell>

        <TableCell align="center">{phone}</TableCell>

        <TableCell align="center">
        <Label color='primary'>{`${total_cbm}m³`}</Label>
        </TableCell>


        <TableCell align="center">
          {parseFloat(total_cbm) == 0 && <Label color='error'>non actif</Label>}

          {parseFloat(total_cbm) > 0 && <Label color='success'>actif</Label>}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={openMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={details}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Details
        </MenuItem>
      </Popover>
    </>
  );
}

// ClientTableRow.propTypes = {
//   nom: PropTypes.string,
//   prenom: PropTypes.string,
//   shipping_mark: PropTypes.string,
//   email: PropTypes.string,
//   phone: PropTypes.number,
//   total_cbm: PropTypes.string
// };
