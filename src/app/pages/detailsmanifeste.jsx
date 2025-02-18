import { Helmet } from 'react-helmet-async';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import FactureView from '../sections/facture/view/facture-view';
import { Grid } from '@mui/material';
import ProformaView from '../sections/proforma/view/proforma-view';
// ----------------------------------------------------------------------

export default function DetailsManifestPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('manifest_id')
  const [sk, setSk] = useState(1)
  const [newEtat, setNewEtat] = useState();

  useEffect(() => {
    setSk(params.get('sk'))
  }, [sk])

  useEffect(() => {
    const timer = setTimeout(() => {
      setNewEtat(params.get('sk'));
    }, 500);

    return () => clearTimeout(timer);
  }, [sk]);

  console.log("newEtat", newEtat)

  const checkEtat = () => {
    axios.get(`/api/check_etat/${id}`)
      .then(function (response) {
        setNewEtat(response.data);
      })
      .catch(function (error) {
        console.log(error)
      })
  }


  if (newEtat == 0) {
    return (
      <>
        <Helmet>
          <title> Admin | Proforma </title>
        </Helmet>
        <ProformaView manifest_id={id} />
      </>
    )
  }
  else if (newEtat == 1 || newEtat == 2) {
    return (
      <>
        <Helmet>
          <title> Admin | Facture </title>
        </Helmet>
        <FactureView manifest_id={id} />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title> Admin </title>
      </Helmet>
      <Container maxWidth="xl">
        {sk == 0 &&
          <Stack spacing={6}>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            <Skeleton variant="rounded" height={200} />
          </Stack>}
        {sk == 1 || sk == 2 ? (
          <Stack spacing={3}>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={100} />
            <br />
            <Grid container wrap="nowrap" justifyContent="space-between">
              <Skeleton variant="rounded" width={230} height={80} sx={{ borderRadius: 4 }} />
              <Skeleton variant="rounded" width={230} height={80} sx={{ borderRadius: 4 }} />
              <Skeleton variant="rounded" width={230} height={80} sx={{ borderRadius: 4 }} />
              <Skeleton variant="rounded" width={230} height={80} sx={{ borderRadius: 4 }} />
              <Skeleton variant="rounded" width={230} height={80} sx={{ borderRadius: 4 }} />
              <Skeleton variant="rounded" width={230} height={80} sx={{ borderRadius: 4 }} />
            </Grid>

            <Skeleton variant="rounded" height={100} />

            <Grid container wrap="nowrap" justifyContent="space-between">
              <Skeleton variant="rounded" width={990} height={80} sx={{ borderRadius: 4 }} />
              <Skeleton variant="rounded" width={480} height={60} sx={{ borderRadius: 4 }} />
            </Grid>
          </Stack>
        ) : null}


      </Container>
    </>
  );
}
