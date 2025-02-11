import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';

import { RouterLink } from '../../routes/components';


import Logo from '../../components/logo';

// ----------------------------------------------------------------------

export default function Page401() {
    const renderHeader = (
        <Box
            component="header"
            sx={{
                top: 0,
                left: 0,
                width: 1,
                lineHeight: 0,
                position: 'fixed',
                p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
            }}
        >
        </Box>
    );

    return (
        <>
            {renderHeader}

            <Container>
                <Box
                    sx={{
                        py: 12,
                        maxWidth: 480,
                        mx: 'auto',
                        display: 'flex',
                        minHeight: '100vh',
                        textAlign: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h3" sx={{ mb: 3 }}>

                        Désolé, page non autorisé !
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>

                        Désolé, vous n'êtes pas autorisé à accéder à cette page. Veuillez vérifier votre orthographe ou contacter l'administrateur pour obtenir l'accès approprié.
                    </Typography>

                    <Box
                        component="img"
                        src="/assets/illustrations/Unauthorized-rafiki.svg"
                        sx={{
                            mx: 'auto',
                            height: 260,
                            my: { xs: 5, sm: 10 },
                        }}
                    />

                    <Button href="/" size="large" variant="contained" component={RouterLink}>
                        Tableau de bord
                    </Button>
                </Box>
            </Container>
        </>
    );
}
