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
import { formatterMontant } from '../../components/formatterMontant';
import { useRouter } from '../../routes/hooks';

// ----------------------------------------------------------------------

export default function FactureTableRow({
  nom,
  shipping_mark,
  reference_facture,
  nombre_package,
  unit_price,
  total,
  facture_id,
  taux_vente,
  mga,
  extra_charge,
  reste_a_payer,
  cbm,
  payer

}) {
  const [open, setOpen] = useState(null);

  const router = useRouter();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleDetails = () => {
    setOpen(null);
    router.push(`/detailsfacture?id=325`)
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell padding="checkbox"></TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={nom} src={nom} />
            <Typography variant="subtitle2" noWrap>
              {nom} {shipping_mark}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{reference_facture}</TableCell>

        <TableCell align="center">{nombre_package}</TableCell>

        <TableCell align="center">{cbm}</TableCell>

        {/* <TableCell>{unit_price}</TableCell> */}

        <TableCell align="right">{formatterMontant(extra_charge)}</TableCell>

        <TableCell align="right">{formatterMontant(total)}</TableCell>

        <TableCell align="right">{formatterMontant(mga)}</TableCell>

        <TableCell align="right">{formatterMontant(payer)}</TableCell>

        <TableCell align="right">{formatterMontant(reste_a_payer)}</TableCell>

        <TableCell align="center">

          {reste_a_payer > 0 && <Label color='error'>non payé</Label>}

          {reste_a_payer == 0 && <Label color='success'>payé</Label>}

          {reste_a_payer < 0 && <Label color='warning'>trop perçu</Label>}

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
        <MenuItem onClick={handleDetails}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Details
        </MenuItem>
      </Popover>
    </>
  );
}

// FactureTableRow.propTypes = {
//   key:PropTypes.number,
//   nom:PropTypes.string,
//   shipping_mark:PropTypes.string,
//   reference_facture:PropTypes.string,
//   nombre_package:PropTypes.number,
//   unit_price:PropTypes.string,
//   total:PropTypes.string,
//   taux_vente:PropTypes.string,
//   mga:PropTypes.string,
//   extra_charge:PropTypes.string,
//   reste_a_payer:PropTypes.string,
//   cbm:PropTypes.string,
//   payer:PropTypes.string,
// };
