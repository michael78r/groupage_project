import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TextField } from '@mui/material/TextField';
import { Button } from '@mui/material/Button';
import { Divider } from '@mui/material/Divider';

function GenererColis() {

  const [listecolis, setColis] = useState([])

  const [poidsMax, setPoidsmax] = useState();

  const [date, setDate] = useState()

  const [isChecked, setIsChecked] = useState(false)

  const [datefiltre, setDatefiltre] = useState(null)

  const [datemin, setDatemin] = useState(null)

  const [datemax, setDatemax] = useState(null)

  const [resultat, setResultat] = useState([])


  useEffect(() => {
    fetchColis()
  }, []);

  const fetchColis = () => {
    axios.get(`/api/colis_recu`)
      .then(function (response) {
        setColis(response.data);
      })
      .catch(function (error) {
      })
  }

  console.log("generer", resultat)

  const handleClick = () => {
    const generer = genererConteneur(poidsMax, datemin, datemax);
    setResultat(generer)
  };

  function genererConteneur(poidsmax, datemin, datemax) {

    const poidsMaxConteneur = poidsmax;

    let volumeTotal = 0;

    let colisDansConteneurMax = [];

    let colisTries = listecolis

    if (datemin && datemax != null) {

      const dtmn = dayjs(datemin.$d).format('MM-DD-YYYY');
      const dtmx = dayjs(datemax.$d).format('MM-DD-YYYY');

      colisTries = colisTries.filter(i => {
        const date = dayjs(i.date).format('MM-DD-YYYY');
        return dayjs(date).isAfter(dtmn) && dayjs(date).isBefore(dtmx);
      });

    }

    colisTries.sort((a, b) => b.cbm.localeCompare(a.cbm));

    for (const colis of colisTries) {
      if (volumeTotal + parseFloat(colis.cbm) <= poidsMaxConteneur) { //0+19<53 | 19+18<53 | 37+15>53
        colisDansConteneurMax.push(colis);
        volumeTotal += parseFloat(colis.cbm) //0=0+19+18
      }
    }

    console.log("Volume total du conteneur:", volumeTotal);

    return colisDansConteneurMax;


  }

  const handleIschecked = () => {
    setIsChecked(!isChecked)
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="Date MIN"
            format="DD/MM/YYYY"
            value={datemin}
            onChange={(value) => setDatemin(value)}
            variant="standard"
            slotProps={{
              field: { clearable: true, onClear: () => setDatemin(Object) },
            }}
          />
          <DatePicker
            label="Date MAX"
            format="DD/MM/YYYY"
            value={datemax}
            onChange={(value) => setDatemax(value)}
            variant="standard"
            slotProps={{
              field: { clearable: true, onClear: () => setDatemax(Object) },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>

      <br />
      <input value={poidsMax} placeholder="volumemax" onChange={(event) => { setPoidsmax(event.target.value) }} />
      <button onClick={handleClick}>Générer Conteneur</button>
      {/* <Divider /> */}

      <div>
        <table border={1}>
          <thead>
            <tr>
              <th>Nature</th>
              <th>Date</th>
              <th>CBM</th>
              <th>Poids</th>
            </tr>
          </thead>
          <tbody>
            {listecolis.map((cl, key) => {
              return (
                <tr key={key}>
                  <td>{cl.nature} </td>
                  <td>{cl.date} </td>
                  <td>{cl.cbm}</td>
                  <td>{cl.poids}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {/* <Divider /> */}

      <h2>Resultat: {resultat.length}</h2>
      <div>
      <table border={1}>
          <thead>
            <tr>
              <th>Nature</th>
              <th>Date</th>
              <th>CBM</th>
              <th>Poids</th>
            </tr>
          </thead>
          <tbody>
            {resultat.map((cl, key) => {
              return (
                <tr key={key}>
                  <td>{cl.nature} </td>
                  <td>{cl.date} </td>
                  <td>{cl.cbm}</td>
                  <td>{cl.poids}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>


    </>
  )
}


export default GenererColis;


//  <br />
//         filtre date
//         <select value={datefiltre} onChange={(event) =>  setDatefiltre(event.target.value) }>
//           <option value="0">Croissant</option>
//           <option value="1">Decroissant</option>
//         </select>

              // let colis = listecolis.slice().sort((a, b) => a.date.localeCompare(b.date));

      // console.log("colis", colis)

      // if (datefiltre != null) {
      //   if (datefiltre == 0) {
      //     colis = listecolis.sort((a, b) => a.date.localeCompare(b.date));
      //   }
      //   else if (datefiltre == 1) {
      //     colis = listecolis.sort((a, b) => b.date.localeCompare(a.date));
      //   }
      // }