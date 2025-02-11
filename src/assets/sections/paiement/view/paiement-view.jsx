import React, { useEffect, useState } from 'react';
import { useHref } from 'react-router-dom';
import {
    Container,
    Typography,
    Skeleton,
    Stack,
    Chip,
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    InputAdornment,
    Button,
    Fab,
    IconButton,
    Box,
} from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import Swal from 'sweetalert2';
import axios from 'axios';
import AlertMessage from '../../../components/alert/alertmessage';
import ExtraCharge from '../extra-charge';
import Paiement from '../paiement';
import Facture from '../details-facture';
import Reglement from '../reglement';
import Iconify from '../../../components/iconify/iconify';
import TableNoData from '../../proforma/table-no-data';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LoadingButton from '@mui/lab/LoadingButton';

// ----------------------------------------------------------------------

export default function PaiementView({ id }) {

    const [newEtat, setNewEtat] = useState(0)

    const [etat, setEtat] = useState(1)

    var [facture , setFacture] = useState({
        "id": 325,
        "client_id": 22,
        "manifest_id": 34,
        "reference_facture": "F24-4082",
        "nombre_package": 3,
        "cbm": "1.95",
        "unit_price": "500.00",
        "extra_charge": "0.00",
        "total": "975.00",
        "mga": "5070000.00",
        "reste_a_payer": 0,
        "paye": "5070000.00",
        "nom": "Alexandre ",
        "prenom": "Simons",
        "shipping_mark": "SM-1006",
        "email": "xavi@gmail.com",
        "phone": "+261 34 65 215 86",
        "del": "2024-06-11",
        "taux_vente": "5200.00"
    })

    const [isLoading_title, setIsLoading_title] = useState(false)

    const [ec, setEc] = useState([
        {
            "id": 232,
            "intitule": "Frais de livraison",
            "manifestId": 34,
            "clientId": 27,
            "montant": "50.00",
            "ident": "facture"
        }])

    const [mad, setMad] = useState([])

    const [isLoading_reglement, setIsLoading_reglement] = useState(false)

    const [isLoading_extracharge, setIsLoading_extracharge] = useState(false)

    const [isLoading_mad, setIsLoading_mad] = useState(true)

    const [loadingPayement, setLoadingPayement] = useState(false)

    const [alertOpen, setAlertOpen] = useState(false);

    const [alertType, setAlertType] = useState('success');

    const [alertMessage, setAlertMessage] = useState('');

    const [open, setOpen] = useState(false);

    const [label, setLabel] = useState('');

    const [montant, setMontant] = useState('')

    const [checked, setChecked] = useState([]);

    const [montantPaiement, setMontantPaiement] = useState('');

    const [modePaiement, setModePaiement] = useState('');

    const [referencePaiement, setReferencePaiement] = useState('')

    const [motif, setMotif] = useState('');

    const href = useHref(`/generer_pdf?id=${facture}`);

    const [isPdf, setIsPdf] = useState(true)

    const [fields, setFields] = useState([{ label: '', montant: '' }]);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const totalAmount = fields.reduce((acc, field) => {
            return acc + (parseFloat(field.montant) || 0);
        }, 0);
        setTotal(totalAmount);
    }, [fields]);

    const generer_pdf_ = () => {
        localStorage.setItem('facture', JSON.stringify(facture));
        window.location.href = '/generer_pdf';
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        //fetchFacture();
        fecthMontant_a_deduire()
    }, [etat]);


    // const fetchFacture = async () => {
    //     try {
    //         const response = await axios.get(`/api/facture/${id}`);
    //         setFacture(response.data);
    //         setIsLoading_title(false);
    //         fetchEC(response.data.manifest_id, response.data.client_id);
    //         fecthMontant_a_deduire(response.data.client_id, response.data.reference_facture)
    //         checkEtat(response.data.manifest_id)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const checkEtat = async (manifestId) => {
        if (manifestId != undefined) {
            try {
                const response = await axios.get(`/api/check_etat/${manifestId}`);
                setNewEtat(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const fetchEC = async (manifestId, clientId) => {
        try {
            const response = await axios.get(`/api/ /${manifestId}/${clientId}`);
            setEc(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // const fecthMontant_a_deduire = async (clientId, reference_facture) => {
    //     try {
    //         const response = await axios.get(`/api/montant_a_deduire/${clientId}/${reference_facture}`);
    //         setMad(response.data);
    //         setIsLoading_mad(false)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const fecthMontant_a_deduire = () => {
        try {
            // const response = await axios.get(`/api/montant_a_deduire/${clientId}/${reference_facture}`);
            setMad([]);
            setIsLoading_mad(false)
        } catch (error) {
            console.log(error);
        }
    }


    const onExtraCharge = () => {
        setIsLoading_extracharge(true)
        setTimeout(() => {
            facture.extra_charge = parseFloat(facture.extra_charge) + parseFloat(total)
            facture.total = (parseFloat(facture.cbm) * parseFloat(facture.unit_price)) + parseFloat(facture.extra_charge)
            facture.mga = ((parseFloat(facture.cbm) * parseFloat(facture.unit_price)) + parseFloat(facture.extra_charge)) * parseFloat(facture.taux_vente)
            facture.reste_a_payer = parseFloat(facture.mga) - parseFloat(facture.paye)
            setIsLoading_extracharge(false)
            setFacture(facture)
            setAlertType('success');
            setAlertMessage("Extra charge ajout avec succès");
            setAlertOpen(true);
            handleClose()
            setFields([])
        }, 1000)

    }


    const paiement = () => {
        setLoadingPayement(true)
        setTimeout(() => {
            facture.paye = parseFloat(facture.paye) + parseFloat(montantPaiement)
            facture.reste_a_payer = parseFloat(facture.mga) - parseFloat(facture.paye)
            setFacture(facture)
            setAlertType('success');
            setAlertMessage("Paiement effectué");
            setAlertOpen(true);
            setLoadingPayement(false)
        }, 1000)

    }

    const deleteExtraCharge = (id) => {
        Swal.fire({
            title: 'Voulez-vous vraiment supprimer ?',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            setAlertType('error');
            setAlertMessage("Vous ne pouvez pas supprimer cet extra charge");
            setAlertOpen(true);
        }
        )
    }

    // const onExtraCharge = () => {

    //     if (newEtat == 1) {
    //         setIsLoading_extracharge(true)
    //         axios.post('api/extra_charge', {
    //             'data': fields,
    //             'manifest_id': facture.manifest_id,
    //             'client_id': facture.client_id,
    //             'facture_id' : facture.id,
    //             'ident': "facture"
    //         })
    //             .then(function (response) {
    //                 console.log(response.data)
    //                 setIsLoading_extracharge(false)
    //                 setMontant('')
    //                 setAlertType('success');
    //                 setAlertMessage("Extra charge ajout avec succès");
    //                 setAlertOpen(true);
    //                 //fetchFacture()
    //             })
    //             .catch(function (error) {
    //                 alert(error)
    //                 console.log(error)
    //                 //setIsLoading_extracharge(false)
    //             })
    //     }

    //     else if (newEtat == 2) {
    //         setIsLoading_extracharge(true)
    //         axios.post('api/new_facture', {
    //             'data': fields,
    //             'manifest_id': facture.manifest_id,
    //             'client_id': facture.client_id,
    //             'ident': "avoir"
    //         })
    //             .then(function (response) {
    //                 console.log(response.data)
    //                 setIsLoading_extracharge(false)
    //                 setMontant('')
    //                 setAlertType('success');
    //                 setAlertMessage("NOUVELLE FACTURE ETABLIE");
    //                 setAlertOpen(true);
    //             })
    //             .catch(function (error) {
    //                 alert(error)
    //                 console.log(error)
    //                 //setIsLoading_extracharge(false)
    //             })
    //     }


    // }

    const en_deduire = () => {
        setIsLoading_reglement(true)
        axios.post('api/en_deduire', {
            'checked': checked,
            'new_facture': facture.id
        })
            .then(function (response) {
                setChecked([])
                setAlertType('success');
                setAlertMessage("Montant à deduire avec succèss");
                setAlertOpen(true);
                //fetchFacture()
                setIsLoading_reglement(false)
            })
            .catch(function (error) {
                setAlertType('error');
                setAlertMessage(error);
                setAlertOpen(true);
            })
    }



    // const paiement = () => {
    //     setLoadingPayement(true)
    //     let data = new FormData()
    //     data.append("mode_paiement", modePaiement)
    //     data.append("montant", montantPaiement)
    //     data.append("reference", referencePaiement)
    //     data.append("facture_id", facture.id)
    //     data.append("motif", motif)
    //     axios.post('/api/paiement', data)
    //         .then(function () {
    //             setModePaiement('')
    //             setMontantPaiement('')
    //             setReferencePaiement('')
    //             setMotif('')
    //             //fetchFacture()
    //             setAlertType('success');
    //             setAlertMessage("Paiement effectué");
    //             setAlertOpen(true);
    //             setLoadingPayement(false)
    //         })
    //         .catch(function (error) {
    //             setAlertType('error');
    //             setAlertMessage(error);
    //             setAlertOpen(true);
    //         });
    // }



    // const deleteExtraCharge = (id) => {
    //     Swal.fire({
    //         title: 'Voulez-vous vraiment supprimer ?',
    //         showCancelButton: true,
    //         confirmButtonText: 'Oui, supprimer!',
    //         cancelButtonText: 'Annuler'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             if (newEtat == 1) {
    //                 axios.delete(`/api/extra_charge/${id}/${facture.id}`)
    //                     .then(function (response) {
    //                         //fetchFacture()
    //                         fetchEC()
    //                         setAlertType('success');
    //                         setAlertMessage("Charge supprimer");
    //                         setAlertOpen(true);
    //                     })
    //                     .catch(function (error) {
    //                         setAlertType('error');
    //                         setAlertMessage(error);
    //                         setAlertOpen(true);
    //                     })
    //             }
    //             else if (newEtat == 2) {
    //                 axios.delete(`/api/facture_avoir/${id}`)
    //                     .then(function (response) {
    //                         console.log(response.data)
    //                         setAlertType('success');
    //                         setAlertMessage("FACTURE D'AVOIR ETABLIE");
    //                         setAlertOpen(true);
    //                     })
    //                     .catch(function (error) {
    //                         setAlertType('error');
    //                         setAlertMessage(error);
    //                         setAlertOpen(true);
    //                     })
    //             }

    //         }
    //     })
    // }


    const handleChecked = (id, reference_facture, reste_a_payer) => () => {
        const currentIndex = checked.findIndex(item => item.id === id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push({ id, reference_facture, reste_a_payer });
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };


    const handleAddFields = () => {
        setFields([...fields, { label: '', montant: '' }]);
    };

    const handleRemoveFields = (index) => {
        const values = [...fields];
        values.splice(index, 1);
        setFields(values);
    };

    const handleChange = (index, event) => {
        const values = [...fields];
        if (event.target.name === "label") {
            values[index].label = event.target.value;
        } else {
            values[index].montant = event.target.value;
        }
        setFields(values);
    };


    console.log(fields)


    return (

        <Container>
            {alertOpen && <AlertMessage
                open={alertOpen}
                message={alertMessage}
                type={alertType}
                onClose={() => setAlertOpen(false)} />}
            <Stack direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={3}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4">
                        Transaction des soldes et paiements des factures:
                    </Typography>
                    {isLoading_title ?
                        <Skeleton variant="text" width={100} style={{ marginLeft: '8px' }} />
                        :
                        <Chip avatar={<Avatar>F</Avatar>} label={facture.reference_facture} />
                    }
                </div>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                <Box sx={{ m: 1 }}>
                    <Fab disabled={facture.length == 0}
                        onClick={(e) => generer_pdf_()}
                        size="small"
                        variant="extended">
                        <PictureAsPdfRoundedIcon sx={{ width: 15, mr: 1 }} />
                        Export pdf
                    </Fab>
                </Box>
            </Stack>
            <Grid container spacing={3}>

                <Grid xs={12} md={12} lg={12}>
                    <Facture
                        title={`Ref: ${facture.reference_facture}`}
                        onOpen={handleClickOpen}
                        facture=
                        {
                            {
                                facture_id: facture.id,
                                client_id: facture.id,
                                manifest_id: facture.manifest_id,
                                uc: facture.unit_price,
                                spm: facture.shipping_mark,
                                date: facture.del,
                                tv: facture.taux_vente,
                                ref: facture.reference_facture,
                                nom: facture.nom,
                                prenom: facture.prenom,
                                colis: facture.nombre_package,
                                cbm: facture.cbm,
                                extra_charge: facture.extra_charge,
                                total_usd: facture.total,
                                total_mga: facture.mga,
                                total_payer: facture.paye,
                                reste_payer: facture.reste_a_payer,
                                description: "colis",
                                newEtat: newEtat
                            }
                        }
                    />
                </Grid>
                <Grid xs={12} md={12} lg={12}>
                    <Reglement
                        mad={mad}
                        handleChecked={handleChecked}
                        onPaye={paiement}
                        enDeduire={en_deduire}
                        checked={checked}
                        reste_payer={facture.reste_a_payer}
                        loading={isLoading_reglement}
                        loading_mad={isLoading_mad}
                        newEtat={newEtat} />
                </Grid>
                <Grid xs={12} md={12} lg={12}>
                    <Paiement
                        modePaiement={modePaiement}
                        setModePaiement={setModePaiement}
                        referencePaiement={referencePaiement}
                        setReferencePaiement={setReferencePaiement}
                        montantPaiement={montantPaiement}
                        setMontantPaiement={setMontantPaiement}
                        motif={motif}
                        setMotif={setMotif}
                        onPayer={paiement}
                        loading={loadingPayement}
                        newEtat={newEtat}
                    />
                </Grid>

                <Grid xs={12} md={6} lg={6}>
                    <ExtraCharge
                        ec={ec}
                        onSuprr={deleteExtraCharge}
                        newEtat={newEtat}
                    />
                </Grid>


            </Grid>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Extras Charges</DialogTitle>
                {fields.map((field, index) => (
                    <DialogContent key={index}>
                        <TextField
                            name="label"
                            value={field.label}
                            onChange={(e) => handleChange(index, e)}
                            label="Libelle"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '25ch' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>
                            }}
                        />
                        <TextField
                            name="montant"
                            type="number"
                            value={field.montant}
                            onChange={(e) => handleChange(index, e)}
                            label="Montant"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '25ch' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                            }}
                        />
                        {index != 0 && <IconButton onClick={() => handleRemoveFields(index)}>
                            <Iconify icon="eva:trash-fill" />
                        </IconButton>}

                    </DialogContent>
                ))}


                <DialogActions>
                    <Typography variant="subtitle1" noWrap display="inline">
                        Total Montant: {' '}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }} noWrap display="inline" >
                        ${total.toFixed(2)}
                    </Typography>
                    <IconButton onClick={handleAddFields}>
                        <Iconify icon="bi:plus-circle" />
                    </IconButton>
                    {/* <Button onClick={onExtraCharge} variant="contained" size="small">
                        Ajouter
                    </Button> */}
                    <LoadingButton
                        //disabled={!montantPaiement}
                        color="primary"
                        onClick={onExtraCharge}
                        loading={isLoading_extracharge}
                        loadingPosition="start"
                        startIcon={<RestartAltIcon />}
                        variant="contained"
                        size="small"
                    >
                        <span>Ajouter</span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
