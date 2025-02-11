import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Container, Divider, Paper, Card, CardHeader, CardContent, Box, TextField, InputAdornment, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Stack, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import AlertMessage from '../components/alert/alertmessage';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import Iconify from '../components/iconify/iconify';
import { MyContext } from '../components/context/mycontext';


// ----------------------------------------------------------------------

export default function Parametre() {

  const [id, setID] = useState(null)

  const [etat, setEtat] = useState(0)

  const [montant, setMontant] = useState(0)

  const [mga, setMga] = useState([])

  const [mdp, setMdp] = useState('')

  const [new_mdp, setNewMdp] = useState('')

  const [confi_mdp, setConfiMdp] = useState('')

  const [alertOpen, setAlertOpen] = useState(false);

  const [alertType, setAlertType] = useState('success');

  const [alertMessage, setAlertMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const [loading_update, setLoadingUpdate] = useState(false);

  const [loading_mdp, setLoadingMdp] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfiPassword, setShowConfiPassword] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false)

  const [isAdd, setIsAdd] = useState(true)

  const [error_mdp, setErrorMdp] = useState(true)

  const username = useContext(MyContext)

  // useEffect(() => {
  //   fetchMGA()
  // }, [etat])

  // useEffect(() => {
  //   if (new_mdp && confi_mdp) {
  //     if (new_mdp === confi_mdp) {
  //       setErrorMdp(false)
  //     }
  //   }
  // }, [new_mdp, confi_mdp])


  const fetchMGA = () => {
    axios.get(`/api/uniteMGA`)
      .then(function (response) {
        setMga(response.data)
      })
      .catch(function (error) {
        alert(error)
      });
  }

  const modif = (id, mnt) => {
    setIsUpdate(true)
    setMontant(mnt)
    setID(id)
    setIsAdd(false)
  }

  const handleChangerMDP = () => {
    if (!error_mdp) {
      setLoadingMdp(true)
      setErrorMdp(false)
      let data = new FormData()
      data.append("username", username)
      data.append("mdp_actu", mdp)
      data.append("new_mdp", new_mdp)
      axios.put('/api/change_password', data)
        .then(function (response) {
          if (response.data == 1) {
            setAlertType('success');
            setAlertMessage("Modification effectué");
            setAlertOpen(true);
            setLoadingMdp(false)
          }
          else if (response.data == 2) {
            setAlertType('error');
            setAlertMessage("Erreur, mot de passe actuel");
            setAlertOpen(true);
            setLoadingMdp(false)
          }
        }).catch((error) => {
          alert("erreur", error)
          console.log(error)
          setLoadingMdp(false)
        })
    }
    else {
      setAlertType('error');
      setAlertMessage("error");
      setAlertOpen(true);
    }
  }

  const handleSave = () => {
    setLoading(true)
    axios.post(`/api/uniteMGA/${montant}`)
      .then(function (response) {
        if (response.data == 1) {
          setAlertType('success');
          setAlertMessage("Ajouté avec success");
          setAlertOpen(true);
          fetchMGA()
        }
        else if (response.data == 2) {
          setAlertType('error');
          setAlertMessage("Vous ne pouvez ajouté qu'un seul unité cbm");
          setAlertOpen(true);
        }
        else {
          alert("erreur")
        }
        setLoading(false)

      })
      .catch(function (error) {
        alert(error)
      });
  }

  const handleModif = () => {
    setLoadingUpdate(true)
    setIsUpdate(false)
    setIsAdd(true)
    axios.put(`/api/uniteMGA/${id}/${montant}`)
      .then(function (response) {
        setAlertType('success');
        setAlertMessage('modifé avec succès');
        setAlertOpen(true);
        setLoadingUpdate(false)
        setMontant(0)
        setID(null)
        fetchMGA()
      })
      .catch(function (error) {
        alert(error)
        console.log(error)
      });
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ?',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/uniteMGA/${id}`)
          .then(function (response) {
            if (response.data == 0) {
              setAlertType('error');
              setAlertMessage('Unité cbm deja utilisé');
              setAlertOpen(true);
            }
            else if (response.data == 1) {
              setAlertType('success');
              setAlertMessage('unité CBM supprimé');
              setAlertOpen(true);
              fetchMGA()
            }
          })
          .catch(function (error) {
            alert(error)
          });
      }
    })
  }

  return (
    <>
      <Helmet>
        <title> Admin | Paramètre </title>
      </Helmet>
      <Container>
        {alertOpen && <AlertMessage open={alertOpen} message={alertMessage} type={alertType} onClose={() => setAlertOpen(false)} />}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4">Paramètres</Typography>
        </Stack>

        <Card>
          <CardHeader title="Unit Price" />
          <CardContent>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <div>
                <TextField
                  value={montant}
                  onChange={(e) => setMontant(e.target.value)}
                  type="number"
                  label="Valeur"
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: '40ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">USD</InputAdornment>
                  }}
                />
                <Box sx={{ p: 1, textAlign: 'left' }}>
                  <LoadingButton
                    disabled={true}
                    color="primary"
                    onClick={handleSave}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<RestartAltIcon />}
                    variant="contained"
                  >
                    <span>Ajouter</span>
                  </LoadingButton>
                  <LoadingButton
                    disabled={true}
                    color="primary"
                    onClick={handleModif}
                    loading={loading_update}
                    loadingPosition="start"
                    startIcon={<RestartAltIcon />}
                    variant="contained"
                  >
                    <span>Modifier</span>
                  </LoadingButton>
                </Box>
              </div>
            </Box>

          </CardContent>
          {/* <Divider /> */}

        </Card>

        <br />

        <Card>

          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell textAlign="center">Valeur</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mga.map((row) => (
                  <TableRow>
                    <TableCell textAlign="center">{row.montant} USD</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => modif(row.id, row.montant)}>
                        <Iconify icon="eva:edit-fill" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row.id)}>
                        <Iconify icon="eva:trash-fill" />
                      </IconButton>
                    </TableCell>

                  </TableRow>
                ))}


              </TableBody>
            </Table>
          </TableContainer>

        </Card>
        <br />
        <Divider sx={{ borderStyle: 'dashed' }} />
        <br />
        <Card>
          <CardHeader title="Changer le mot de passe" />
          <CardContent>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <div>
                <TextField
                  value={mdp}
                  onChange={(e) => setMdp(e.target.value)}
                  label="Mot de passe actuel"
                  type={showPassword ? 'text' : 'password'}
                  sx={{ m: 1, width: '62ch' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  value={new_mdp}
                  onChange={(e) => setNewMdp(e.target.value)}
                  label="Nouveau mot de passe"
                  type={showNewPassword ? 'text' : 'password'}
                  sx={{ m: 1, width: '62ch' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                          <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  value={confi_mdp}
                  onChange={(e) => setConfiMdp(e.target.value)}
                  label="Retapez le nouveau mot de passe"
                  type={showConfiPassword ? 'text' : 'password'}
                  sx={{ m: 1, width: '62ch' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfiPassword(!showConfiPassword)} edge="end">
                          <Iconify icon={showConfiPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ p: 1, textAlign: 'left' }}>
                  <LoadingButton
                    disabled={true}
                    color="primary"
                    onClick={handleChangerMDP}
                    loading={loading_mdp}
                    loadingPosition="start"
                    startIcon={<RestartAltIcon />}
                    variant="contained"
                  >
                    <span>Enregistrer</span>
                  </LoadingButton>
                </Box>

              </div>
            </Box>

          </CardContent>


        </Card>
      </Container>
    </>
  );
}
