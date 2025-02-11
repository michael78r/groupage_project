import React, { useState, useEffect, Fragment } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Invoice from '../components/invoice/Invoice';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function GenererPDF() {

    const [facture, setFacture] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedFacture = localStorage.getItem('facture');
        if (storedFacture) {
            setFacture(JSON.parse(storedFacture));
        }
        setIsLoading(false);
    }, []);

    console.log("ito",facture)

    const containerStyle = {
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
    };

    if (isLoading) {
        return (
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        )
    }

    return (
        <div style={containerStyle}>
            <PDFViewer width="100%" height="100%" className="app">
                <Invoice invoice={facture} />
            </PDFViewer>
        </div>
    )

}


export default GenererPDF;