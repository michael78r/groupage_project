import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import axios from "axios";
import { formatterMontant } from "../../../components/formatterMontant";
import { Container, Stack, Typography, Divider, MenuItem, Menu, Button } from '@mui/material';
import { listClasses } from '@mui/material/List';
import { getMois } from "../../../components/table/utils";

import ChiffreDaffaire from "../app_evolution_ca";
import Iconify from "../../../components/iconify/iconify";
import AppWidgetCA from "../app-widget-ca";
import AppWidget from "../app-widget";
import MeilleurClientDuMois from "../app_mc_mois";
import MeilleurClientAnnee from "../app_mc_annee";
import TopClient from "../top_client";


const ANNEES = [];

const anneeActuel = new Date().getFullYear()
for (let annee = 2017; annee <= anneeActuel; annee++) {
    ANNEES.push(annee);
}

const moisActuel = new Date().getMonth() + 1

const jourActuel = new Date().getDay()

const MONTHS = [
    { value: 1, label: 'Janvier' },
    { value: 2, label: 'Février' },
    { value: 3, label: 'Mars' },
    { value: 4, label: 'Avril' },
    { value: 5, label: 'Mai' },
    { value: 6, label: 'Juin' },
    { value: 7, label: 'Juillet' },
    { value: 8, label: 'Août' },
    { value: 9, label: 'Septembre' },
    { value: 10, label: 'Octobre' },
    { value: 11, label: 'Novembre' },
    { value: 12, label: 'Décembre' }
];


