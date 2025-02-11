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
  Fab,
  Box
} from '@mui/material';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import axios from 'axios';
import { filterClient, getComparator } from '../../../components/table/utils';
import { useRouter } from '../../../routes/hooks';
import { mois } from '../../../components/utils';
import TableNoData from '../table-no-data';
import Iconify from '../../../components/iconify/iconify';
import ClientTableHead from '../client-table-head';
import ClientTableRow from '../client-table-row';
import ClientTableToolbar from '../client-table-toolbar';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import { styled } from '@mui/material/styles';
import * as XLSX from 'xlsx';
import AlertMessage from '../../../components/alert/alertmessage';
import Papa from 'papaparse';
import TableNoRes from '../../../components/table/tablea-no-res';
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

export default function ClientView() {

  const router = useRouter();

  const redirectFormulaire = () => {
    router.push('/ajoutclient')
  }

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('nom');

  const [filterName, setFilterName] = useState('');

  const [client, setClient] = useState([{"total_cbm":33.09,"id":22,"nom":"Alexandre ","photo":"avatar-3.jpg","shipping_mark":"SM-1006","email":"xavi@gmail.com","phone":"+261 34 65 215 86","prenom":"Simons"},{"total_cbm":2.09,"id":26,"nom":"Eve Marie","photo":"avatar-2.jpg","shipping_mark":"SM-1004","email":"peter@gmail.com","phone":"+261 34 65 215 86","prenom":"Gonzalez"},{"total_cbm":2.39,"id":27,"nom":"Isabelle ","photo":"avatar-1.jpg","shipping_mark":"SM-1003","email":"eve@gmail.com","phone":"+261 34 65 215 86","prenom":"Martinez"},{"total_cbm":0,"id":137,"nom":"Charles","photo":" ","shipping_mark":"SM-1450","email":"charles.emilio@gmail.com","phone":"+33 6 45 88 86 21","prenom":"Emilio"},{"total_cbm":0.51,"id":138,"nom":"Dupont","photo":"","shipping_mark":"SM-1007","email":"marie.dupont@example.com","phone":"+33 6 12 34 56 78","prenom":"Marie"},{"total_cbm":0.05,"id":139,"nom":"Durand","photo":"","shipping_mark":"SM-1009","email":"sophie.durand@example.com","phone":"+33 6 54 32 10 98","prenom":"Sophie"},{"total_cbm":0.82,"id":140,"nom":"Jules","photo":" ","shipping_mark":"SM-1023","email":"jules.tieleman@gmail.com","phone":"+33 8 41 25 33 98","prenom":"Tieleman"},{"total_cbm":1.2,"id":141,"nom":"Martin","photo":"","shipping_mark":"SM-1008","email":"pierre.martin@example.com","phone":"+33 6 98 76 54 32","prenom":"Pierre"},{"total_cbm":0,"id":142,"nom":"Sophie","photo":"avatar-3.jpg","shipping_mark":"SM-1001","email":"michael@gmail.com","phone":"+261 34 65 487 88","prenom":"Garcia"},{"total_cbm":0,"id":143,"nom":"Thomas","photo":"avatar-5.jpg","shipping_mark":"SM-1002","email":"marie@gmail.com","phone":"+261 34 68 977 73","prenom":"Marie"},{"total_cbm":3.63,"id":144,"nom":"Tommy","photo":"avatar-3.jpg","shipping_mark":"SM-1005","email":"pan@gmail.com","phone":"+261 34 65 215 86","prenom":"Martial"}]);

  const [clientcopie, setClientCopie] = useState([{"total_cbm":33.09,"id":22,"nom":"Alexandre ","photo":"avatar-3.jpg","shipping_mark":"SM-1006","email":"xavi@gmail.com","phone":"+261 34 65 215 86","prenom":"Simons"},{"total_cbm":2.09,"id":26,"nom":"Eve Marie","photo":"avatar-2.jpg","shipping_mark":"SM-1004","email":"peter@gmail.com","phone":"+261 34 65 215 86","prenom":"Gonzalez"},{"total_cbm":2.39,"id":27,"nom":"Isabelle ","photo":"avatar-1.jpg","shipping_mark":"SM-1003","email":"eve@gmail.com","phone":"+261 34 65 215 86","prenom":"Martinez"},{"total_cbm":0,"id":137,"nom":"Charles","photo":" ","shipping_mark":"SM-1450","email":"charles.emilio@gmail.com","phone":"+33 6 45 88 86 21","prenom":"Emilio"},{"total_cbm":0.51,"id":138,"nom":"Dupont","photo":"","shipping_mark":"SM-1007","email":"marie.dupont@example.com","phone":"+33 6 12 34 56 78","prenom":"Marie"},{"total_cbm":0.05,"id":139,"nom":"Durand","photo":"","shipping_mark":"SM-1009","email":"sophie.durand@example.com","phone":"+33 6 54 32 10 98","prenom":"Sophie"},{"total_cbm":0.82,"id":140,"nom":"Jules","photo":" ","shipping_mark":"SM-1023","email":"jules.tieleman@gmail.com","phone":"+33 8 41 25 33 98","prenom":"Tieleman"},{"total_cbm":1.2,"id":141,"nom":"Martin","photo":"","shipping_mark":"SM-1008","email":"pierre.martin@example.com","phone":"+33 6 98 76 54 32","prenom":"Pierre"},{"total_cbm":0,"id":142,"nom":"Sophie","photo":"avatar-3.jpg","shipping_mark":"SM-1001","email":"michael@gmail.com","phone":"+261 34 65 487 88","prenom":"Garcia"},{"total_cbm":0,"id":143,"nom":"Thomas","photo":"avatar-5.jpg","shipping_mark":"SM-1002","email":"marie@gmail.com","phone":"+261 34 68 977 73","prenom":"Marie"},{"total_cbm":3.63,"id":144,"nom":"Tommy","photo":"avatar-3.jpg","shipping_mark":"SM-1005","email":"pan@gmail.com","phone":"+261 34 65 215 86","prenom":"Martial"}])

  const [loading, setLoading] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);

  const [alertType, setAlertType] = useState('success');

  const [alertMessage, setAlertMessage] = useState('');

  // useEffect(() => {
  //   fetchClient()
  // }, [])


  const fetchClient = () => {
    axios.get('/api/v_client')
      .then(function (response) {
        setClient(response.data)
        setClientCopie(response.data)
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

  const dataFiltered = filterClient({
    inputData: client,
    comparator: getComparator(order, orderBy),
    filterName
  });

  const non_actif = clientcopie.filter(item => parseFloat(item.total_cbm) == 0).length;
  const actif = clientcopie.filter(item => parseFloat(item.total_cbm) > 0).length;
  const all = clientcopie.length;

  const notFound = !dataFiltered.length && !!filterName;

  const aucunRes = !dataFiltered.length && !filterName

  const [tabValue, setTabValue] = useState('tous');

  const onTabValue = (value) => {
    setTabValue(value)
  }

  const changeTabValue = (newValue) => {
    let newclient = [];

    if (newValue == 'tous') {
      newclient = [...clientcopie];
    }
    else if (newValue == 'non_actif') {
      newclient = clientcopie.filter(item => parseFloat(item.total_cbm) == 0);
    }
    else if (newValue == 'actif') {
      newclient = clientcopie.filter(item => parseFloat(item.total_cbm) > 0);
    }
    setTabValue(newValue);
    setClient(newclient);
    setPage(0)
  };

  useEffect(() => {
    changeTabValue(tabValue)
  }, [tabValue])

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(dataFiltered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Mon excel');

    XLSX.writeFile(wb, 'client_data.xlsx');
  };

  const [fileName, setFileName] = useState('')

  const [delimiterFound, setDelimiterFound] = useState(false)

  const [validRow, setValidRow] = useState(false)

  const [openDialogue, setOpenD] = useState(false)

  const [csvClient, setCSVClient] = useState([]);

  useEffect(() => {
    if (openDialogue) {
      importCSV();
    }
  }, [openDialogue]);


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
              setCSVClient(result.data)
              setOpenD(true)
            },
            error: (error) => {
              console.error('Erreur lors de l\'analyse du fichier CSV:', error);
              setCSVClient([]);
            }
          })
        }
        else {
          setCSVClient([])
          setOpenD(true)
        }
      }
      reader.readAsText(file);
    }
    else{
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

        axios.post('/api/import_client', {
          'csv_client': csvClient
        })
          .then(function (response) {
            if (response.data == 1) {
              setAlertType('success');
              setAlertMessage('import successfully');
              setAlertOpen(true);
              fetchClient()
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
        setCSVClient([])
      }
    })
  }



  return (

    <Container>
      {alertOpen && <AlertMessage open={alertOpen} message={alertMessage} type={alertType} onClose={() => setAlertOpen(false)} />}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Suivi client</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={redirectFormulaire}>
          nouveau client
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
        <ClientTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          tabValue={tabValue}
          onTabValue={onTabValue}
          loading={loading}
          actif={actif}
          non_actif={non_actif}
          all={all}
        />
        {/* <Scrollbar> */}
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <ClientTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleSort}
              headLabel={[
                { id: 'nom', label: 'Nom' },
                { id: 'shipping_mark', label: 'Shipping Mark' },
                { id: 'email', label: 'Email' },
                { id: 'phone', label: 'Telephone' },
                { id: 'total_cbm', label: 'Total volume' },
                { id: 'etat', label: 'Etat' },
                { id: '' },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <ClientTableRow
                    key={row.id}
                    nom={row.nom}
                    prenom={row.prenom}
                    shipping_mark={row.shipping_mark}
                    email={row.email}
                    phone={row.phone}
                    total_cbm={row.total_cbm}
                  />
                ))}
              {notFound && <TableNoData query={filterName} />}
              {aucunRes && <TableNoRes colSpan={8}/>}
            </TableBody>
          </Table>
        </TableContainer>
        {/* </Scrollbar> */}

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

