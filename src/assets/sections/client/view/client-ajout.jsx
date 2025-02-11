import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AlertMessage from '../../../components/alert/alertmessage';
import React, { useState } from 'react';
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CardContent, CardHeader, CardActions } from '@mui/material';
import dayjs from 'dayjs';

export default function ClientAjout() {
    const [numero, setNumero] = useState('TEST1');

    const [num_conteneur, setNumConteneur] = useState('TEST1')

    const [nom_consolidateur, setNomConsolidateur] = useState('Rakoto Jean');

    const [eta, setEta] = useState('');

    const [eta_formatter, setEta_f] = useState('')

    const [del, setDel] = useState('');

    const [del_formatter, setDel_f] = useState('')

    const [taux_vente, setTauxVente] = useState('5000');

    const [isSaving, setIsSaving] = useState(false);

    const [alertOpen, setAlertOpen] = useState(false);

    const [alertType, setAlertType] = useState('success');

    const [alertMessage, setAlertMessage] = useState('');

    const changeEta = (eta) => {
        const dteta = dayjs(eta.$d).format('YYYY-MM-DD'); 
        setEta_f(dteta)
    }

    const changeDel = (eta) => {
        const dtdel = dayjs(eta.$d).format('YYYY-MM-DD');
        setDel_f(dtdel)
    }
    
    const ajoutermanifeste = () => {
        setIsSaving(true);
        let data = new FormData()
        data.append("numero", numero)
        data.append("num_conteneur", num_conteneur)
        data.append("nom_consolidateur", nom_consolidateur)
        data.append("eta", eta_formatter)
        data.append("del", del_formatter)
        data.append("taux_vente", taux_vente)
        data.append("etat", 0)
        axios.post('/api/manifest', data)
            .then(function (response) {
                setIsSaving(false);
                setNumero('')
                setNumConteneur('')
                setNomConsolidateur('')
                setTauxVente('')
                setEta('')
                setDel('')
            })
            .catch(function (error) {
                console.log(error)
                setAlertType('error');
                setAlertMessage("tsy mety");
                setAlertOpen(true);
            }).finally(() => {
                setAlertType('success');
                setAlertMessage('Manifeste ajout avec succès');
                setAlertOpen(true);
                setIsSaving(false)
            }
            );
    }

    return (
        <Container>
            {alertOpen && <AlertMessage open={alertOpen} message={alertMessage} type={alertType} onClose={() => setAlertOpen(false)} />}

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
                <Typography variant="h4">Formulaire d'ajout manifeste</Typography>
            </Stack>
            <Card>
                <CardHeader>
                </CardHeader>
                <CardContent>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div>
                            {/* <FormControl> */}
                            <TextField
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                label="Numero manifeste"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '25ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>
                                }}
                            />
                            <TextField
                                value={num_conteneur}
                                onChange={(e) => setNumConteneur(e.target.value)}
                                label="Numero conteneur"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '25ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>
                                }}
                            />
                            <br />
                            <TextField
                                value={nom_consolidateur}
                                onChange={(e) => setNomConsolidateur(e.target.value)}
                                label="Nom consolidateur"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '52ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>
                                }}
                            />
                            <br />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        value={eta}
                                        format="DD/MM/YYYY"
                                        onChange={(value) => changeEta(value)}
                                        sx={{ m: 1, width: '25ch', ml: 10 }}
                                        label="ETA" />
                                    <br />
                                    <DatePicker
                                        value={del}
                                        format="DD/MM/YYYY"
                                        onChange={(value) => changeDel(value)}
                                        sx={{ m: 1, width: '25ch', ml: 10 }}
                                        label="DEL" />
                                </DemoContainer>
                            </LocalizationProvider>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">Taux</InputLabel>
                                <OutlinedInput
                                    value={taux_vente}
                                    type="number"
                                    onChange={(e) => setTauxVente(e.target.value)}
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">MGA</InputAdornment>}
                                    label="Amount"
                                />
                            </FormControl>
                            <Button sx={{ m: 1, width: '20ch' }}
                                color="primary"
                                onClick={ajoutermanifeste}
                                variant="contained"
                                disabled={isSaving}>

                                Ajouter
                            </Button>
                            {/* </FormControl> */}
                        </div>
                    </Box>

                </CardContent>
                {/* <Divider /> */}

            </Card>
        </Container>
    );
}