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
import Alert from '@mui/material/Alert';
import { bgGradient } from '../../theme/css';

import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
import { Container, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { redirect } from 'react-router-dom';


// ----------------------------------------------------------------------


export default function LoginView({ setToken }) {

  const theme = useTheme();

  const LOGIN_URL = '/api/login_check';

  const params = new URLSearchParams(window.location.search);

  const mf = params.get('errors')

  const [warning_message, setWarning] = useState('')

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('')

  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   setError('');
  // }, [username, password])

  useEffect(() => {
    if(mf){
      setWarning('Votre reconnexion est requise')
      setError('')
    }
    else{
      setWarning('')
    }
  },[mf])


  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
      const token = response?.data?.token;
      const roles = response?.data?.roles;
      setToken(token);
      setUsername('');
      setPassword('');
      setLoading(false)
      setError('')
      window.location.reload();

    } catch (error) {
      if (!error?.response) {
        setError('Absence de réponse du serveur');
        setWarning('')
        setLoading(false)
      } else if (error.response?.status === 401) {
        setWarning('')
        setLoading(false)
        setError(`Nom d'utilisateur ou mot de passe manquant`);
      }
      else {
        setWarning('')
        setLoading(false)
        setError('Échec de la connexion');
      }
      // errRef.current.focus();
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}
          label="Nom d'utilisateur" />

        <TextField
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
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
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-center" sx={{ my: 3 }}>
      {warning_message &&  <Alert severity="warning">{warning_message}</Alert>}
      {error &&  <Alert severity="error">{error}</Alert>}
     
        {/* <Typography variant="subtitle2" sx={{ color: red[500], '&:hover': { textDecoration: 'underline' } }}>
          {error}
        </Typography> */}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        loading={loading}
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Se connecter
      </LoadingButton>
    </>
  );

  return (
    // <Container>

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
          <Typography variant="h4">Administrateur</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Vous n'avez pas de compte ?
            <Link to="/register" variant="subtitle2" sx={{ ml: 0.5 }}>
              Inscrivez vous ici
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



    // </Container>
  );
}

LoginView.propTypes = {
  setToken: PropTypes.func.isRequired
}