import React from 'react';
import { formatterMontant } from '../../components/formatterMontant';
import {
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    TableHead,
    Table,
    IconButton,
    Card,
    CardHeader,
    Typography
} from '@mui/material';
import Iconify from '../../components/iconify/iconify';

export default function ExtraCharge({ ec, onSuprr, newEtat }) {

    const handleSuppr = (value) => {
        onSuprr(value)
    }

    return (
        <Card>
            <CardHeader title="Extra charges" />
            <TableContainer>
                <Table aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Intitule</TableCell>
                            <TableCell align="right">Montant</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {/* {newEtat == 1 && */}
                    {ec.map((e) => {
                        return (
                            <TableRow key={e.id}>
                                <TableCell>{e.intitule}</TableCell>
                                <TableCell align="right">{formatterMontant(e.montant)}</TableCell>
                                <TableCell align="right">
                                    {/* <IconButton onClick={() => handleedit(e)}>
                                        <Iconify icon="eva:edit-fill" />
                                    </IconButton> */}
                                    <IconButton onClick={() => handleSuppr(e.id)}>
                                        <Iconify icon="eva:trash-fill" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })
                    }
                    {/* {(ec.length === 0 || newEtat == 2) && */}
                    {(ec.length === 0) &&
                        <TableRow>
                            <TableCell align="center" colSpan={3}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap display="inline" >
                                    Aucun résultat
                                </Typography>
                            </TableCell>
                        </TableRow>
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}