import React from "react";
import PaiementView from "../sections/paiement/view/paiement-view";
import { Helmet } from 'react-helmet-async';


export default function DetailsFacturePage() {
    const params = new URLSearchParams(window.location.search);
    const test = params.get('id')
    const sk = params.get('sk')
    return (
        <>
            <Helmet>
                <title> Admin | Paiement </title>
            </Helmet>
            <PaiementView id={test} sk={sk}/>
        </>
    )
}