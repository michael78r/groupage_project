import { useState, useEffect } from 'react';
import React from 'react';
import Card from '@mui/material/Card';

import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';
import { Skeleton } from '@mui/material';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ProformaTableAccordion from '../proforma-table-accordion';
import Fade from '@mui/material/Fade';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Iconify from '../../../components/iconify/iconify';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import AlertMessage from '../../../components/alert/alertmessage';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import TableNoData from '../table-no-data';
import { useRouter } from '../../../routes/hooks';
// ----------------------------------------------------------------------


function proformaClient(data) {
  const p = {};

  data.forEach(item => {
    const { client_id, manifest_id, poids, cbm, total, mga, reference, nature, date, nom, shipping_mark, id, is_modif } = item;

    if (!p[client_id]) {
      p[client_id] = {
        client_id, manifest_id, nom, shipping_mark, cbm, total, mga,
        colis: [],
      };
    } else {
      p[client_id] = {
        ...p[client_id],
        cbm: (parseFloat(p[client_id].cbm) + parseFloat(cbm)).toFixed(2),
        total: (parseFloat(p[client_id].total) + parseFloat(total)).toFixed(2),
        mga: (parseFloat(p[client_id].mga) + parseFloat(mga)).toFixed(2),
      };
    }

    p[client_id].colis.push({
      id: id,
      is_modif: is_modif,
      reference: reference,
      cbm: cbm,
      poids: poids,
      nature: nature,
      date: date
    });
  });

  const result = Object.keys(p).map(client_id => ({
    nom: p[client_id].nom,
    client_id: p[client_id].client_id,
    manifest_id: p[client_id].manifest_id,
    shipping_mark: p[client_id].shipping_mark,
    cbm: p[client_id].cbm,
    total: p[client_id].total,
    mga: p[client_id].mga,
    colis: p[client_id].colis
  }));


  return result;
}

function client_manifest(data) {
  const result = {};

  data.forEach(item => {
    const { client_id, manifest_id } = item;

    result[`${client_id}_${manifest_id}`] = {
      client_id: client_id,
      manifest_id: manifest_id
    };
  });

  return Object.values(result);
}

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 720,
  bgcolor: 'background.paper',
  borderRadius: 1,
  p: 4,
};


