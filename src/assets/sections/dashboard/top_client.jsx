import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card'
import { Toolbar, Typography, Stack, Avatar, TablePagination, CardHeader, CardContent } from '@mui/material';
import Label from '../../components/label';


export default function TopClient({ title, list }) {

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  return (

    <Card>
      <CardHeader title={title} />
      <CardContent>
        {/* <Toolbar
        sx={{
          height: 42,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography component="div" variant="subtitle1">
          Meilleur Client de l'année
        </Typography>
      </Toolbar> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Nom</TableCell>
                <TableCell align="right">Shipping mark</TableCell>
                {/* <TableCell align="right">Pays</TableCell> */}
                <TableCell align="right">Total CBM</TableCell>
                <TableCell align="center">Rang</TableCell>
                <TableCell align="center">Pourcentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  <TableCell></TableCell>
                  <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar alt={row.nom} src={row.nom} sx={{ width: 25, height: 25 }} />
                      <Typography variant="subtitle2" noWrap>
                        {row.nom} {row.prenom}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">{row.shipping_mark}</TableCell>
                  {/* <TableCell align="right">{row.email}</TableCell> */}
                  <TableCell align="right">{row.total_cbm} m³</TableCell>
                  <TableCell align="center">
                    {(index + 1) === 1 && <Label color='primary'>{index + 1}</Label>}
                    {(index + 1) === 2 && <Label color='error'>{index + 1}</Label>}
                    {(index + 1) === 3 && <Label color='success'>{index + 1}</Label>}
                    {(index + 1) != 1 && (index + 1) != 2 && (index + 1) != 3 && <Label color='warning'>{index + 1}</Label>}
                  </TableCell>
                  <TableCell align="center">{row.pourcentage} %</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      </CardContent>

      <TablePagination
        page={page}
        component="div"
        count={list.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </Card>
  );
}