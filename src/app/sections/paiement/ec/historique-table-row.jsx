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
import Label from '../../../components/label/label';
import Iconify from '../../../components/iconify/iconify';
import { formatterMontant } from '../../../components/formatterMontant';


// ----------------------------------------------------------------------

export default function HistoriqueTableRow({
  key,
  mode_p,
  reference,
  montant,
  date,
  etat,

}) {

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell padding="checkbox"></TableCell>

        <TableCell>{mode_p}</TableCell>

        <TableCell align="center">{reference}</TableCell>

        <TableCell align="center">{date}</TableCell>

        
        <TableCell align="center">{formatterMontant(montant)}</TableCell>


        <TableCell align="center">

          {etat === "avoir" && <Label color='error'>avoir</Label>}

          {etat === "transfert" && <Label color='success'>transfert</Label>}

          {etat === "deduit" && <Label color='warning'>deduit</Label>}

          {etat === "paiement" && <Label color='warning'>paiement</Label>}

        </TableCell>

      </TableRow>

    </>
  );
}

HistoriqueTableRow.propTypes = {
  key:PropTypes.number,
};