export default function DashboardView() {

    const [loadingTopClientA, setLoadingTopClientA] = useState(true)

    const [loadingTopClientM, setLoadingTopClientM] = useState(true)

    const [loadingResult, setLoadingResult] = useState(true)

    const [loadingCA, setLoadingCA] = useState(true)

    const [result_copie, setResultCopie] = useState([])

    const [top_client, setTop_client] = useState([])

    const [top_client_du_mois, setTop_client_du_mois] = useState([])

    const [top_client_du_mois_copie, setTop_client_du_mois_copie] = useState([])

    const [ca_annee, setCA_annee] = useState([]);

    const [a, setAnnee] = useState(anneeActuel)

    const [m, setMois] = useState(moisActuel)

    const [open, setOpen] = useState(null);

    const [openMonth, setOpenMonth] = useState(null);

    const [result, setResult] = useState({
        annee: 2000,
        mois: 1,
        Client_actif: 0,
        Conteneur_cloture: 0,
        Chiffre_d_Affaire: '0.00'
    });

    const evolution_ca = {
        labels: [],
        series: [
            {
                name: 'Montant',
                type: 'column',
                fill: 'solid',
                data: [],
            },
        ],
    };

    useEffect(() => {
        getResult()
        getTopClient()
        getTopClientDuMois()
        fetchCa_annee()
    }, [a])

    useEffect(() => {
        if (result_copie.length > 0 || top_client_du_mois_copie > 0) {
            const resultat_du_mois = result_copie.filter(i => i.mois === m)[0];
            const client_du_mois = top_client_du_mois_copie.filter(i => i.mois === m)
            setResult(resultat_du_mois);
            setTop_client_du_mois(client_du_mois)
        }
    }, [m, result_copie, top_client_du_mois_copie]);

    const getTopClient = () => {
        setLoadingTopClientA(true)
        setTimeout(() => {
            setLoadingTopClientA(false)
            setTop_client([
                {
                    "pourcentage": "51.55",
                    "total_cbm": "9.17",
                    "client_id": 22,
                    "annee": 2024,
                    "id": 22,
                    "nom": "Alexandre ",
                    "photo": "avatar-3.jpg",
                    "shipping_mark": "SM-1006",
                    "email": "xavi@gmail.com",
                    "phone": "+261 34 65 215 86",
                    "prenom": "Simons"
                },
                {
                    "pourcentage": "20.40",
                    "total_cbm": "3.63",
                    "client_id": 144,
                    "annee": 2024,
                    "id": 144,
                    "nom": "Tommy",
                    "photo": "avatar-3.jpg",
                    "shipping_mark": "SM-1005",
                    "email": "pan@gmail.com",
                    "phone": "+261 34 65 215 86",
                    "prenom": "Martial"
                },
                {
                    "pourcentage": "13.43",
                    "total_cbm": "2.39",
                    "client_id": 27,
                    "annee": 2024,
                    "id": 27,
                    "nom": "Isabelle ",
                    "photo": "avatar-1.jpg",
                    "shipping_mark": "SM-1003",
                    "email": "eve@gmail.com",
                    "phone": "+261 34 65 215 86",
                    "prenom": "Martinez"
                },
                {
                    "pourcentage": "11.75",
                    "total_cbm": "2.09",
                    "client_id": 26,
                    "annee": 2024,
                    "id": 26,
                    "nom": "Eve Marie",
                    "photo": "avatar-2.jpg",
                    "shipping_mark": "SM-1004",
                    "email": "peter@gmail.com",
                    "phone": "+261 34 65 215 86",
                    "prenom": "Gonzalez"
                },
                {
                    "pourcentage": "2.87",
                    "total_cbm": "0.51",
                    "client_id": 138,
                    "annee": 2024,
                    "id": 138,
                    "nom": "Dupont",
                    "photo": "",
                    "shipping_mark": "SM-1007",
                    "email": "marie.dupont@example.com",
                    "phone": "+33 6 12 34 56 78",
                    "prenom": "Marie"
                }
            ])
        }, 300)
    }

    // const getTopClient = () => {
    //     setLoadingTopClientA(true)
    //     axios.get(`/api/top_client/${a}`)
    //         .then(function (response) {
    //             setTop_client(response.data)
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //         })
    //         .finally(() => setLoadingTopClientA(false));
    // };

    const getTopClientDuMois = () => {
        setLoadingTopClientM(true)
        setTimeout(() => {
            setLoadingTopClientM(false)
            setTop_client_du_mois_copie([
                {
                    "total_cbm": "4.14",
                    "client_id": 22,
                    "annee": 2024,
                    "mois": 6,
                    "nom": "Alexandre ",
                    "prenom": "Simons"
                },
                {
                    "total_cbm": "3.50",
                    "client_id": 144,
                    "annee": 2024,
                    "mois": 6,
                    "nom": "Tommy",
                    "prenom": "Martial"
                },
                {
                    "total_cbm": "2.90",
                    "client_id": 22,
                    "annee": 2024,
                    "mois": 5,
                    "nom": "Alexandre ",
                    "prenom": "Simons"
                },
                {
                    "total_cbm": "2.39",
                    "client_id": 27,
                    "annee": 2024,
                    "mois": 6,
                    "nom": "Isabelle ",
                    "prenom": "Martinez"
                },
                {
                    "total_cbm": "1.19",
                    "client_id": 26,
                    "annee": 2024,
                    "mois": 5,
                    "nom": "Eve Marie",
                    "prenom": "Gonzalez"
                },
                {
                    "total_cbm": "0.90",
                    "client_id": 26,
                    "annee": 2024,
                    "mois": 6,
                    "nom": "Eve Marie",
                    "prenom": "Gonzalez"
                },
                {
                    "total_cbm": "0.85",
                    "client_id": 22,
                    "annee": 2024,
                    "mois": 2,
                    "nom": "Alexandre ",
                    "prenom": "Simons"
                },
                {
                    "total_cbm": "0.77",
                    "client_id": 22,
                    "annee": 2024,
                    "mois": 1,
                    "nom": "Alexandre ",
                    "prenom": "Simons"
                },
                {
                    "total_cbm": "0.51",
                    "client_id": 22,
                    "annee": 2024,
                    "mois": 3,
                    "nom": "Alexandre ",
                    "prenom": "Simons"
                },
                {
                    "total_cbm": "0.51",
                    "client_id": 138,
                    "annee": 2024,
                    "mois": 2,
                    "nom": "Dupont",
                    "prenom": "Marie"
                },
                {
                    "total_cbm": "0.13",
                    "client_id": 144,
                    "annee": 2024,
                    "mois": 5,
                    "nom": "Tommy",
                    "prenom": "Martial"
                }
            ])
        }, 300)
    };


    // const getTopClientDuMois = () => {
    //     setLoadingTopClientM(true)
    //     axios.get(`/api/top_client_du_mois/${a}`)
    //         .then(function (response) {
    //             setTop_client_du_mois_copie(response.data)
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //         })
    //         .finally(() => setLoadingTopClientM(false));
    // };

    const getResult = () => {
        setLoadingResult(true)
        setTimeout(() => {
            setResultCopie([
                {
                    "annee": 2024,
                    "mois": 1,
                    "Client_actif": 3,
                    "Conteneur_cloture": 0,
                    "Chiffre_d_Affaire": "0.00",
                    "f_non_paye": 0,
                    "f_trop_percu": 0
                },
                {
                    "annee": 2024,
                    "mois": 2,
                    "Client_actif": 3,
                    "Conteneur_cloture": 0,
                    "Chiffre_d_Affaire": "0.00",
                    "f_non_paye": 0,
                    "f_trop_percu": 0
                },
                {
                    "annee": 2024,
                    "mois": 3,
                    "Client_actif": 1,
                    "Conteneur_cloture": 0,
                    "Chiffre_d_Affaire": "0.00",
                    "f_non_paye": 1,
                    "f_trop_percu": 0
                },
                {
                    "annee": 2024,
                    "mois": 4,
                    "Client_actif": 0,
                    "Conteneur_cloture": 1,
                    "Chiffre_d_Affaire": "13338000.00",
                    "f_non_paye": 0,
                    "f_trop_percu": 0
                },
                {
                    "annee": 2024,
                    "mois": 5,
                    "Client_actif": 3,
                    "Conteneur_cloture": 1,
                    "Chiffre_d_Affaire": "13520000.00",
                    "f_non_paye": 2,
                    "f_trop_percu": 0
                },
                {
                    "annee": 2024,
                    "mois": 6,
                    "Client_actif": 5,
                    "Conteneur_cloture": 1,
                    "Chiffre_d_Affaire": "10600000.00",
                    "f_non_paye": 3,
                    "f_trop_percu": 1
                },
                {
                    "annee": 2024,
                    "mois": 7,
                    "Client_actif": 0,
                    "Conteneur_cloture": 0,
                    "Chiffre_d_Affaire": "0.00",
                    "f_non_paye": 0,
                    "f_trop_percu": 0
                },
                {
                    "annee": 2024,
                    "mois": 8,
                    "Client_actif": 0,
                    "Conteneur_cloture": 0,
                    "Chiffre_d_Affaire": "0.00",
                    "f_non_paye": 0,
                    "f_trop_percu": 0
                },
                {
                    "annee": 2024,
                    "mois": 9,
                    "Client_actif": 0,
                    "Conteneur_cloture": 0,
                    "Chiffre_d_Affaire": "0.00",
                    "f_non_paye": 0,
                    "f_trop_percu": 0
                },
                {
                    "annee": 2024,
                    "mois": 10,
                    "Client_actif": 0,
                    "Conteneur_cloture": 0,
                    "Chiffre_d_Affaire": "0.00",
                    "f_non_paye": 0,
                    "f_trop_percu": 0
                },
                {
                    "annee": 2024,
                    "mois": 11,
                    "Client_actif": 0,
                    "Conteneur_cloture": 0,
                    "Chiffre_d_Affaire": "0.00",
                    "f_non_paye": 0,
                    "f_trop_percu": 0
                },
                {
                    "annee": 2024,
                    "mois": 12,
                    "Client_actif": 0,
                    "Conteneur_cloture": 0,
                    "Chiffre_d_Affaire": "0.00",
                    "f_non_paye": 0,
                    "f_trop_percu": 0
                }
            ])

            setLoadingResult(false)
        }, 300)

    }

    // const getResult = () => {
    //     setLoadingResult(true)
    //     axios.get(`/api/tableau_de_bord/${a}`)
    //         .then(function (response) {
    //             setResultCopie(response.data)
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //         })
    //         .finally(() => setLoadingResult(false));
    // };

    const fetchCa_annee = () => {
        setLoadingCA(true)
        setTimeout(() => {
            setLoadingCA(false)
            setCA_annee([
                {
                    "montant": "0.00",
                    "annee": 2024,
                    "mois": 1
                },
                {
                    "montant": "0.00",
                    "annee": 2024,
                    "mois": 2
                },
                {
                    "montant": "0.00",
                    "annee": 2024,
                    "mois": 3
                },
                {
                    "montant": "13338000.00",
                    "annee": 2024,
                    "mois": 4
                },
                {
                    "montant": "13520000.00",
                    "annee": 2024,
                    "mois": 5
                },
                {
                    "montant": "10600000.00",
                    "annee": 2024,
                    "mois": 6
                },
                {
                    "montant": "0.00",
                    "annee": 2024,
                    "mois": 7
                },
                {
                    "montant": "0.00",
                    "annee": 2024,
                    "mois": 8
                },
                {
                    "montant": "0.00",
                    "annee": 2024,
                    "mois": 9
                },
                {
                    "montant": "0.00",
                    "annee": 2024,
                    "mois": 10
                },
                {
                    "montant": "0.00",
                    "annee": 2024,
                    "mois": 11
                },
                {
                    "montant": "0.00",
                    "annee": 2024,
                    "mois": 12
                }
            ])
        }, 1000)
    };


    // const fetchCa_annee = () => {
    //     setLoadingCA(true)
    //     axios.get(`/api/ca_annee/${a}`)
    //         .then(function (response) {
    //             setCA_annee(response.data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    //         .finally(() => setLoadingCA(false));
    // };

    const onChangeMonth = (event, option) => {
        setMois(option);
        setOpenMonth(null);
    };

    const onOpenMonth = (event) => {
        setOpenMonth(event.currentTarget);
    };

    const onCloseMonth = () => {
        setOpenMonth(null);
    };


    const onChange = (event, option) => {
        setAnnee(option);
        setOpen(null);
    };

    const onOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const onClose = () => {
        setOpen(null);
    };

    ca_annee.forEach(i => {
        evolution_ca.labels.push(`${getMois(i.mois)}`)
        evolution_ca.series[0].data.push(i.montant)
    })

    const montant_2 = ca_annee.reduce((t, c) => t + parseFloat(c.montant), 0).toFixed(2);
    const total_2 = formatterMontant(montant_2);

    return (
        <Container maxWidth="xl">
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4">
                        Tableau de bord
                    </Typography>
                    <Button
                        disabled={loadingCA || loadingResult || loadingTopClientA || loadingTopClientM}
                        // disableRipple
                        color="inherit"
                        onClick={onOpen}
                        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
                    >
                        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
                            {a}
                        </Typography>
                    </Button>
                    <Button
                        disabled={loadingCA || loadingResult || loadingTopClientA || loadingTopClientM}
                        // disableRipple
                        color="inherit"
                        onClick={onOpenMonth}
                        endIcon={<Iconify icon={openMonth ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
                    >
                        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
                            {getMois(m)}
                        </Typography>
                    </Button>

                    <Menu
                        open={!!open}
                        anchorEl={open}
                        onClose={onClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        slotProps={{
                            paper: {
                                sx: {
                                    [`& .${listClasses.root}`]: {
                                        p: 0,
                                    },
                                },
                            },
                        }}
                    >
                        {ANNEES.map((an) => (
                            <MenuItem key={an} selected={an === a} onClick={(event) => onChange(event, an)}>
                                {an}
                            </MenuItem>
                        ))}
                    </Menu>

                    <Menu
                        open={!!openMonth}
                        anchorEl={openMonth}
                        onClose={onCloseMonth}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        slotProps={{
                            paper: {
                                sx: {
                                    [`& .${listClasses.root}`]: {
                                        p: 0,
                                    },
                                },
                            },
                        }}
                    >
                        {MONTHS.map((an) => (
                            <MenuItem key={an.value} selected={an.value === m} onClick={(event) => onChangeMonth(event, an.value)}>
                                {an.label}
                            </MenuItem>
                        ))}
                    </Menu>

                </div>
            </Stack>

            <Grid container spacing={3}>

                <Grid item xs={12} sm={6} md={2.4}>
                    <AppWidget
                        title="Nombre de clients"
                        total={result.Client_actif}
                        color="success"
                        icon={<img alt="icon" src="/public/assets/icons/glass/ic_glass_users.png" />}
                    />

                </Grid>
                <Grid item xs={12} sm={6} md={2.4}>
                    <AppWidget
                        title="Conteneur"
                        total={result.Conteneur_cloture}
                        color="success"
                        icon={<img alt="icon" src="/assets/icons/glass/container_8984093.png" />}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={2.4}>
                    <AppWidgetCA
                        title="Chiffre d'affaires"
                        total={result.Chiffre_d_Affaire}
                        color="success"
                        icon={<img alt="icon" src="/assets/icons/glass/chiffre-daffaires.png" />}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={2.4}>
                    <AppWidget
                        title="Facture non payé"
                        total={result.f_non_paye}
                        color="success"
                        icon={<img alt="icon" src="/assets/icons/glass/unpaid.png" />}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={2.4}>
                    <AppWidget
                        title="Facture trop perçue"
                        total={result.f_trop_percu}
                        color="success"
                        icon={<img alt="icon" src="/assets/icons/glass/avoir.png" />}
                    />
                </Grid>
            </Grid>

            <br />

            <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                    <Grid item xs={12}>
                        <ChiffreDaffaire
                            title="Évolution du chiffre d'affaires"
                            subheader={`TOTAL: ${total_2} MGA`}
                            chart={evolution_ca}
                        />
                    </Grid>
                    <br />
                    <Grid item xs={12}>
                        <TopClient
                            title="Classemment des clients par année"
                            list={top_client} />
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <MeilleurClientDuMois
                        title={`Meilleur client du mois`}
                        list={top_client_du_mois}
                    />
                </Grid>

            </Grid>

            <br />

            <Divider sx={{ borderStyle: 'dashed' }} />

            <br />



        </Container>
    );
}

