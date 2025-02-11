import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

export default function AlertMessage({ open, message, type, onClose }) {
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        if (onClose) {
            onClose();
        }
    };

    return (
        <Snackbar open={open}
            autoHideDuration={5000}
            onClose={handleCloseSnackBar}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            TransitionComponent={Slide}
            TransitionProps={{ direction: 'left' }}>
            <Alert
                onClose={handleCloseSnackBar}
                severity={type}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
