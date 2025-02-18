import React, { useState, useEffect } from 'react'
import {
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
  Box,
  Fab
} from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { filterManifeste, getComparator } from '../../../components/table/utils';
import { useRouter } from '../../../routes/hooks';
import { mois } from '../../../components/utils';
import TableNoData from '../table-no-data';
import Iconify from '../../../components/iconify/iconify';
import ManTableRow from '../man-table-row';
import ManTableHead from '../man-table-head';
import ManTableToolbar from '../man-table-toolbar';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import * as XLSX from 'xlsx';
import { styled } from '@mui/material/styles';
import Papa from 'papaparse';
import AlertMessage from '../../../components/alert/alertmessage';
import Swal from 'sweetalert2';
import TableNoRes from '../../../components/table/tablea-no-res';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export default function ManifestView() {

  const router = useRouter();

  const redirectFormulaire = () => {
    router.push('/ajoutmanifest')
  }

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [order, setOrder] = useState('desc');

  const [orderBy, setOrderBy] = useState('volume');

  const [filterName, setFilterName] = useState('');

  const [manifeste, setManifeste] = useState([{"volume":7.02,"id":32,"numero":"MAN-0003","numero_conteneur":"CONT-MNO567","nom_consolidateur":"Express Freight","eta":"2024-04-09","etat":1,"taux_vente":"3800.00","del":"2024-05-10"},{"volume":6.18,"id":34,"numero":"MAN-0005","numero_conteneur":"CONT-345655s","nom_consolidateur":"DEF Logistics","eta":"2024-05-19","etat":2,"taux_vente":"5200.00","del":"2024-06-11"},{"volume":0.95,"id":228,"numero":"MAN-0001","numero_conteneur":"CONT-DEF456","nom_consolidateur":"Speedy Cargo","eta":"2023-10-12","etat":1,"taux_vente":"5000.00","del":"2024-03-13"},{"volume":0,"id":229,"numero":"MAN-0002","numero_conteneur":"CONT-JKL012","nom_consolidateur":"Fast Forwarding","eta":"2023-12-12","etat":0,"taux_vente":"5000.00","del":"2024-02-13"},{"volume":0,"id":230,"numero":"MAN-0004","numero_conteneur":"CONT-PQR678","nom_consolidateur":"Reliable Transport","eta":"2023-12-12","etat":0,"taux_vente":"5000.00","del":"2024-07-13"},{"volume":0,"id":231,"numero":"MAN-0006","numero_conteneur":"CONT-YZ012","nom_consolidateur":"Express Freight","eta":"2022-12-12","etat":0,"taux_vente":"5000.00","del":"2024-02-13"},{"volume":0,"id":232,"numero":"MAN-0007","numero_conteneur":"CONT-9012","nom_consolidateur":"XYZ Shipping","eta":"2024-03-28","etat":0,"taux_vente":"4700.00","del":"2024-04-01"},{"volume":0,"id":233,"numero":"MAN-0008","numero_conteneur":"CONT-VWX234","nom_consolidateur":"Swift Shipping","eta":"2023-10-12","etat":0,"taux_vente":"5000.00","del":"2024-02-13"},{"volume":0,"id":234,"numero":"MAN-0009","numero_conteneur":"CONT-ABC123","nom_consolidateur":"Global Logistics","eta":"2024-01-12","etat":0,"taux_vente":"4500.00","del":"2024-01-13"},{"volume":0,"id":235,"numero":"MAN-0010","numero_conteneur":"CONT-STU901","nom_consolidateur":"Quick Cargo","eta":"2023-12-22","etat":0,"taux_vente":"5000.00","del":"2024-06-13"},{"volume":0.34,"id":236,"numero":"MAN-0011","numero_conteneur":"CONT-5678","nom_consolidateur":"ABC Consolidators","eta":"2024-04-01","etat":0,"taux_vente":"5800.00","del":"2024-04-01"},{"volume":0.16,"id":237,"numero":"MAN-0012","numero_conteneur":"CONT-JKL234","nom_consolidateur":"Reliable Transport","eta":"2024-02-17","etat":0,"taux_vente":"5000.00","del":"2024-02-24"},{"volume":0,"id":238,"numero":"MAN-0013","numero_conteneur":"CONT-MNO345","nom_consolidateur":"Express Freight","eta":"2023-02-12","etat":0,"taux_vente":"5000.00","del":"2024-02-13"},{"volume":0,"id":239,"numero":"MAN-0014","numero_conteneur":"CONT-VWX456","nom_consolidateur":"Express Freight","eta":"2024-12-20","etat":0,"taux_vente":"5000.00","del":"2024-12-30"},{"volume":2.28,"id":240,"numero":"MAN-0015","numero_conteneur":"CONT-STU123","nom_consolidateur":"Reliable Transport","eta":"2024-03-05","etat":0,"taux_vente":"5000.00","del":"2024-03-07"},{"volume":4.24,"id":241,"numero":"MAN-0016","numero_conteneur":"CONT-GHI789","nom_consolidateur":"Swift Shipping","eta":"2024-06-12","etat":2,"taux_vente":"4000.00","del":"2024-06-13"}]);

  const [manifestecopie, setManifestecopie] = useState([{"volume":7.02,"id":32,"numero":"MAN-0003","numero_conteneur":"CONT-MNO567","nom_consolidateur":"Express Freight","eta":"2024-04-09","etat":1,"taux_vente":"3800.00","del":"2024-05-10"},{"volume":6.18,"id":34,"numero":"MAN-0005","numero_conteneur":"CONT-345655s","nom_consolidateur":"DEF Logistics","eta":"2024-05-19","etat":2,"taux_vente":"5200.00","del":"2024-06-11"},{"volume":0.95,"id":228,"numero":"MAN-0001","numero_conteneur":"CONT-DEF456","nom_consolidateur":"Speedy Cargo","eta":"2023-10-12","etat":1,"taux_vente":"5000.00","del":"2024-03-13"},{"volume":0,"id":229,"numero":"MAN-0002","numero_conteneur":"CONT-JKL012","nom_consolidateur":"Fast Forwarding","eta":"2023-12-12","etat":0,"taux_vente":"5000.00","del":"2024-02-13"},{"volume":0,"id":230,"numero":"MAN-0004","numero_conteneur":"CONT-PQR678","nom_consolidateur":"Reliable Transport","eta":"2023-12-12","etat":0,"taux_vente":"5000.00","del":"2024-07-13"},{"volume":0,"id":231,"numero":"MAN-0006","numero_conteneur":"CONT-YZ012","nom_consolidateur":"Express Freight","eta":"2022-12-12","etat":0,"taux_vente":"5000.00","del":"2024-02-13"},{"volume":0,"id":232,"numero":"MAN-0007","numero_conteneur":"CONT-9012","nom_consolidateur":"XYZ Shipping","eta":"2024-03-28","etat":0,"taux_vente":"4700.00","del":"2024-04-01"},{"volume":0,"id":233,"numero":"MAN-0008","numero_conteneur":"CONT-VWX234","nom_consolidateur":"Swift Shipping","eta":"2023-10-12","etat":0,"taux_vente":"5000.00","del":"2024-02-13"},{"volume":0,"id":234,"numero":"MAN-0009","numero_conteneur":"CONT-ABC123","nom_consolidateur":"Global Logistics","eta":"2024-01-12","etat":0,"taux_vente":"4500.00","del":"2024-01-13"},{"volume":0,"id":235,"numero":"MAN-0010","numero_conteneur":"CONT-STU901","nom_consolidateur":"Quick Cargo","eta":"2023-12-22","etat":0,"taux_vente":"5000.00","del":"2024-06-13"},{"volume":0.34,"id":236,"numero":"MAN-0011","numero_conteneur":"CONT-5678","nom_consolidateur":"ABC Consolidators","eta":"2024-04-01","etat":0,"taux_vente":"5800.00","del":"2024-04-01"},{"volume":0.16,"id":237,"numero":"MAN-0012","numero_conteneur":"CONT-JKL234","nom_consolidateur":"Reliable Transport","eta":"2024-02-17","etat":0,"taux_vente":"5000.00","del":"2024-02-24"},{"volume":0,"id":238,"numero":"MAN-0013","numero_conteneur":"CONT-MNO345","nom_consolidateur":"Express Freight","eta":"2023-02-12","etat":0,"taux_vente":"5000.00","del":"2024-02-13"},{"volume":0,"id":239,"numero":"MAN-0014","numero_conteneur":"CONT-VWX456","nom_consolidateur":"Express Freight","eta":"2024-12-20","etat":0,"taux_vente":"5000.00","del":"2024-12-30"},{"volume":2.28,"id":240,"numero":"MAN-0015","numero_conteneur":"CONT-STU123","nom_consolidateur":"Reliable Transport","eta":"2024-03-05","etat":0,"taux_vente":"5000.00","del":"2024-03-07"},{"volume":4.24,"id":241,"numero":"MAN-0016","numero_conteneur":"CONT-GHI789","nom_consolidateur":"Swift Shipping","eta":"2024-06-12","etat":2,"taux_vente":"4000.00","del":"2024-06-13"}])

  const [loading, setLoading] = useState(false);

  const [datemax, setDatemax] = useState(null)

  const [datemin, setDatemin] = useState(null)

  const [alertOpen, setAlertOpen] = useState(false);

  const [alertType, setAlertType] = useState('success');

  const [alertMessage, setAlertMessage] = useState('');


  // useEffect(() => {
  //   fetchManifest()
  // }, [])

  const changeDatemin = (date) => {
    setDatemin(date)
  }

  const changeDatemax = (date) => {
    setDatemax(date)
  }

  const fetchManifest = () => {
    axios.get('/api/manifeste')
      .then(function (response) {
        setManifeste(response.data)
        setManifestecopie(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(() =>
        setLoading(false)
      )
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const dataFiltered = filterManifeste({
    inputData: manifeste,
    comparator: getComparator(order, orderBy),
    filterName,
    datemin, datemax
  });

  const non_valide = manifestecopie.filter(item => item.etat === 0).length;
  const valide = manifestecopie.filter(item => item.etat === 1).length;
  const cloture = manifestecopie.filter(item => item.etat === 2).length;
  const all = manifestecopie.length;

  const notFound = !dataFiltered.length && !!filterName;

  const aucunRes = !dataFiltered.length && !filterName

  const [tabValue, setTabValue] = useState('tous');

  const onTabValue = (value) => {
    setTabValue(value)
  }

  const changeTabValue = (newValue) => {
    let newManifeste = [];

    if (newValue === 'tous') {
      newManifeste = [...manifestecopie];
    }
    else if (newValue === 'non_valide') {
      newManifeste = manifestecopie.filter(item => item.etat === 0);
    }
    else if (newValue === 'valide') {
      newManifeste = manifestecopie.filter(item => item.etat === 1);
    }
    else if (newValue === 'cloture') {
      newManifeste = manifestecopie.filter(item => item.etat === 2);
    }
    setTabValue(newValue);
    setManifeste(newManifeste);
    setPage(0)
  };

  useEffect(() => {
    changeTabValue(tabValue)
  }, [tabValue])

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(dataFiltered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Mon excel');

    XLSX.writeFile(wb, 'manifeste_data.xlsx');
  };

  const [fileName, setFileName] = useState('')

  const [delimiterFound, setDelimiterFound] = useState(false)

  const [validRow, setValidRow] = useState(false)

  const [openDialogue, setOpenD] = useState(false)

  const [csvManifeste, setCSVManifeste] = useState([]);

  useEffect(() => {
    if (openDialogue) {
      importCSV();
    }
  }, [openDialogue]);

  console.log(csvManifeste)

  const onFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      const fileName = file.name;
      setFileName(fileName)
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;
        const { delimiterFound, validRow } = checkDelimiterAndValidRow(fileContent)
        setDelimiterFound(delimiterFound)
        setValidRow(validRow)

        if (delimiterFound) {
          Papa.parse(file, {
            header: true,
            delimter: ';',
            skipEmptyLines: true,
            complete: (result) => {
              setCSVManifeste(result.data)
              setOpenD(true)
            },
            error: (error) => {
              console.error('Erreur lors de l\'analyse du fichier CSV:', error);
              setCSVManifeste([]);
            }
          })
        }
        else {
          setCSVManifeste([])
          setOpenD(true)
        }
      }
      reader.readAsText(file);

    }
    else {
      console.log('Aucun fichier sélectionné')
    }
  }

  const checkDelimiterAndValidRow = (content) => {
    let delimiterFound = false;
    let validRow = false;
    const lines = content.split('\n');
    const firstLine = lines[0];

    if (firstLine.includes(';')) {
      delimiterFound = true;
      const cr = firstLine.split(';');
      if (cr.length === 6) {
        validRow = true;
      }
    }
    return { delimiterFound, validRow };
  };


  const importCSV = () => {
    setOpenD(false)
    let message = '<div style="margin-top:20px;">';

    if (delimiterFound) {
      message += '<div style="margin-bottom:10px;"><i class="swal2-success-line"></i> Délimiteur trouvé.</div>';
    } else {
      message += '<div style="margin-bottom:10px;"><i class="swal2-error-line"></i> Délimiteur non trouvé.</div>';
    }

    if (validRow) {
      message += '<div style="margin-bottom:10px;"><i class="swal2-success-line"></i> Nombre colonne valide.</div>';
    } else {
      message += '<div style="margin-bottom:10px;"><i class="swal2-error-line"></i> Nombre colonne non valide.</div>';
    }

    message += '</div>';
    Swal.fire({
      title: `Verification du fichier ${fileName} ?`,
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      backdrop: true,
      html: message
    }).then((result) => {
      if (result.isConfirmed) {

        axios.post('/api/import_manifeste', {
          'csv_manifeste': csvManifeste
        })
          .then(function (response) {
            if (response.data == 1) {
              setAlertType('success');
              setAlertMessage('import successfully');
              setAlertOpen(true);
              fetchManifest()
              setTabValue('tous')
            }
            else {
              setAlertType('error');
              setAlertMessage('erreur');
              setAlertOpen(true);
            }
            console.log(response.data)

          })
          .catch(function (error) {
            console.log(error)
          });
      }
      else {
        setCSVManifeste([])
      }
    })
  }


  return (

    <Container>
      {alertOpen && <AlertMessage open={alertOpen} message={alertMessage} type={alertType} onClose={() => setAlertOpen(false)} />}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h4">Suivi manifeste</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={redirectFormulaire}>
          nouveau manifeste
        </Button>

      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>

        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab size="small" variant="extended" component="label" role={undefined} onChange={onFileChange}>
            <PublishRoundedIcon sx={{ width: 15, mr: 1 }} />
            Import CSV
            <VisuallyHiddenInput type="file" />
          </Fab>

          <Fab onClick={exportToExcel} size="small" variant="extended">
            <GetAppRoundedIcon sx={{ width: 15, mr: 1 }} />
            Export excel
          </Fab>
        </Box>
      </Stack>
      <Card>
        <ManTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          datemin={datemin}
          onDatemin={changeDatemin}
          onDatemax={changeDatemax}
          datemax={datemax}
          tabValue={tabValue}
          onTabValue={onTabValue}
          loading={loading}
          valide={valide}
          non_valide={non_valide}
          cloture={cloture}
          all={all}
        />
        <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <ManTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleSort}
              headLabel={[
                { id: 'numero', label: 'Numero' },
                { id: 'numero_conteneur', label: 'Numero Conteneur' },
                { id: 'nom_consolidateur', label: 'Nom consolidateur' },
                { id: 'eta', label: 'ETA' },
                { id: 'volume', label: 'Volume' },
                { id: 'taux_vente', label: 'Taux MGA' },
                { id: 'etat', label: 'Etat', align: 'center' },
                { id: '' },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <ManTableRow
                    key={row.id}
                    manifest_id={row.id}
                    numero={row.numero}
                    numero_conteneur={row.numero_conteneur}
                    nom_consolidateur={row.nom_consolidateur}
                    eta={row.eta}
                    etat={row.etat}
                    taux_vente={row.taux_vente}
                    volume={row.volume}
                  />
                ))}
              {notFound && <TableNoData query={filterName} />}
              {aucunRes && <TableNoRes colSpan={10}/>}
              
            </TableBody>
          </Table>
        </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

