import React, { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import { red } from '@mui/material/colors';
import { useRouter } from '../../routes/hooks';

import { bgGradient } from '../../theme/css';

import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
import { Container, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { redirect } from 'react-router-dom';

export default function RegisterView() {

    const theme = useTheme();

    const [username, setUsename] = useState();

    const [password, setPassword] = useState();

    const [email, setEmail] = useState();

    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false)

    const handleSave = () => {
        let formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)
        formData.append("email", email)
        axios.post('/api/register', formData)
            .then(function (response) {
                if (response.status == 200 && response.data === 1) {
                    window.location.href = "/login";
                }
                if (response.data === 0) {
                    alert("tsy mety")
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    const renderForm = (
        <>
            <Stack spacing={3}>
                <TextField
                    label="Nom d'utilisateur"
                    id="outlined-start-adornment"
                    // sx={{ m: 1, width: '25ch' }}
                    value={username}
                    onChange={(event) => { setUsename(event.target.value) }}
                >
                </TextField>

                <TextField
                    label="Mot de passe"
                    id="outlined-start-adornment"
                    // sx={{ m: 1, width: '25ch' }}
                    value={password}
                    onChange={(event) => { setPassword(event.target.value) }}
                >
                </TextField>

                <TextField
                    label="Email"
                    id="outlined-start-adornment"
                    // sx={{ m: 1, width: '25ch' }}
                    value={email}
                    onChange={(event) => { setEmail(event.target.value) }}
                >
                </TextField>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="flex-center" sx={{ my: 3 }}>
                <Typography variant="subtitle2" sx={{ color: red[500], '&:hover': { textDecoration: 'underline' } }}>
                    {error}
                </Typography>
            </Stack>

            <LoadingButton
                fullWidth
                size="large"
                loading={loading}
                type="submit"
                variant="contained"
                color="inherit"
                onClick={handleSave}
            >
                S'inscrire
            </LoadingButton>
        </>
    );


    return (

        <Box
            sx={{
                ...bgGradient({
                    color: alpha(theme.palette.background.default, 0.9),
                    imgUrl: '/assets/background/overlay_4.jpg',
                }),
                height: '95vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Contenu à centrer */}
            <Stack alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 400,
                    }}
                >
                    <Typography variant="h4">S'inscrire</Typography>

                    <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                        Inscription en tant qu'Administrateur
                        <Link to="/login" variant="subtitle2" sx={{ ml: 0.5 }}>
                            Se connecter?
                        </Link>
                    </Typography>

                    <Divider sx={{ my: 3 }}>
                        {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            OU
                        </Typography> */}
                    </Divider>

                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );

}
