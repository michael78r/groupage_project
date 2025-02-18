import { useState, useEffect } from 'react';
import React from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';// import { users } from '../../../_mock/user';
import TableNoData from './table-no-data';
import FactureTableToolbar from './facture-table-toolbar';
import FactureTableHead from './facture-table-head';
import FactureTableRow from './facture-table-row';
import { filterFacture, getComparator } from '../../components/table/utils';
import Scrollbar from '../../components/scrollbar';
// ----------------------------------------------------------------------

export default function FactureTable({ factures }) {


  const [facture, setFacture] = useState(factures);

  const facture_copie = factures;

  const [loading_table, setLoadingT] = useState(true);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('nom');

  const [filterName, setFilterName] = useState('');

  const [tabValue, setTabValue] = useState('tous');

  const onTabValue = (value) => {
    setTabValue(value)
  }

  useEffect(() => {
    setFacture(factures);

    if (factures.length > 0) {
      setLoadingT(false)
    }
    else {
      console.log("tsy metyyy")
    }
  }, [factures]);


  const dataFiltered = filterFacture({
    inputData: facture,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const payer = facture_copie.filter(item => item.reste_a_payer == 0).length,
    nonpayer = facture_copie.filter(item => item.reste_a_payer > 0).length,
    avoir = facture_copie.filter(item => item.reste_a_payer < 0).length,
    all = facture_copie.length;

  const no_resultat = !dataFiltered.length && !loading_table && !filterName;

  const notFound = !dataFiltered.length && !!filterName;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };



  const changeTabValue = (newValue) => {
    let new_facture = [];

    if (newValue === 'tous') {
      new_facture = [...facture_copie];
    } else if (newValue === 'payer') {
      new_facture = facture_copie.filter(item => item.reste_a_payer == 0);

    } else if (newValue === 'non_payer') {
      new_facture = facture_copie.filter(item => item.reste_a_payer > 0);
    }
    else if (newValue === 'trop_percu') {
      new_facture = facture_copie.filter(item => item.reste_a_payer < 0);
    }

    setTabValue(newValue);
    setFacture(new_facture);
    setPage(0)
  };

  useEffect(() => {
    changeTabValue(tabValue)
  }, [tabValue])


  return (

    <Card>
      <FactureTableToolbar
        filterName={filterName}
        onFilterName={handleFilterByName}
        tabValue={tabValue}
        onTabValue={onTabValue}
        loading={loading_table}
        n_all={all}
        n_payer={payer}
        n_nonpayer={nonpayer}
        n_avoir={avoir}
      />
      <Scrollbar>
      <TableContainer sx={{ overflow: 'unset' }}>
        <Table sx={{ minWidth: 800 }}>
          <FactureTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleSort}
            headLabel={[
              { id: 'nom', label: 'Nom & Shipping Mark' },
              { id: 'reference_facture', label: 'Reference' },
              { id: 'nombre_package', label: 'Colis' },
              { id: 'cbm', label: 'Volume' },
              { id: 'extra_charge', label: 'Extra charge', align: 'right' },
              { id: 'total', label: 'Total USD', align: 'right' },
              { id: 'mga', label: 'Total MGA', align: 'right' },
              { id: 'payer', label: 'Payé MGA', align: 'right' },
              { id: 'reste_a_payer', label: 'Reste MGA', align: 'right' },
              { id: 'etat', label: 'etat', align: 'center' },
              { id: '' },
            ]}
          />
          <TableBody>
            {dataFiltered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <FactureTableRow
                  key={row.id}
                  facture_id={row.id}
                  nom={row.nom}
                  cbm={row.cbm}
                  shipping_mark={row.shipping_mark}
                  reference_facture={row.reference_facture}
                  nombre_package={row.nombre_package}
                  unit_price={row.unit_price}
                  total={row.total}
                  taux_vente={row.taux_vente}
                  mga={row.mga}
                  extra_charge={row.extra_charge}
                  reste_a_payer={row.reste_a_payer}
                  payer={row.payer}
                />
              ))}

            {no_resultat && <TableNoData query={tabValue} />}

            {notFound && <TableNoData query={filterName} />}
          </TableBody>
        </Table>
      </TableContainer>
      </Scrollbar>

      <TablePagination
        page={page}
        component="div"
        count={facture.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
