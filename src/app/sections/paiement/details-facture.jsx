import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Stack,
  Divider,
  Typography,
  Avatar,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  Table
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Label from '../../components/label';
import Iconify from '../../components/iconify/iconify';
import Scrollbar from '../../components/scrollbar'
import { formatterMontant } from '../../components/formatterMontant';
import { newDate } from '../../utils/format-time';

export default function Facture({ title, onOpen, subheader, facture, ...other }) {
  const { description, uc, spm, tv, ref, nom, prenom, colis, extra_charge, total_usd, total_mga, total_payer, cbm, reste_payer, date, newEtat } = facture;

  const clickExtraCharge = () => {
    onOpen()
  }

  return (
    <Card {...other}>
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          <Stack direction="row" spacing={2}>
            <Avatar alt={nom} src={nom} />
            <Box sx={{ minWidth: 300, flexGrow: 1 }}>
              <div>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap >
                  {nom} {prenom}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap >
                  {spm}
                </Typography>
              </div>
              <div>
                <Typography variant="subtitle2" noWrap display="inline">
                  Date :{' '}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap display="inline" >
                  {newDate(date)}
                </Typography>
              </div>
            </Box>

            <Box sx={{ pr: 3 }}>
              <div>
                <Typography variant="subtitle2" noWrap display="inline">
                  {ref}
                </Typography>
              </div>
              <div>
                {reste_payer > 0 && <Label color="error" size="small">non payé</Label>}
                {reste_payer < 0 && <Label color="warning" size="small">trop perçue </Label>}
                {reste_payer === 0 && <Label color="success" size="small">payé </Label>}
              </div>
            </Box>
          </Stack>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>NOMBRE</TableCell>
                <TableCell>DESCRIPTION</TableCell>
                <TableCell>VOLUME</TableCell>
                <TableCell align="center">UNITE CBM</TableCell>
                <TableCell align="center">EXTRA CHARGE
                  <IconButton onClick={clickExtraCharge}>
                    <Iconify icon="bi:plus-circle" />
                  </IconButton>
                </TableCell>
                <TableCell align="right">TOTAL</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>{colis}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{cbm}</TableCell>
                <TableCell align="center">{uc}</TableCell>
                <TableCell align="center">{formatterMontant(extra_charge)}</TableCell>
                <TableCell align="right" >${formatterMontant(total_usd)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary' }}>Taux de change MGA</TableCell>
                <TableCell align="right">{formatterMontant(tv)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary' }}>
                  <Typography variant="subtitle2" noWrap>
                    Total MGA
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" noWrap>
                    {formatterMontant(total_mga)}
                  </Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary' }}>
                  <Typography variant="subtitle2" noWrap>
                    Total payé
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" noWrap>
                    {formatterMontant(total_payer)}
                  </Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary' }}>
                  <Typography variant="subtitle2" noWrap>
                    Reste à payer
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" noWrap>
                    {formatterMontant(reste_payer)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
      </Box>
    </Card>
  );
}

Facture.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  facture: PropTypes.object,
  onOpen: PropTypes.func,
};
