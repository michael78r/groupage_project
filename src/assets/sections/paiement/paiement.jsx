import React from 'react';
import {
    Box,
    Card,
    CardHeader,
    Divider,
    TextField,
    Stack,
    MenuItem,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    FormControl,
    Skeleton,
    Typography
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LoadingButton from '@mui/lab/LoadingButton';
import Scrollbar from '../../components/scrollbar'
import { formatterMontant } from '../../components/formatterMontant';



export default function Paiement({
    modePaiement,
    setModePaiement,
    referencePaiement,
    setReferencePaiement,
    montantPaiement,
    setMontantPaiement,
    motif,
    setMotif,
    onPayer,
    loading,
    newEtat }) {

    const handlePayer = () => {
        onPayer()
    }

    const valeurs = [
        {
            value: 'Espece',
            label: 'Espece',
        },
        {
            value: 'Chèque',
            label: 'Chèque',
        },
        {
            value: 'Carte de crédit',
            label: 'Carte de crédit',
        },
        {
            value: 'Paiement mobile',
            label: 'Paiement mobile',
        },
        {
            value: 'Virement bancaire',
            label: 'Virement bancaire',
        },
    ];

    return (
        <Card>
            <CardHeader title="Formulaire de paiement" subheader="Utiliser ce formulaire pour effectuer un paiement. Veuillez spécifier le champ nécessaire" />


            <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                <Stack direction="row" spacing={2}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

                        {/* {newEtat == 0 &&
                            <>
                                <div> <Skeleton variant="text" width={250} height={70} /></div>
                                <div> <Skeleton variant="text" width={250} height={70} style={{ marginLeft: '12px' }} /></div>
                                <div> <Skeleton variant="text" width={250} height={70} style={{ marginLeft: '12px' }} /></div>
                                <div> <Skeleton variant="text" width={500} height={180} /></div>
                            </>
                        } */}

                        {/* {newEtat == 1 && */}
                            <>
                                <div>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        sx={{ m: 1, width: '25ch' }}
                                        label="Mode de paiement"
                                        defaultValue="None"
                                        value={modePaiement}
                                        onChange={(event) => { setModePaiement(event.target.value) }}
                                    >
                                        {valeurs.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div>
                                    <TextField
                                        label="Reference"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '25ch' }}
                                        value={referencePaiement}
                                        onChange={(event) => { setReferencePaiement(event.target.value) }}
                                    />
                                </div>
                                <div>
                                    <FormControl>
                                        <InputLabel htmlFor="outlined-adornment-amount">Montant</InputLabel>
                                        <OutlinedInput
                                            sx={{ m: 1, width: '25ch' }}
                                            placeholder=''
                                            value={montantPaiement}
                                            onChange={(event) => { setMontantPaiement(event.target.value) }}
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">MGA</InputAdornment>}
                                            label="Montant"
                                        />
                                    </FormControl>
                                </div>
                                <div>
                                    <TextField
                                        label="Details"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '50ch' }}
                                        value={motif}
                                        onChange={(event) => { setMotif(event.target.value) }}
                                        multiline
                                        rows={3}
                                    />
                                </div>
                            </>
                        {/* }
                        {newEtat == 2 && <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap display="inline" >
                            Aucun resultat
                        </Typography>} */}
                    </Box>
                </Stack>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Box sx={{ p: 4, textAlign: 'left' }}>
                {/* {newEtat == 1 && */}
                    <LoadingButton
                        disabled={!montantPaiement}
                        color="primary"
                        onClick={handlePayer}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<RestartAltIcon />}
                        variant="contained"
                    >
                        <span>Payer</span>
                    </LoadingButton>
                    {/* } */}

            </Box>

        </Card>
    );

}
