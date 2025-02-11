import { Helmet } from 'react-helmet-async';

import React, { useState, useEffect } from 'react';
import ManifestView from '../sections/manifest/view/man-view';
import ColisView from '../sections/colis/view/colis-view';
import axios from 'axios';
// ----------------------------------------------------------------------

export default function ColisPage() {

  const params = new URLSearchParams(window.location.search);
  const mf = params.get('mf')
  const [nc, setNc] = useState('')
  const [mid, setMid] = useState('')
  // console.log("test",mf)
  
  useEffect(() => {
    if(mf){
      setNc(mf)
      getManID(mf)
    }
    else {
      setNc('Numero Conteneur')
    }
  }, [mf])

  const getManID = () => {
    axios.get(`/api/manifest_id/${mf}`)
      .then(function (response) {
        setMid(response.data.id)
      })
      .catch(function (error) {
        console.log(error)
      })
  };
  
  return (
    <>
      <Helmet>
        <title> Admin | Colis </title>
      </Helmet>

      <ColisView nc={nc} mid={mid}/>
    </>
  );
}
