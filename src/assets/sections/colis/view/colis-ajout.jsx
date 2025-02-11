// import Box from '@mui/material/Box';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import Card from '@mui/material/Card';
// import Container from '@mui/material/Container';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import AlertMessage from '../../../components/alert/alertmessage';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CardContent, CardHeader, CardActions } from '@mui/material';


// export function ColisAdd() {

//     const [idclient, setClient_id] = useState('')

//     const [etat, setEtat] = useState(0)

//     const [client, setClient] = useState([]);

//     const [id, setId] = useState();

//     const [long, setLong] = useState(0);

//     const [larg, setLarg] = useState(0);

//     const [hauteur, setHauteur] = useState(0);

//     const [nature, setNature] = useState('');

//     const [poids, setPoids] = useState();

//     const [reference, setReference] = useState('');

//     const [isSaving, setIsSaving] = useState(false)

//     const [isRecu, setIsrecu] = useState();

//     const [isUpdate, setIsupdate] = useState(true)

//     const [alertOpen, setAlertOpen] = useState(false);

//     const [alertType, setAlertType] = useState('success');

//     const [alertMessage, setAlertMessage] = useState('');

//     useEffect(() => {
//         fecthClient()
//     }, [etat])

//     const fecthClient = () => {
//         axios.get(`/api/client`)
//             .then(function (response) {
//                 setClient(response.data)
//             })
//             .catch(function (error) {
//                 console.log(error)
//             });
//     }

//     const news = () => {
//         setIsupdate(true)
//         setIsSaving(false);
//         setNature('')
//         setPoids('')
//         setReference('')
//     }


//     const modif = (cl) => {
//         setIsSaving(true);
//         setId(cl.id)
//         setLarg(0)
//         setLong(0)
//         setHauteur(0)
//         setNature(cl.nature)
//         setPoids(cl.poids)
//         setIsrecu(cl.is_recu)
//         setReference(cl.reference)
//         setIsupdate(false)
//         setIsSaving(true)
//     }

//     const handleModif = () => {
//         axios.put(`/api/colis/${id}/${nature}/${long}/${larg}/${hauteur}/${poids}/${reference}/${isRecu}/${idclient}`)
//             .then(function (response) {
//                 console.log(response)
//                 setAlertType('success');
//                 setAlertMessage('Colis ajout avec succès');
//                 setAlertOpen(true);
//                 news()
//             })
//             .catch(function (error) {
//                 console.log(error)
//                 setAlertType('success');
//                 setAlertMessage('Colis ajout avec succès');
//                 setAlertOpen(true);
//                 setIsSaving(true);
//             });
//     }


//     const handleSave = () => {

//         setIsSaving(true);
//         let formData = new FormData()
//         formData.append("client_id", idclient)
//         formData.append("nature", nature)
//         formData.append("long", long)
//         formData.append("larg", larg)
//         formData.append("hauteur", hauteur)
//         formData.append("poids", poids)
//         formData.append("reference", reference)
//         axios.post('/api/colis', formData)
//             .then(function (response) {
//                 console.log(response)
//                 setAlertType('success');
//                 setAlertMessage('Colis ajout avec succès');
//                 setAlertOpen(true);
//                 setIsSaving(false);
//                 setNature('')
//                 setLarg('')
//                 setLong('')
//                 setHauteur('')
//                 setPoids('')
//                 setReference('')
//             })
//             .catch(function (error) {
//                 console.log(error)
//                 setAlertType('error');
//                 setAlertMessage(error);
//                 setAlertOpen(true);
//                 setIsSaving(false)
//             });
//     }

//     const handleDelete = (id) => {
//         Swal.fire({
//             title: 'Voulez-vous vraiment supprimer ?',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Oui, supprimer!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axios.delete(`/api/colis/${id}`)
//                     .then(function (response) {
//                         Swal.fire({ icon: 'success', title: 'colis supprimé!', showConfirmButton: false, timer: 700 })
//                         //fetchColisInClient()
//                     })
//                     .catch(function (error) {
//                         Swal.fire({ icon: 'error', title: error, showConfirmButton: false, timer: 1500 })
//                     });
//             }
//         })
//     }

//     return (
//         <Container>
//             {alertOpen && <AlertMessage open={alertOpen} message={alertMessage} type={alertType} onClose={() => setAlertOpen(false)} />}

//             <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
//                 <Typography variant="h4">Formulaire d'ajout colis</Typography>
//             </Stack>
//             <Card>
//                 <CardHeader>
//                 </CardHeader>
//                 <CardContent>
//                     <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
//                         <div>
//                             {/* <FormControl> */}
//                             <TextField
//                                 value={nature}
//                                 onChange={(e) => setNature(e.target.value)}
//                                 label="Nature"
//                                 id="outlined-start-adornment"
//                                 sx={{ m: 1, width: '25ch' }}
//                                 InputProps={{
//                                     startAdornment: <InputAdornment position="start"></InputAdornment>
//                                 }}
//                             />

//                             <TextField
//                                 value={reference}
//                                 onChange={(e) => setReference(e.target.value)}
//                                 label="Reference"
//                                 id="outlined-start-adornment"
//                                 sx={{ m: 1, width: '25ch' }}
//                                 InputProps={{
//                                     startAdornment: <InputAdornment position="start"></InputAdornment>
//                                 }}
//                             />
//                             <br />
//                             <TextField
//                                 value={long}
//                                 onChange={(e) => setLong(e.target.value)}
//                                 label="Longueur"
//                                 type="number"
//                                 id="outlined-start-adornment"
//                                 sx={{ m: 1, width: '25ch' }}
//                                 InputProps={{
//                                     startAdornment: <InputAdornment position="start"></InputAdornment>
//                                 }}
//                             />
//                             <TextField
//                                 value={larg}
//                                 onChange={(e) => setLarg(e.target.value)}
//                                 label="Largeur"
//                                 type="number"
//                                 id="outlined-start-adornment"
//                                 sx={{ m: 1, width: '25ch' }}
//                                 InputProps={{
//                                     startAdornment: <InputAdornment position="start"></InputAdornment>
//                                 }}
//                             />
//                             <TextField
//                                 value={hauteur}
//                                 onChange={(e) => setHauteur(e.target.value)}
//                                 label="Hauteur"
//                                 type="number"
//                                 id="outlined-start-adornment"
//                                 sx={{ m: 1, width: '25ch' }}
//                                 InputProps={{
//                                     startAdornment: <InputAdornment position="start"></InputAdornment>
//                                 }}
//                             />
//                             <br />
//                             <FormControl fullWidth sx={{ m: 1, width: '25ch' }}>
//                                 <InputLabel htmlFor="outlined-adornment-amount">Poids</InputLabel>
//                                 <OutlinedInput
//                                     value={poids}
//                                     type="number"
//                                     onChange={(e) => setPoids(e.target.value)}
//                                     id="outlined-adornment-amount"
//                                     startAdornment={<InputAdornment position="start">Kg</InputAdornment>}
//                                     label="Poids"
//                                 />
//                             </FormControl>
//                             <br />
//                             <Button sx={{ m: 1, width: '20ch' }}
//                                 color="primary"
//                                 onClick={handleSave}
//                                 variant="contained"
//                                 disabled={isSaving}>

//                                 Ajouter
//                             </Button>
//                             {/* </FormControl> */}
//                         </div>
//                     </Box>

//                 </CardContent>
//                 {/* <Divider /> */}

//             </Card>
//         </Container>
//     )
// }

