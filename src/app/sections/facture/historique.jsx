import React from "react";
import {
    Paper,
    Card,
    Table,
    TableContainer,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Typography
} from '@mui/material';
import { formatterMontant } from "../../components/formatterMontant";

export default function Historique({ historique }) {
    return (
        <Card>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Reference facture</TableCell>
                            <TableCell align="right">Montant</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {historique.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.date}</TableCell>
                                <TableCell align="right">{row.reference_facture}</TableCell>
                                <TableCell align="right">{formatterMontant(row.montant)}</TableCell>
                                <TableCell align="right">{row.etat}</TableCell>
                            </TableRow>
                        ))}
                        {historique.length === 0 && (
                            <TableRow>
                                <TableCell align="center" colSpan={4} sx={{ py: 3 }}>
                                    <Paper sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" paragraph>
                                            Aucun résultat
                                        </Typography>
                                    </Paper>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
}