export default function ProformaView({ manifest_id }) {

  const [proforma, setProforma] = useState([]);

  const [long, setLong] = useState(0);

  const [larg, setLarg] = useState(0);

  const [hauteur, setHauteur] = useState(0);

  const [nature, setNature] = useState('');

  const [poids, setPoids] = useState();

  const [reference, setReference] = useState('');

  const [colis_id, setColis_id] = useState();

  // --------------------------------------------------------------------------

  const [is_modif, setIs_modif] = useState(0);

  const [page, setPage] = useState(0);

  const [isLoading_title, setIsLoading_title] = useState(true)

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [alertOpen, setAlertOpen] = useState(false);

  const [alertType, setAlertType] = useState('success');

  const [alertMessage, setAlertMessage] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpenModal(false);

  const [isSaving, setIsSaving] = useState(false);

  const [isLoading, setIsLoading] = useState(true)

  const [manifest, setManifest] = useState([]);

  const router = useRouter()

  const [backdrop, setBackdrop] = useState(false);

  const closeBackdrop = () => {
    setBackdrop(false);
  };

  let rows = proformaClient(proforma), cm;

  if (!isLoading) {
    rows = proformaClient(proforma)
    cm = client_manifest(proforma)
  }

  useEffect(() => {
    fetchProforma()
    fetchManifest()
  }, [])


  const updateColis = () => {
    setIsSaving(true)
    setIsLoading(true)
    setBackdrop(true)
    setOpenModal(false)
    axios.put(`/api/colis_update/${colis_id}/${long}/${larg}/${hauteur}/${poids}`)
      .then(function (response) {
        fetchProforma()
      })
      .catch(function (error) {
        console.log(error)
      }).finally(() => {
        setIsSaving(false)
        setAlertType('success');
        setAlertMessage('Colis mis à jour avec succès');
        setAlertOpen(true);
        setBackdrop(false)
      })
  }

  const fetchProforma = () => {
    setProforma([{
      "reference": "REF-1001",
      "nature": "Colis eclair",
      "poids": 14, "date": "2024-06-10",
      "cbm": "0.32",
      "manifest_id": 34,
      "numero": "MAN-0005", "id": 585,
      "client_id": 22,
      "is_modif": 0,
      "total": "160.00",
      "mga": "832000.00",
      "nom": "Alexandre ",
      "shipping_mark": "SM-1006"
    }, {
      "reference": "REF-1002",
      "nature": "Pack Vitesse",
      "poids": 22, "date": "2024-06-19",
      "cbm": "0.83",
      "manifest_id": 34,
      "numero": "MAN-0005",
      "id": 586, "client_id": 22,
      "is_modif": 0,
      "total": "415.00",
      "mga": "2158000.00",
      "nom": "Alexandre ",
      "shipping_mark": "SM-1006"
    },
    {
      "reference": "REF-1003",
      "nature": "Box Rapide",
      "poids": 14,
      "date": "2024-05-04",
      "cbm": "0.80",
      "manifest_id": 34,
      "numero": "MAN-0005",
      "id": 587, "client_id": 22,
      "is_modif": 0,
      "total": "400.00",
      "mga": "2080000.00",
      "nom": "Alexandre ",
      "shipping_mark": "SM-1006"
    }, {
      "reference": "REF-1010",
      "nature": "Boite Speedy",
      "poids": 15, "date": "2024-06-24",
      "cbm": "1.75", "manifest_id": 34,
      "numero": "MAN-0005",
      "id": 594,
      "client_id": 27,
      "is_modif": 0,
      "total": "875.00",
      "mga": "4550000.00",
      "nom": "Isabelle ",
      "shipping_mark": "SM-1003"
    }])
  }
  // const fetchProforma = () => {
  //   axios.get(`/api/proforma_manifest/${manifest_id}`)
  //     .then(function (response) {
  //       setProforma(response.data)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  //     .finally(() => {
  //       setIsLoading(false)
  //     })
  // }

  const fetchManifest = () => {
    setManifest({
      "id": 34,
      "numero": "MAN-0005",
      "numeroConteneur": "CONT-345655s",
      "nomConsolidateur": "DEF Logistics",
      "eta": "2024-05-19T00:00:00+02:00",
      "etat": 2,
      "tauxVente": "5200.00",
      "del": "2024-06-11T00:00:00+02:00"
    })
    setIsLoading_title(false)
  }

  // const fetchManifest = () => {
  //   axios.get(`/api/manifeste/${manifest_id}`)
  //     .then(function (response) {
  //       setManifest(response.data)
  //       setIsLoading_title(false)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }

  const deleteColis = () => {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ?',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
      backdrop: true
    }).then((result) => {
      if (result.isConfirmed) {
        setAlertType('error');
        setAlertMessage('Vous ne pouvez pas supprimer ce colis');
        setAlertOpen(true);

      }
    })
  }

  // const deleteColis = (id) => {
  //   Swal.fire({
  //     title: 'Voulez-vous vraiment supprimer ?',
  //     showCancelButton: true,
  //     confirmButtonText: 'Oui, supprimer!',
  //     cancelButtonText: 'Annuler',
  //     backdrop: true
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios.put(`/api/colis_null/${id}`)
  //         .then(function (response) {
  //           setAlertType('success');
  //           setAlertMessage('Colis supprimé');
  //           setAlertOpen(true);
  //           fetchProforma()
  //         })
  //         .catch(function (error) {
  //           setAlertType('error');
  //           setAlertMessage(error);
  //           setAlertOpen(true);
  //         });
  //     }
  //   })
  // }

  
  const reinitialiser = () => {
    setLoading(true)
    setPoids(200)
    setLong(24)
    setLarg(23)
    setHauteur(78.2)
  }


  // const reinitialiser = () => {
  //   setLoading(true)
  //   axios.get(`/api/reinitialiser/${colis_id}`)
  //     .then(function (response) {
  //       setPoids(response.data[0].poids_sauvegarde)
  //       setLong(response.data[0].long_)
  //       setLarg(response.data[0].larg_)
  //       setHauteur(response.data[0].haut_)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }

  const valider_manifest = () => {
    setOpen(null);
    Swal.fire({
      title: 'Vérifiez vos données',
      text: "Avant de continuer, il est préférable que vous vérifiiez vos données. En cas d'acceptation, vous pourriez ne pas être en mesure de revenir en arrière.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Continuer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        setBackdrop(true)

        setTimeout(() => {
          setBackdrop(false)
          router.push(`/detailsmanifeste?manifest_id=34&sk=1`)
          router.reload()
        }, 500)
      }
    })
  }


  // const valider_manifest = () => {
  //   setOpen(null);
  //   Swal.fire({
  //     title: 'Vérifiez vos données',
  //     text: "Avant de continuer, il est préférable que vous vérifiiez vos données. En cas d'acceptation, vous pourriez ne pas être en mesure de revenir en arrière.",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Continuer',
  //     cancelButtonText: 'Annuler'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       setBackdrop(true)
  //       axios.post('/api/valider_manifest', {
  //         'data': cm
  //       })
  //         .then(function (response) {
  //           setBackdrop(false)
  //           if (response.data.code === 0) {
  //             alert("message: " + response.data.message)
  //           }
  //           else if (response.data.etat == 1) {

  //             // setAlertType('success');
  //             // setAlertMessage('manifeste ajouté avec succès');
  //             // setAlertOpen(true);

  //           }
  //           else {
  //             setTimeout(function () {
  //               alert("okayyy");
  //             }, 1);
  //           }
  //         })
  //         .catch(function (error) {
  //           setBackdrop(false)
  //           setAlertMessage(error);
  //           setAlertOpen(true);
  //         })
  //         .finally(() => {
  //           router.push(`/detailsmanifeste?manifest_id=${manifest_id}&sk=1`)
  //           router.reload()
  //         })
  //     }

  //   })
  // }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const onHandleOpen = (cl) => {
    setOpenModal(true);
    setReference(cl.reference)
    setNature(cl.nature)
    setPoids(cl.poids)
    setHauteur(0)
    setLarg(0)
    setLong(0)
    setIs_modif(cl.is_modif)
    setColis_id(cl.id)
  }

  const redirect_colis = () => {
    router.push(`/colis?mf=${manifest.numeroConteneur}`)
  }

  const redirect_generer = () => {
    router.push('/generer')
  }

  const notFound = !rows.length

  return (
    <Container maxWidth="xl">
      {alertOpen && <AlertMessage open={alertOpen} message={alertMessage} type={alertType} onClose={() => setAlertOpen(false)} />}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4">
            Proforma:
          </Typography>
          {isLoading_title ? <Skeleton variant="text" width={100} style={{ marginLeft: '8px' }} /> : <Tooltip title="Details" placement="top-start"><Chip onClick={handleOpenMenu} avatar={<Avatar>M</Avatar>} label={manifest.numero} /></Tooltip>}
        </div>
      </Stack>
      {/* <Button onClick={valider_manifest}>valider</Button> */}
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={valider_manifest}>
          <InfoIcon color="success" />
          Valider
        </MenuItem>
        <MenuItem onClick={redirect_colis}>
          <AddCircleIcon color="primary" />
          Ajouter colis
        </MenuItem>
        <MenuItem onClick={redirect_generer}>
          <AutoModeIcon />
          Generer colis
        </MenuItem>
      </Popover>
      <Card>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Nom & shipping mark</TableCell>
                <TableCell align="center">Package</TableCell>
                <TableCell align="center">Volume</TableCell>
                <TableCell align="right">Total USD&nbsp;($)</TableCell>
                <TableCell align="right">Total MGA&nbsp;(Ariary)</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                !isLoading ? rows.map((row) => (
                  <ProformaTableAccordion key={row.shipping_mark} row={row} onDeletecolis={deleteColis} onHandleOpen={onHandleOpen} />
                )) : rows.map((row) => (
                  <ProformaTableAccordion key={row.shipping_mark} row={row} onDeletecolis={deleteColis} onHandleOpen={onHandleOpen} />
                ))}
              {notFound && <TableNoData />}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          page={page}
          component="div"
          count={!isLoading ? rows.length : 0}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </Card>

      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
          onClick={closeBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 250,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={styles}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Modification colis: {nature} {reference}
            </Typography>
            <br />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <div>
                <TextField
                  value={long}
                  onChange={(event) => { setLong(event.target.value) }}
                  label="Longueur"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: '20ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                  }}
                />
                <TextField
                  value={larg}
                  onChange={(event) => { setLarg(event.target.value) }}
                  label="Largeur"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: '20ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                  }}
                />
                <TextField
                  value={hauteur}
                  onChange={(event) => { setHauteur(event.target.value) }}
                  label="Hauteur"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: '20ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                  }}
                />
              </div>
              <div>
                <TextField
                  value={poids}
                  onChange={(event) => { setPoids(event.target.value) }}
                  label="Poids"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: '20ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                  }}
                />
              </div>
            </Box>
            <br />

            <Stack direction="row" spacing={2}>
              <LoadingButton
                color="grey"
                onClick={reinitialiser}
                loading={loading}
                loadingPosition="start"
                startIcon={<RestartAltIcon />}
                variant="contained"
              >
                <span>Reinitialiser</span>
              </LoadingButton>
              <Button color="success" disabled={isSaving} onClick={updateColis} variant="contained">
                Modifier
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>

    </Container>
  );
}

ProformaView.propTypes = {
  manifest_id: PropTypes.string,
};
