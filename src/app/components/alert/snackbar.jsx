import * as React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp() {
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
        enqueueSnackbar('I love snacks.');
    };

    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('This is a success message!', { variant });
    };

}

export default function IntegrationNotistack() {
    return (
        <>
            <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
            <SnackbarProvider maxSnack={3}>
                <MyApp />
            </SnackbarProvider>
        </>
    );
}
