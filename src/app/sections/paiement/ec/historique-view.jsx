import { useState, useEffect } from 'react';
import React from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';// import { users } from '../../../_mock/user';
import TableNoData from './table-no-data';
import { filterHistorique } from '../../../components/table/utils';
import { getComparator } from '../../../components/table/utils';
import HistoriqueTableHead from './historique-table-head';
import HistoriqueTableToolbar from './historique-table-toolbar';
import HistoriqueTableRow from './historique-table-row';
import axios from 'axios';
// ----------------------------------------------------------------------

export default function HistoriqueView({ id }) {

    const [etat, setEtat] = useState(1)

    const [historique, setHistorique] = useState([]);

    const [historique_copie, setHistorique_copie] = useState([])

    const [page, setPage] = useState(0);

    const [loading, setLoading] = useState(true)

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('date');

    const [tabValue, setTabValue] = useState('tous');

    const onTabValue = (value) => {
        setTabValue(value)
    }

    useEffect(() => {
        fetchHistorique()
    }, [etat])

    const fetchHistorique = () => {
        axios.get(`/api/paiement/${id}`)
            .then(function (response) {
                setHistorique(response.data)
                setHistorique_copie(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
            .finally(() =>
                setLoading(false)
            )
    };

    const dataFiltered = filterHistorique({
        inputData: historique,
        comparator: getComparator(order, orderBy)
    });


    const avoir = historique_copie.filter(item => item.etat === "avoir").length,
        paiement = historique_copie.filter(item => item.etat === "paiement").length,
        transfert = historique_copie.filter(item => item.etat === "transfert").length,
        deduit = historique_copie.filter(item => item.etat === "deduit").length,
        all = historique_copie.length;

    //const notFound = !dataFiltered.length && !!filterName;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const changeTabValue = (newValue) => {
        let new_historique = [];

        if (newValue === 'tous') {
            new_historique = [...historique_copie];
        } else if (newValue === 'paiement') {
            new_historique = historique_copie.filter(item => item.etat === "paiement");

        } else if (newValue === 'avoir') {
            new_historique = historique_copie.filter(item => item.etat === "avoir");
        }
        else if (newValue === 'deduit') {
            new_historique = historique_copie.filter(item => item.etat === "deduit");
        }
        else if (newValue === 'transfert') {
            new_historique = historique_copie.filter(item => item.etat === "transfert");
        }

        setTabValue(newValue);
        setHistorique(new_historique);
        setPage(0)
    };

    useEffect(() => {
        changeTabValue(tabValue)
    }, [tabValue])


    return (

        <Card>
            {/* <HistoriqueTableToolbar
                tabValue={tabValue}
                onTabValue={onTabValue}
                all={all}
                deduit={deduit}
                paiement={paiement}
                transfert={transfert}
                avoir={avoir}
                loading={loading}
            /> */}
            <TableContainer sx={{ overflow: 'unset' }}>
                <Table sx={{ minWidth: 800 }}>
                    <HistoriqueTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleSort}
                        headLabel={[
                            { id: 'mode_paiement', label: 'Mode de paiement' },
                            { id: 'reference', label: 'Reference' },
                            { id: 'date', label: 'Date' },
                            { id: 'montant', label: 'Montant' },
                            { id: 'etat', label: 'etat', align: 'right' },
                            // { id: '' },
                        ]}
                    />
                    <TableBody>
                        {dataFiltered
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <HistoriqueTableRow
                                    key={row.id}
                                    mode_p = {row.modeDePaiement}
                                    reference = {row.reference}
                                    date = {row.date}
                                    montant = {row.montant}
                                    etat = {row.etat}
                                />
                            ))}

                        {/* {no_resultat && <TableNoData query={tabValue} />} */}

                        {/* {notFound && <TableNoData query={filterName} />} */}
                    </TableBody>
                </Table>
            </TableContainer>


            <TablePagination
                page={page}
                component="div"
                count={dataFiltered.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
}
