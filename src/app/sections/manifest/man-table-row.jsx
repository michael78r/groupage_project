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
import { newDate } from '../../utils/format-time';


// ----------------------------------------------------------------------

export default function ManTableRow({
  manifest_id,
  numero,
  numero_conteneur,
  nom_consolidateur,
  eta,
  volume,
  etat,
  taux_vente,
}) {
  const [open, setOpen] = useState(null);

  const router = useRouter();

  const openMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const details = () => {
    setOpen(null);
    router.push(`/detailsmanifeste?manifest_id=${manifest_id}&sk=${etat}`)

  };

  const date = new Date(eta)


  const closeMenu = () => {
    setOpen(null);
  };
  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell padding="checkbox">
        </TableCell>

        {/* <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={numero} src={numero} />
            <Typography variant="subtitle2" noWrap>
              {numero}
            </Typography>
          </Stack>
        </TableCell> */}

        <TableCell align="center"> <Typography variant="subtitle2" noWrap> {numero} </Typography></TableCell>

        <TableCell align="center">{numero_conteneur}</TableCell>

        <TableCell align="center">{nom_consolidateur}</TableCell>

        {/* <TableCell align="center">{format(date, 'dd-MM-yyyy')}</TableCell> */}

        <TableCell align="center">{newDate(date)}</TableCell>

        <TableCell align="center">
          {volume > 0 ? <Label color='primary'>{`${volume}m³`}</Label> : <>{volume} m³</>}
        </TableCell>

        <TableCell align="center">{taux_vente}</TableCell>

        <TableCell align="center">
          {etat == 0 && <Label color='error'>non validé</Label>}

          {etat == 1 && <Label color='success'>validé</Label>}

          {etat == 2 && <Label color='info'>cloturé</Label>}
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

// ManTableRow.propTypes = {
//   numero: PropTypes.string,
//   numero_conteneur: PropTypes.number,
//   nom_consolidateur: PropTypes.string,
//   eta: PropTypes.string,
//   etat: PropTypes.number,
//   taux_vente: PropTypes.string,
//   volume: PropTypes.string,
// };
