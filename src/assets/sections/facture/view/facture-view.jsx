import React, { useState, useEffect } from 'react';

import axios from 'axios';
import InfoIcon from '@mui/icons-material/Info';
import Swal from 'sweetalert2';
import Grid from '@mui/material/Unstable_Grid2';
import Label from '../../../components/label/label';
import AppWidgetSummary from '../app-widget-summary';
import FactureTable from '../facture-table';

import {
  Container,
  Typography,
  Skeleton,
  Chip,
  Avatar,
  Stack,
  Tooltip,
  Backdrop,
  CircularProgress,
  Divider,
  Card
} from '@mui/material';
import Historique from '../historique';

// ----------------------------------------------------------------------

function IsNotClotured(non_payer) {
  let is_noClotured = false;
  if (parseFloat(non_payer) > 0) {
    is_noClotured = true;
  }
  return is_noClotured;
}

export default function FactureView({ manifest_id }) {
  const [etat, setEtat] = useState(0);

  const [facture, setFacture] = useState([{ "nom": "Alexandre ", "prenom": "Simons", "shipping_mark": "SM-1006", "photo": "avatar-3.jpg", "email": "xavi@gmail.com", "id": 325, "reference_facture": "F24-4082", "nombre_package": 3, "manifest_id": 34, "client_id": 22, "cbm": "1.95", "unit_price": "500.00", "total": "975.00", "taux_vente": "5200.00", "mga": "5070000.00", "extra_charge": "0.00", "reste_a_payer": "0.00", "payer": "5070000.00" }, { "nom": "Isabelle ", "prenom": "Martinez", "shipping_mark": "SM-1003", "photo": "avatar-1.jpg", "email": "eve@gmail.com", "id": 326, "reference_facture": "F24-6588", "nombre_package": 1, "manifest_id": 34, "client_id": 27, "cbm": "1.75", "unit_price": "500.00", "total": "1125.00", "taux_vente": "5200.00", "mga": "5850000.00", "extra_charge": "250.00", "reste_a_payer": "0.00", "payer": "5850000.00" }, { "nom": "Isabelle ", "prenom": "Martinez", "shipping_mark": "SM-1003", "photo": "avatar-1.jpg", "email": "eve@gmail.com", "id": 331, "reference_facture": "AV24-3692", "nombre_package": 0, "manifest_id": 34, "client_id": 27, "cbm": "0.00", "unit_price": "0.00", "total": "-200.00", "taux_vente": "5200.00", "mga": "-1040000.00", "extra_charge": "-200.00", "reste_a_payer": "-1040000.00", "payer": "0.00" }, { "nom": "Isabelle ", "prenom": "Martinez", "shipping_mark": "SM-1003", "photo": "avatar-1.jpg", "email": "eve@gmail.com", "id": 332, "reference_facture": "COM24-5820", "nombre_package": 0, "manifest_id": 34, "client_id": 27, "cbm": "0.00", "unit_price": "0.00", "total": "100.00", "taux_vente": "5200.00", "mga": "520000.00", "extra_charge": "100.00", "reste_a_payer": "520000.00", "payer": "0.00" }]);

  const [manifest, setManifest] = useState({ "id": 32, "numero": "MAN-0003", "numeroConteneur": "CONT-MNO567", "nomConsolidateur": "Express Freight", "eta": "2024-04-09T00:00:00+02:00", "etat": 1, "tauxVente": "3800.00", "del": "2024-05-10T00:00:00+02:00" });

  const [historique, setHistorique] = useState([{ "manifest_id": 34, "reference_facture": "F24-6588", "date": "2024-12-09 05:02:05", "montant": "5850000.00", "etat": "paiement" }, { "manifest_id": 34, "reference_facture": "F24-4082", "date": "2024-12-09 05:01:36", "montant": "-1398000.00", "etat": "rembourse" }, { "manifest_id": 34, "reference_facture": "F24-4082", "date": "2024-06-19 21:20:36", "montant": "-532000.00", "etat": "deduit" }, { "manifest_id": 34, "reference_facture": "F24-4082", "date": "2024-06-18 20:36:51", "montant": "7000000.00", "etat": "paiement" }])

  const [ef, setEf] = useState({"paiement":"12850000.00","deduit":"-532000.00","transfert":"0.00","avoir":"-1398000.00","mga":"10400000.00","non_payer":"520000.00","trop_percu":"-1040000.00"});

  const [isLoading_title, setIsLoading_title] = useState(false)

  const [open_p, setOpen_p] = useState(null);

  const [backdrop, setBackdrop] = useState(false);

  const closeBackdrop = () => {
    setBackdrop(false);
  };

  // const handleOpenMenu_p = (event) => {
  //   setOpen_p(event.currentTarget);
  // };

  // const handleCloseMenu_p = () => {
  //   setOpen_p(null);
  // };

  // useEffect(() => {
  //   if (manifest_id) {
  //     fetchFacture()
  //     fetchManifest()
  //     fetchEtatFacture()
  //     fetchHistorique()
  //   }
  // }, [etat])

  const fetchManifest = () => {
    axios.get(`/api/manifeste/${manifest_id}`)
      .then(function (response) {
        setManifest(response.data)
        setIsLoading_title(false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const fetchEtatFacture = () => {
    axios.get(`/api/etat_facture/${manifest_id}`)
      .then(function (response) {
        setEf(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })

  }

  const fetchFacture = async () => {
    axios.get(`/api/factures/${manifest_id}`)
      .then(function (response) {
        setFacture(response.data);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const fetchHistorique = async () => {
    axios.get(`/api/historique/${manifest_id}`)
      .then(function (response) {
        setHistorique(response.data);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const clotureo = () => {
    setOpen_p(false)
    if (manifest.etat == 2) {

    }
    else if (IsNotClotured(ef.non_payer)) {
      Swal.fire({
        text: "Vous ne pouvez pas clôturer ce manifeste tant que tous les paiements ne sont pas réglés.",
        icon: "warning"
      })
    }
    else {

      Swal.fire({
        title: 'Souhaitez-vous finaliser ce manifeste?',
        showCancelButton: true,
        confirmButtonText: 'Oui cloturer!',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          setBackdrop(true)
          axios.put(`/api/cloturer_manifeste/${manifest_id}`)
            .then(function (response) {
              setBackdrop(false)
              // fetchManifest()
            })
            .catch(function (error) {
              console.log("erreur e", error)
            })
        }
      })
    }
  }

  console.log("ito", backdrop)
  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4">
            Factures:
          </Typography>
          {isLoading_title ? <Skeleton variant="text" width={100} style={{ marginLeft: '8px' }} /> : <Tooltip title="Clôturer ce manifeste" placement="top-start"><Chip onClick={clotureo} avatar={<Avatar>M</Avatar>} label={manifest.numero} /></Tooltip>}
          {manifest.etat === 2 && <Label color='info'>cloturé</Label>}
        </div>
      </Stack>
      {/* 
      <Popover
        open={!!open_p}
        anchorEl={open_p}
        onClose={handleCloseMenu_p}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 90 },
        }}
      >
        <MenuItem onClick={clotureo}>
          <InfoIcon color="success" />
          Clôturer
        </MenuItem>
      </Popover> */}

      <Grid container spacing={2}>

        <Grid xs={12} sm={6} md={2}>
          <AppWidgetSummary
            title="Non payé"
            total={ef.non_payer}
            color="info"
          //icon={<img alt="icon" src="/assets/icons/glass/total.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={2}>
          <AppWidgetSummary
            title="Trop perçue"
            total={ef.trop_percu}
            color="warning"
          //icon={<img alt="icon" src="/assets/icons/glass/total.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={2}>
          <AppWidgetSummary
            title="Payé"
            total={ef.paiement}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/add(1).png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={2}>
          <AppWidgetSummary
            title="Remboursé"
            total={ef.avoir}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/minusss.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={2}>
          <AppWidgetSummary
            title="Deduit"
            total={ef.deduit}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/close1.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={2}>
          <AppWidgetSummary
            title="Transfert"
            total={ef.transfert}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/dd1.png" />}
          />
        </Grid>
      </Grid>

      <br />
      <Grid container spacing={3}>
        <Grid xs={12} sm={12} md={12}>
          <FactureTable
            factures={facture}
          />
        </Grid>
      </Grid>

      <br />
      <Divider sx={{ borderStyle: 'dashed' }} />
      <br />
      <Grid container spacing={3}>
        <Grid xs={8} sm={8} md={8}>
          <Historique historique={historique} />
        </Grid>
        <Grid xs={4} sm={4} md={4}>
          <Card>
            <AppWidgetSummary
              title="Total Facture"
              total={ef.mga}
              color="warning"
            //icon={<img alt="icon" src="/assets/icons/glass/dd1.png" />}
            />
          </Card>
        </Grid>
      </Grid>
      <div>
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
          onClick={closeBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>

    </Container>
  );
}
