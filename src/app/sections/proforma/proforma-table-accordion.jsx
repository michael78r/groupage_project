import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Iconify from '../../components/iconify/iconify';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Label from '../../components/label';
import { formatterMontant } from '../../components/formatterMontant';


export default function ProformaTableAccordion(props) {
  const { row, onDeletecolis, onHandleOpen } = props;
  const [open, setOpen] = useState(true);

  const handleSuppr = (id) => {
    onDeletecolis(id)
  }

  const handleedit = (cl) => {
    onHandleOpen(cl)
  }

  return (
    <React.Fragment>

      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={row.nom} src={row.nom} />
            <Typography variant="subtitle2" noWrap>
              {row.nom} {row.shipping_mark}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">{row.colis.length}</TableCell>
        <TableCell align="center"><Label color='primary'>{`${row.cbm}m³`}</Label></TableCell>
        <TableCell align="right">{formatterMontant(row.total)}</TableCell>
        <TableCell align="right">{formatterMontant(row.mga)}</TableCell>
        <TableCell></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Colis
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Reference</TableCell>
                    <TableCell>Nature</TableCell>
                    <TableCell>Volume</TableCell>
                    <TableCell>Poids</TableCell>
                    <TableCell align="right"></TableCell>
                    {/* <TableCell></TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.colis.map((cl) => (
                    <TableRow hover key={cl.date}>
                      <TableCell component="th" scope="row">
                        {cl.date}
                      </TableCell>
                      <TableCell>{cl.reference}</TableCell>
                      <TableCell>{cl.nature}</TableCell>
                      <TableCell>
                        {formatterMontant(cl.cbm) }
                      </TableCell>
                      <TableCell>
                        {formatterMontant(cl.poids)}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleedit(cl)}>
                          <Iconify icon="eva:edit-fill" />
                        </IconButton>
                        <IconButton onClick={() => handleSuppr(cl.id)}>
                          <Iconify icon="eva:trash-fill" />
                        </IconButton>
                      </TableCell>
                      {/* <TableCell></TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

    </React.Fragment>
  );
}

  // ProformaTableAccordion.propTypes = {
  //   row: PropTypes.shape({
  //     calories: PropTypes.number.isRequired,
  //     carbs: PropTypes.number.isRequired,
  //     fat: PropTypes.number.isRequired,
  //     history: PropTypes.arrayOf(
  //       PropTypes.shape({
  //         amount: PropTypes.number.isRequired,
  //         customerId: PropTypes.string.isRequired,
  //         date: PropTypes.string.isRequired,
  //       }),
  //     ).isRequired,
  //     name: PropTypes.string.isRequired,
  //     price: PropTypes.number.isRequired,
  //     protein: PropTypes.number.isRequired,
  //   }).isRequired,
  // };