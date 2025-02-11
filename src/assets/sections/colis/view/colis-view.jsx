import { useState, useEffect } from 'react';
import React from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Fab,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import TableNoData from '../table-no-data';
import Iconify from '../../../components/iconify/iconify';
import ColisTableRow from '../colis-table-row';
import ColisTableHead from '../colis-table-head';
import TableEmptyRows from '../table-empty-rows';
import ColisTableToolbar from '../colis-table-toolbar';
import { filterColis, emptyRows, getComparator } from '../../../components/table/utils';
import Papa from 'papaparse';
import AlertMessage from '../../../components/alert/alertmessage';
import { useRouter } from '../../../routes/hooks/use-router'
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
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


export default function ColisView({ nc, mid }) {

  const router = useRouter();

  const redirectFormulaire = () => {
    router.push('/addcolis')
  }

  const [numero, setNumero] = useState(nc)

  const [etat, setEtat] = useState(0);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [tabValue, setTabValue] = useState('all');

  const [orderBy, setOrderBy] = useState('reference');

  const [filterName, setFilterName] = useState('');

  const [filterNature, setFilterNature] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [loading, setLoading] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);

  const [alertType, setAlertType] = useState('success');

  const [alertMessage, setAlertMessage] = useState('');

  const [man_id, setMan_id] = useState()

  const [manifest, setManifest] = useState([[{"label":"CONT-JKL012","id":229},{"label":"CONT-PQR678","id":230},{"label":"CONT-YZ012","id":231},{"label":"CONT-9012","id":232},{"label":"CONT-VWX234","id":233},{"label":"CONT-ABC123","id":234},{"label":"CONT-STU901","id":235},{"label":"CONT-5678","id":236},{"label":"CONT-JKL234","id":237},{"label":"CONT-MNO345","id":238},{"label":"CONT-VWX456","id":239},{"label":"CONT-STU123","id":240}]])

  const [selected, setSelected] = useState([]);

  const [colis, setColis] = useState([{"id":585,"nature":"Colis eclair","reference":"REF-1001","poids":14,"date":"2024-06-10T00:00:00+02:00","is_recu":1,"cbm":"0.32","manifest_id":34,"client_id":22},{"id":586,"nature":"Pack Vitesse","reference":"REF-1002","poids":22,"date":"2024-06-19T00:00:00+02:00","is_recu":1,"cbm":"0.83","manifest_id":34,"client_id":22},{"id":587,"nature":"Box Rapide","reference":"REF-1003","poids":14,"date":"2024-05-04T00:00:00+02:00","is_recu":1,"cbm":"0.80","manifest_id":34,"client_id":22},{"id":588,"nature":"Parcelle Express","reference":"REF-1004","poids":25,"date":"2024-05-10T00:00:00+02:00","is_recu":1,"cbm":"2.10","manifest_id":32,"client_id":22},{"id":589,"nature":"Envoi Turbo","reference":"REF-1005","poids":14,"date":"2024-06-26T00:00:00+02:00","is_recu":1,"cbm":"2.38","manifest_id":32,"client_id":22},{"id":590,"nature":"Cargo Sprint","reference":"REF-1006","poids":20,"date":"2024-06-10T00:00:00+02:00","is_recu":1,"cbm":"0.90","manifest_id":32,"client_id":26},{"id":591,"nature":"Paquet Blitz","reference":"REF-1007","poids":20,"date":"2024-05-14T00:00:00+02:00","is_recu":1,"cbm":"1.00","manifest_id":32,"client_id":26},{"id":592,"nature":"Livraison Flash","reference":"REF-1008","poids":9,"date":"2024-05-03T00:00:00+02:00","is_recu":1,"cbm":"0.19","manifest_id":174,"client_id":26},{"id":593,"nature":"Colis Prompt","reference":"REF-1009","poids":26,"date":"2024-06-24T00:00:00+02:00","is_recu":1,"cbm":"2.48","manifest_id":34,"client_id":25},{"id":594,"nature":"Boite Speedy","reference":"REF-1010","poids":15,"date":"2024-06-24T00:00:00+02:00","is_recu":1,"cbm":"1.75","manifest_id":34,"client_id":27},{"id":595,"nature":"Paquet Dynamique *","reference":"REF-1011","poids":15,"date":"2024-06-24T00:00:00+02:00","is_recu":1,"cbm":"0.64","manifest_id":32,"client_id":27},{"id":1084,"nature":"Envoi Rapido","reference":"REF-1012","poids":15,"date":"2024-02-14T00:00:00+01:00","is_recu":1,"cbm":"0.36","manifest_id":228,"client_id":22},{"id":1085,"nature":"Box Fulgurant","reference":"REF-1013","poids":77,"date":"2024-03-21T00:00:00+01:00","is_recu":1,"cbm":"0.51","manifest_id":228,"client_id":22},{"id":1086,"nature":"Paquet eclaire","reference":"REF-1014","poids":20,"date":"2024-01-10T00:00:00+01:00","is_recu":1,"cbm":"0.08","manifest_id":228,"client_id":22},{"id":1087,"nature":"Colis Turbo Boost","reference":"REF-1015","poids":21,"date":"2023-01-06T00:00:00+01:00","is_recu":1,"cbm":"1.09","manifest_id":240,"client_id":22},{"id":1088,"nature":"Pack Quicktime","reference":"REF-1016","poids":5,"date":"2024-02-14T00:00:00+01:00","is_recu":1,"cbm":"0.51","manifest_id":240,"client_id":138},{"id":1089,"nature":"Livraison Instantanee","reference":"REF-1017","poids":7,"date":"2024-02-22T00:00:00+01:00","is_recu":1,"cbm":"0.05","manifest_id":null,"client_id":139},{"id":1090,"nature":"Boite eclaireur","reference":"REF-1018","poids":50,"date":"2024-01-10T00:00:00+01:00","is_recu":1,"cbm":"0.82","manifest_id":null,"client_id":140},{"id":1091,"nature":"Colis Hyperdrive","reference":"REF-1019","poids":12,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"1.20","manifest_id":null,"client_id":141},{"id":1092,"nature":"Parcelle Rapide","reference":"REF-1020","poids":13,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"1.37","manifest_id":null,"client_id":22},{"id":1093,"nature":"Box Agile","reference":"REF-1021","poids":42,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.17","manifest_id":null,"client_id":22},{"id":1094,"nature":"Colis Velocity","reference":"REF-1022","poids":12,"date":"2024-02-29T00:00:00+01:00","is_recu":0,"cbm":"0.81","manifest_id":null,"client_id":22},{"id":1095,"nature":"Livraison Ultrarapide","reference":"REF-1023","poids":200,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.10","manifest_id":null,"client_id":22},{"id":1096,"nature":"Paquet Expresso","reference":"REF-1024","poids":21,"date":"2023-01-05T00:00:00+01:00","is_recu":0,"cbm":"0.69","manifest_id":null,"client_id":22},{"id":1097,"nature":"Envoi eclairci","reference":"REF-1025","poids":7,"date":"2024-01-10T00:00:00+01:00","is_recu":1,"cbm":"0.34","manifest_id":236,"client_id":22},{"id":1098,"nature":"Cargo Flash","reference":"REF-1026","poids":12,"date":"2024-02-14T00:00:00+01:00","is_recu":1,"cbm":"0.16","manifest_id":237,"client_id":22},{"id":1099,"nature":"Boite de Course","reference":"REF-1027","poids":4,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.80","manifest_id":null,"client_id":22},{"id":1100,"nature":"Colis Supercharge","reference":"REF-1028","poids":15,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"1.04","manifest_id":null,"client_id":22},{"id":1101,"nature":"Pack Rapido","reference":"REF-1029","poids":12,"date":"2024-01-14T00:00:00+01:00","is_recu":1,"cbm":"0.35","manifest_id":240,"client_id":22},{"id":1102,"nature":"Parcelle Hate","reference":"REF-1030","poids":15,"date":"2024-02-08T00:00:00+01:00","is_recu":1,"cbm":"0.33","manifest_id":240,"client_id":22},{"id":1103,"nature":"Box Accelerate","reference":"REF-1031","poids":24,"date":"2024-02-14T00:00:00+01:00","is_recu":0,"cbm":"0.12","manifest_id":null,"client_id":22},{"id":1104,"nature":"Livraison Quickstart","reference":"REF-1032","poids":12,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.18","manifest_id":null,"client_id":22},{"id":1105,"nature":"Paquet Momentum","reference":"REF-1033","poids":60,"date":"2024-02-26T00:00:00+01:00","is_recu":0,"cbm":"0.23","manifest_id":null,"client_id":22},{"id":1106,"nature":"Envoi Turbocharged","reference":"REF-1034","poids":20,"date":"2024-01-22T00:00:00+01:00","is_recu":0,"cbm":"0.69","manifest_id":null,"client_id":22},{"id":1107,"nature":"Colis Warp","reference":"REF-1035","poids":50,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.27","manifest_id":null,"client_id":22},{"id":1108,"nature":"Boite de Vitesse","reference":"REF-1036","poids":20,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.61","manifest_id":null,"client_id":22},{"id":1109,"nature":"Pack Turbo","reference":"REF-1037","poids":8,"date":"2024-02-10T00:00:00+01:00","is_recu":0,"cbm":"0.27","manifest_id":null,"client_id":22},{"id":1110,"nature":"Cargo Flashback","reference":"REF-1038","poids":12,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.15","manifest_id":null,"client_id":22},{"id":1111,"nature":"Parcelle Sprinter","reference":"REF-1039","poids":12,"date":"2024-01-13T00:00:00+01:00","is_recu":0,"cbm":"0.18","manifest_id":null,"client_id":22},{"id":1112,"nature":"Livraison Blitz","reference":"REF-1040","poids":16,"date":"2024-02-14T00:00:00+01:00","is_recu":0,"cbm":"0.88","manifest_id":null,"client_id":22},{"id":1113,"nature":"Box Prompt","reference":"REF-1041","poids":6,"date":"2024-02-26T00:00:00+01:00","is_recu":0,"cbm":"0.05","manifest_id":null,"client_id":22},{"id":1114,"nature":"Colis Rapidfire","reference":"REF-1042","poids":20,"date":"2024-02-20T00:00:00+01:00","is_recu":0,"cbm":"0.40","manifest_id":null,"client_id":22},{"id":1115,"nature":"Pack Momentum","reference":"REF-1043","poids":10,"date":"2024-02-14T00:00:00+01:00","is_recu":0,"cbm":"0.61","manifest_id":null,"client_id":22},{"id":1116,"nature":"Paquet Boost","reference":"REF-1044","poids":66,"date":"2024-02-14T00:00:00+01:00","is_recu":0,"cbm":"0.13","manifest_id":null,"client_id":22},{"id":1117,"nature":"Envoi Hyper","reference":"REF-1045","poids":66,"date":"2024-02-20T00:00:00+01:00","is_recu":0,"cbm":"0.22","manifest_id":null,"client_id":22},{"id":1118,"nature":"Cargo Flashforward","reference":"REF-1046","poids":25,"date":"2024-03-28T00:00:00+01:00","is_recu":0,"cbm":"0.07","manifest_id":null,"client_id":22},{"id":1119,"nature":"Boite Quicktime","reference":"REF-1047","poids":80,"date":"2024-02-20T00:00:00+01:00","is_recu":0,"cbm":"0.09","manifest_id":null,"client_id":22},{"id":1120,"nature":"Colis Velocity+","reference":"REF-1048","poids":6,"date":"2024-02-14T00:00:00+01:00","is_recu":0,"cbm":"1.44","manifest_id":null,"client_id":22},{"id":1121,"nature":"Pack Ultrarapide","reference":"REF-1049","poids":9,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.06","manifest_id":null,"client_id":22},{"id":1122,"nature":"Parcelle Expressway","reference":"REF-1050","poids":21,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.20","manifest_id":null,"client_id":22},{"id":1123,"nature":"Livraison Velocity","reference":"REF-1051","poids":21,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.60","manifest_id":null,"client_id":22},{"id":1124,"nature":"Box Quickfire","reference":"REF-1052","poids":21,"date":"2024-01-11T00:00:00+01:00","is_recu":0,"cbm":"0.44","manifest_id":null,"client_id":22},{"id":1125,"nature":"Colis Flashpoint","reference":"REF-1053","poids":33,"date":"2024-01-13T00:00:00+01:00","is_recu":0,"cbm":"0.37","manifest_id":null,"client_id":22},{"id":1126,"nature":"Pack Sprint","reference":"REF-1054","poids":14,"date":"2024-02-14T00:00:00+01:00","is_recu":0,"cbm":"0.10","manifest_id":null,"client_id":22},{"id":1127,"nature":"Paquet Accelerator","reference":"REF-1055","poids":41,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.70","manifest_id":null,"client_id":22},{"id":1128,"nature":"Envoi Fasttrack","reference":"REF-1056","poids":16,"date":"2024-01-24T00:00:00+01:00","is_recu":0,"cbm":"2.25","manifest_id":null,"client_id":22},{"id":1129,"nature":"Cargo Swift","reference":"REF-1057","poids":15,"date":"2024-01-24T00:00:00+01:00","is_recu":0,"cbm":"0.12","manifest_id":null,"client_id":22},{"id":1130,"nature":"Boite Expresslane","reference":"REF-1058","poids":15,"date":"2024-01-24T00:00:00+01:00","is_recu":0,"cbm":"1.21","manifest_id":null,"client_id":22},{"id":1131,"nature":"Colis Turbocharge","reference":"REF-1059","poids":15,"date":"2024-02-20T00:00:00+01:00","is_recu":0,"cbm":"1.93","manifest_id":null,"client_id":22},{"id":1132,"nature":"Pack Flash","reference":"REF-1060","poids":12,"date":"2024-01-14T00:00:00+01:00","is_recu":0,"cbm":"0.08","manifest_id":null,"client_id":22},{"id":1133,"nature":"Parcelle Rush","reference":"REF-1061","poids":8,"date":"2024-02-14T00:00:00+01:00","is_recu":0,"cbm":"0.02","manifest_id":null,"client_id":22},{"id":1134,"nature":"Livraison Rapidfire+","reference":"REF-1062","poids":10,"date":"2024-02-10T00:00:00+01:00","is_recu":0,"cbm":"0.80","manifest_id":null,"client_id":22},{"id":1135,"nature":"Box Swifttrack","reference":"REF-1063","poids":12,"date":"2024-01-11T00:00:00+01:00","is_recu":0,"cbm":"1.38","manifest_id":null,"client_id":22},{"id":1136,"nature":"Colis Expressway","reference":"REF-1064","poids":41,"date":"2024-02-23T00:00:00+01:00","is_recu":0,"cbm":"0.93","manifest_id":null,"client_id":22},{"id":1137,"nature":"Pack Speedlane","reference":"REF-1065","poids":20,"date":"2024-06-19T00:00:00+02:00","is_recu":1,"cbm":"0.17","manifest_id":241,"client_id":22},{"id":1138,"nature":"Paquet Quickcharge","reference":"REF-1066","poids":21,"date":"2024-06-10T00:00:00+02:00","is_recu":1,"cbm":"0.20","manifest_id":241,"client_id":22},{"id":1139,"nature":"Envoi Expressway","reference":"REF-1067","poids":21,"date":"2024-06-10T00:00:00+02:00","is_recu":1,"cbm":"0.24","manifest_id":241,"client_id":22},{"id":1140,"nature":"Cargo Rush+","reference":"REF-1068","poids":21,"date":"2024-05-29T00:00:00+02:00","is_recu":0,"cbm":"0.07","manifest_id":null,"client_id":22},{"id":1141,"nature":"Boite Speedtrack","reference":"REF-0988","poids":18,"date":"2024-05-06T00:00:00+02:00","is_recu":1,"cbm":"0.13","manifest_id":241,"client_id":144},{"id":1142,"nature":"Colis Fastlane","reference":"REF-0989","poids":11,"date":"2024-06-07T00:00:00+02:00","is_recu":1,"cbm":"1.62","manifest_id":241,"client_id":144},{"id":1143,"nature":"Pack Expresscharge","reference":"REF-0990","poids":13,"date":"2024-06-08T00:00:00+02:00","is_recu":1,"cbm":"1.00","manifest_id":241,"client_id":144},{"id":1144,"nature":"Parcelle Rushhour","reference":"REF-0991","poids":5,"date":"2024-06-10T00:00:00+02:00","is_recu":1,"cbm":"0.88","manifest_id":241,"client_id":144}]);

  const [client_id, setClient_id] = useState(["SM-1006","SM-1004","SM-1003","SM-1450","SM-1007","SM-1009","SM-1023","SM-1008","SM-1001","SM-1002","SM-1005"])

  const [manifest_id, setManifest_id] = useState(["MAN-0002","MAN-0004","MAN-0006","MAN-0007","MAN-0008","MAN-0009","MAN-0010","MAN-0011","MAN-0012","MAN-0013","MAN-0014","MAN-0015"])

  const [coliscopie, setColiscopie] = useState([{"id":585,"nature":"Colis eclair","reference":"REF-1001","poids":14,"date":"2024-06-10T00:00:00+02:00","is_recu":1,"cbm":"0.32","manifest_id":34,"client_id":22},{"id":586,"nature":"Pack Vitesse","reference":"REF-1002","poids":22,"date":"2024-06-19T00:00:00+02:00","is_recu":1,"cbm":"0.83","manifest_id":34,"client_id":22},{"id":587,"nature":"Box Rapide","reference":"REF-1003","poids":14,"date":"2024-05-04T00:00:00+02:00","is_recu":1,"cbm":"0.80","manifest_id":34,"client_id":22},{"id":588,"nature":"Parcelle Express","reference":"REF-1004","poids":25,"date":"2024-05-10T00:00:00+02:00","is_recu":1,"cbm":"2.10","manifest_id":32,"client_id":22},{"id":589,"nature":"Envoi Turbo","reference":"REF-1005","poids":14,"date":"2024-06-26T00:00:00+02:00","is_recu":1,"cbm":"2.38","manifest_id":32,"client_id":22},{"id":590,"nature":"Cargo Sprint","reference":"REF-1006","poids":20,"date":"2024-06-10T00:00:00+02:00","is_recu":1,"cbm":"0.90","manifest_id":32,"client_id":26},{"id":591,"nature":"Paquet Blitz","reference":"REF-1007","poids":20,"date":"2024-05-14T00:00:00+02:00","is_recu":1,"cbm":"1.00","manifest_id":32,"client_id":26},{"id":592,"nature":"Livraison Flash","reference":"REF-1008","poids":9,"date":"2024-05-03T00:00:00+02:00","is_recu":1,"cbm":"0.19","manifest_id":174,"client_id":26},{"id":593,"nature":"Colis Prompt","reference":"REF-1009","poids":26,"date":"2024-06-24T00:00:00+02:00","is_recu":1,"cbm":"2.48","manifest_id":34,"client_id":25},{"id":594,"nature":"Boite Speedy","reference":"REF-1010","poids":15,"date":"2024-06-24T00:00:00+02:00","is_recu":1,"cbm":"1.75","manifest_id":34,"client_id":27},{"id":595,"nature":"Paquet Dynamique *","reference":"REF-1011","poids":15,"date":"2024-06-24T00:00:00+02:00","is_recu":1,"cbm":"0.64","manifest_id":32,"client_id":27},{"id":1084,"nature":"Envoi Rapido","reference":"REF-1012","poids":15,"date":"2024-02-14T00:00:00+01:00","is_recu":1,"cbm":"0.36","manifest_id":228,"client_id":22},{"id":1085,"nature":"Box Fulgurant","reference":"REF-1013","poids":77,"date":"2024-03-21T00:00:00+01:00","is_recu":1,"cbm":"0.51","manifest_id":228,"client_id":22},{"id":1086,"nature":"Paquet eclaire","reference":"REF-1014","poids":20,"date":"2024-01-10T00:00:00+01:00","is_recu":1,"cbm":"0.08","manifest_id":228,"client_id":22},{"id":1087,"nature":"Colis Turbo Boost","reference":"REF-1015","poids":21,"date":"2023-01-06T00:00:00+01:00","is_recu":1,"cbm":"1.09","manifest_id":240,"client_id":22},{"id":1088,"nature":"Pack Quicktime","reference":"REF-1016","poids":5,"date":"2024-02-14T00:00:00+01:00","is_recu":1,"cbm":"0.51","manifest_id":240,"client_id":138},{"id":1089,"nature":"Livraison Instantanee","reference":"REF-1017","poids":7,"date":"2024-02-22T00:00:00+01:00","is_recu":1,"cbm":"0.05","manifest_id":null,"client_id":139},{"id":1090,"nature":"Boite eclaireur","reference":"REF-1018","poids":50,"date":"2024-01-10T00:00:00+01:00","is_recu":1,"cbm":"0.82","manifest_id":null,"client_id":140},{"id":1091,"nature":"Colis Hyperdrive","reference":"REF-1019","poids":12,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"1.20","manifest_id":null,"client_id":141},{"id":1092,"nature":"Parcelle Rapide","reference":"REF-1020","poids":13,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"1.37","manifest_id":null,"client_id":22},{"id":1093,"nature":"Box Agile","reference":"REF-1021","poids":42,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.17","manifest_id":null,"client_id":22},{"id":1094,"nature":"Colis Velocity","reference":"REF-1022","poids":12,"date":"2024-02-29T00:00:00+01:00","is_recu":0,"cbm":"0.81","manifest_id":null,"client_id":22},{"id":1095,"nature":"Livraison Ultrarapide","reference":"REF-1023","poids":200,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.10","manifest_id":null,"client_id":22},{"id":1096,"nature":"Paquet Expresso","reference":"REF-1024","poids":21,"date":"2023-01-05T00:00:00+01:00","is_recu":0,"cbm":"0.69","manifest_id":null,"client_id":22},{"id":1097,"nature":"Envoi eclairci","reference":"REF-1025","poids":7,"date":"2024-01-10T00:00:00+01:00","is_recu":1,"cbm":"0.34","manifest_id":236,"client_id":22},{"id":1098,"nature":"Cargo Flash","reference":"REF-1026","poids":12,"date":"2024-02-14T00:00:00+01:00","is_recu":1,"cbm":"0.16","manifest_id":237,"client_id":22},{"id":1099,"nature":"Boite de Course","reference":"REF-1027","poids":4,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.80","manifest_id":null,"client_id":22},{"id":1100,"nature":"Colis Supercharge","reference":"REF-1028","poids":15,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"1.04","manifest_id":null,"client_id":22},{"id":1101,"nature":"Pack Rapido","reference":"REF-1029","poids":12,"date":"2024-01-14T00:00:00+01:00","is_recu":1,"cbm":"0.35","manifest_id":240,"client_id":22},{"id":1102,"nature":"Parcelle Hate","reference":"REF-1030","poids":15,"date":"2024-02-08T00:00:00+01:00","is_recu":1,"cbm":"0.33","manifest_id":240,"client_id":22},{"id":1103,"nature":"Box Accelerate","reference":"REF-1031","poids":24,"date":"2024-02-14T00:00:00+01:00","is_recu":0,"cbm":"0.12","manifest_id":null,"client_id":22},{"id":1104,"nature":"Livraison Quickstart","reference":"REF-1032","poids":12,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.18","manifest_id":null,"client_id":22},{"id":1105,"nature":"Paquet Momentum","reference":"REF-1033","poids":60,"date":"2024-02-26T00:00:00+01:00","is_recu":0,"cbm":"0.23","manifest_id":null,"client_id":22},{"id":1106,"nature":"Envoi Turbocharged","reference":"REF-1034","poids":20,"date":"2024-01-22T00:00:00+01:00","is_recu":0,"cbm":"0.69","manifest_id":null,"client_id":22},{"id":1107,"nature":"Colis Warp","reference":"REF-1035","poids":50,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.27","manifest_id":null,"client_id":22},{"id":1108,"nature":"Boite de Vitesse","reference":"REF-1036","poids":20,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.61","manifest_id":null,"client_id":22},{"id":1109,"nature":"Pack Turbo","reference":"REF-1037","poids":8,"date":"2024-02-10T00:00:00+01:00","is_recu":0,"cbm":"0.27","manifest_id":null,"client_id":22},{"id":1110,"nature":"Cargo Flashback","reference":"REF-1038","poids":12,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.15","manifest_id":null,"client_id":22},{"id":1111,"nature":"Parcelle Sprinter","reference":"REF-1039","poids":12,"date":"2024-01-13T00:00:00+01:00","is_recu":0,"cbm":"0.18","manifest_id":null,"client_id":22},{"id":1112,"nature":"Livraison Blitz","reference":"REF-1040","poids":16,"date":"2024-02-14T00:00:00+01:00","is_recu":0,"cbm":"0.88","manifest_id":null,"client_id":22},{"id":1113,"nature":"Box Prompt","reference":"REF-1041","poids":6,"date":"2024-02-26T00:00:00+01:00","is_recu":0,"cbm":"0.05","manifest_id":null,"client_id":22},{"id":1114,"nature":"Colis Rapidfire","reference":"REF-1042","poids":20,"date":"2024-02-20T00:00:00+01:00","is_recu":0,"cbm":"0.40","manifest_id":null,"client_id":22},{"id":1115,"nature":"Pack Momentum","reference":"REF-1043","poids":10,"date":"2024-02-14T00:00:00+01:00","is_recu":0,"cbm":"0.61","manifest_id":null,"client_id":22},{"id":1116,"nature":"Paquet Boost","reference":"REF-1044","poids":66,"date":"2024-02-14T00:00:00+01:00","is_recu":0,"cbm":"0.13","manifest_id":null,"client_id":22},{"id":1117,"nature":"Envoi Hyper","reference":"REF-1045","poids":66,"date":"2024-02-20T00:00:00+01:00","is_recu":0,"cbm":"0.22","manifest_id":null,"client_id":22},{"id":1118,"nature":"Cargo Flashforward","reference":"REF-1046","poids":25,"date":"2024-03-28T00:00:00+01:00","is_recu":0,"cbm":"0.07","manifest_id":null,"client_id":22},{"id":1119,"nature":"Boite Quicktime","reference":"REF-1047","poids":80,"date":"2024-02-20T00:00:00+01:00","is_recu":0,"cbm":"0.09","manifest_id":null,"client_id":22},{"id":1120,"nature":"Colis Velocity+","reference":"REF-1048","poids":6,"date":"2024-02-14T00:00:00+01:00","is_recu":0,"cbm":"1.44","manifest_id":null,"client_id":22},{"id":1121,"nature":"Pack Ultrarapide","reference":"REF-1049","poids":9,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.06","manifest_id":null,"client_id":22},{"id":1122,"nature":"Parcelle Expressway","reference":"REF-1050","poids":21,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.20","manifest_id":null,"client_id":22},{"id":1123,"nature":"Livraison Velocity","reference":"REF-1051","poids":21,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.60","manifest_id":null,"client_id":22},{"id":1124,"nature":"Box Quickfire","reference":"REF-1052","poids":21,"date":"2024-01-11T00:00:00+01:00","is_recu":0,"cbm":"0.44","manifest_id":null,"client_id":22},{"id":1125,"nature":"Colis Flashpoint","reference":"REF-1053","poids":33,"date":"2024-01-13T00:00:00+01:00","is_recu":0,"cbm":"0.37","manifest_id":null,"client_id":22},{"id":1126,"nature":"Pack Sprint","reference":"REF-1054","poids":14,"date":"2024-02-14T00:00:00+01:00","is_recu":0,"cbm":"0.10","manifest_id":null,"client_id":22},{"id":1127,"nature":"Paquet Accelerator","reference":"REF-1055","poids":41,"date":"2024-01-10T00:00:00+01:00","is_recu":0,"cbm":"0.70","manifest_id":null,"client_id":22},{"id":1128,"nature":"Envoi Fasttrack","reference":"REF-1056","poids":16,"date":"2024-01-24T00:00:00+01:00","is_recu":0,"cbm":"2.25","manifest_id":null,"client_id":22},{"id":1129,"nature":"Cargo Swift","reference":"REF-1057","poids":15,"date":"2024-01-24T00:00:00+01:00","is_recu":0,"cbm":"0.12","manifest_id":null,"client_id":22},{"id":1130,"nature":"Boite Expresslane","reference":"REF-1058","poids":15,"date":"2024-01-24T00:00:00+01:00","is_recu":0,"cbm":"1.21","manifest_id":null,"client_id":22},{"id":1131,"nature":"Colis Turbocharge","reference":"REF-1059","poids":15,"date":"2024-02-20T00:00:00+01:00","is_recu":0,"cbm":"1.93","manifest_id":null,"client_id":22},{"id":1132,"nature":"Pack Flash","reference":"REF-1060","poids":12,"date":"2024-01-14T00:00:00+01:00","is_recu":0,"cbm":"0.08","manifest_id":null,"client_id":22},{"id":1133,"nature":"Parcelle Rush","reference":"REF-1061","poids":8,"date":"2024-02-14T00:00:00+01:00","is_recu":0,"cbm":"0.02","manifest_id":null,"client_id":22},{"id":1134,"nature":"Livraison Rapidfire+","reference":"REF-1062","poids":10,"date":"2024-02-10T00:00:00+01:00","is_recu":0,"cbm":"0.80","manifest_id":null,"client_id":22},{"id":1135,"nature":"Box Swifttrack","reference":"REF-1063","poids":12,"date":"2024-01-11T00:00:00+01:00","is_recu":0,"cbm":"1.38","manifest_id":null,"client_id":22},{"id":1136,"nature":"Colis Expressway","reference":"REF-1064","poids":41,"date":"2024-02-23T00:00:00+01:00","is_recu":0,"cbm":"0.93","manifest_id":null,"client_id":22},{"id":1137,"nature":"Pack Speedlane","reference":"REF-1065","poids":20,"date":"2024-06-19T00:00:00+02:00","is_recu":1,"cbm":"0.17","manifest_id":241,"client_id":22},{"id":1138,"nature":"Paquet Quickcharge","reference":"REF-1066","poids":21,"date":"2024-06-10T00:00:00+02:00","is_recu":1,"cbm":"0.20","manifest_id":241,"client_id":22},{"id":1139,"nature":"Envoi Expressway","reference":"REF-1067","poids":21,"date":"2024-06-10T00:00:00+02:00","is_recu":1,"cbm":"0.24","manifest_id":241,"client_id":22},{"id":1140,"nature":"Cargo Rush+","reference":"REF-1068","poids":21,"date":"2024-05-29T00:00:00+02:00","is_recu":0,"cbm":"0.07","manifest_id":null,"client_id":22},{"id":1141,"nature":"Boite Speedtrack","reference":"REF-0988","poids":18,"date":"2024-05-06T00:00:00+02:00","is_recu":1,"cbm":"0.13","manifest_id":241,"client_id":144},{"id":1142,"nature":"Colis Fastlane","reference":"REF-0989","poids":11,"date":"2024-06-07T00:00:00+02:00","is_recu":1,"cbm":"1.62","manifest_id":241,"client_id":144},{"id":1143,"nature":"Pack Expresscharge","reference":"REF-0990","poids":13,"date":"2024-06-08T00:00:00+02:00","is_recu":1,"cbm":"1.00","manifest_id":241,"client_id":144},{"id":1144,"nature":"Parcelle Rushhour","reference":"REF-0991","poids":5,"date":"2024-06-10T00:00:00+02:00","is_recu":1,"cbm":"0.88","manifest_id":241,"client_id":144}])

  const [delimiterFound, setDelimiterFound] = useState(false);

  const [validRow, setValidRow] = useState(false);

  const [matchFoundClient, setMatchFoundClient] = useState(false);

  const [matchFoundManifest, setMatchFoundManifest] = useState(false);

  const [manifest_vide, setManifest_vide] = useState(false);

  const [reference_vide, setReference_vide] = useState(false);

  const [cbm_vide, setCbm_vide] = useState(false);

  const [client_vide, setClient_vide] = useState(false)

  const [openDialogue, setOpenD] = useState(false)

  const [manifest_error, setManifest_error] = useState('')

  const [client_error, setClient_error] = useState('')

  const [fileName, setFileName] = useState('')

  const [csvColis, setCSVColis] = useState([]);

  // useEffect(() => {
  //   fetchColis()
  //   fetchManifest()
  //   fetchClientID()
  //   fetchManifestID()
  // }, [etat])

  useEffect(() => {
    setNumero(nc);
    setMan_id(mid)
  }, [nc, mid]);

  useEffect(() => {
    changeTabValue(tabValue)
  }, [tabValue])


  useEffect(() => {
    if (openDialogue) {
      importCSV();
    }
  }, [openDialogue]);

  const onNumero = (value) => {
    setNumero(value)
  }

  const onManId = (value) => {
    setMan_id(value)
  }

  const onTabValue = (value) => {
    setTabValue(value)
  }

  const fetchColis = () => {
    axios.get('/api/colis')
      .then(function (response) {
        setColis(response.data)
        setColiscopie(response.data)
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error)
      })
  };

  const fetchManifest = () => {
    axios.get('/api/manifest_nonvalide')
      .then(function (response) {
        setManifest(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  };

  const fetchClientID = () => {
    axios.get(`/api/client_id`)
      .then(function (response) {
        setClient_id(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  const fetchManifestID = () => {
    axios.get(`/api/manifest_id`)
      .then(function (response) {
        setManifest_id(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  const addColisInManifest = () => {
    axios.put('/api/client_manifest', {
      'data': selected,
      'manifest_id': man_id
    })
      .then(function (response) {
        setTabValue('all')
        fetchColis()
        //handleChange(tabValue)
        setSelected([])
        setAlertType('success');
        setAlertMessage('colis ajouté avec succès');
        setAlertOpen(true);
      })
      .catch(function (error) {
        setAlertType('error');
        setAlertMessage(error);
        setAlertOpen(true);
      })
  }


  const updateColis = () => {
    axios.put('/api/valider_colis', {
      'data': selected
    })
      .then(function (response) {
        fetchColis()
        setTabValue('all')
        setSelected([])
        setAlertType('success');
        setAlertMessage('colis validé avec succès');
        setAlertOpen(true);
      })
      .catch(function (error) {
        setAlertType('error');
        setAlertMessage(error);
        setAlertOpen(true);
      })
  }

  const deleteColis = (id) => {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ?',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/deleteColis/${id}`)
          .then(function (response) {
            if (response.data == 1) {
              setAlertType('error');
              setAlertMessage('colis deja reçu');
              setAlertOpen(true);
            }
            if (response.data == 2) {
              setAlertType('error');
              setAlertMessage('colis deja manifesté');
              setAlertOpen(true);
            }
            if (response.data == 3) {
              setAlertType('success');
              setAlertMessage('colis supprimer');
              setAlertOpen(true);
            }
            // else{
            //   alert(response.data)
            // }
            //Swal.fire({ icon: 'success', title: 'unité CBM supprimé!', showConfirmButton: false, timer: 700 })
            fetchColis()
          })
          .catch(function (error) {
            alert(error)
          });
      }
    })
  }

  const onSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = colis.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const onClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const onChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const onFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const onFilterByNature = (event) => {
    setPage(0);
    setFilterNature(event.target.value);
  };

  const onSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const dataFiltered = filterColis({
    inputData: colis,
    comparator: getComparator(order, orderBy),
    filterName, filterNature
  });

  console.log(filterNature)

  const recu = coliscopie.filter(item => item.is_recu === 1 && item.manifest_id === null).length,
    non_recu = coliscopie.filter(item => item.is_recu === 0 && item.manifest_id === null).length,
    manifesté = coliscopie.filter(item => item.manifest_id !== null).length,
    all = coliscopie.length

  const notFoundName = !dataFiltered.length && !!filterName;

  //const notFoundNature = !dataFiltered.length && !!filterNature;

  const aucunRes = !dataFiltered.length && !filterName && !filterNature;

  const changeTabValue = (newValue) => {
    let newColis = [];

    if (newValue === 'all') {
      newColis = [...coliscopie];
    } else if (newValue === 'recu') {
      newColis = coliscopie.filter(item => item.is_recu === 1 && item.manifest_id === null);

    } else if (newValue === 'non_recu') {
      newColis = coliscopie.filter(item => item.is_recu === 0 && item.manifest_id === null);
    }
    else if (newValue === 'manifesté') {
      newColis = coliscopie.filter(item => item.manifest_id !== null);
    }

    setTabValue(newValue);
    setColis(newColis);
    setPage(0)
  };

  const onFileChange = event => {
    const file = event.target.files[0];

    if (file) {
      const fileName = file.name;
      setFileName(fileName);
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;
        const { delimiterFound, validRow } = checkDelimiterAndValidRow(fileContent);
        setDelimiterFound(delimiterFound);
        setValidRow(validRow);

        if (delimiterFound) {
          Papa.parse(file, {
            header: true,
            delimiter: ';',
            skipEmptyLines: true,
            complete: (result) => {
              const { matchFoundClient,matchFoundManifest,manifest_error,client_error,manifest_vide,client_vide,reference_vide,cbm_vide, csvColis } = checkMatch(result.data);
              setMatchFoundClient(matchFoundClient);
              setMatchFoundManifest(matchFoundManifest)
              setManifest_error(manifest_error)
              setClient_error(client_error)
              setManifest_vide(manifest_vide)
              setClient_vide(client_vide)
              setReference_vide(reference_vide)
              setCbm_vide(cbm_vide)
              setCSVColis(csvColis);
              setOpenD(true);
            },
            error: (error) => {
              console.error('Erreur lors de l\'analyse du fichier CSV:', error);
              setCSVColis([]);
            }
          });
        }
        else {
          setCSVColis([]);
          setOpenD(true);
        }
      };

      reader.readAsText(file);
    } else {
      console.log('Aucun fichier sélectionné');
    }
  };

  const checkDelimiterAndValidRow = (content) => {
    let delimiterFound = false;
    let validRow = false;
    const lines = content.split('\n');
    const firstLine = lines[0];

    if (firstLine.includes(';')) {
      delimiterFound = true;
      const cr = firstLine.split(';');
      if (cr.length === 10) {
        validRow = true;
      }
    }
    return { delimiterFound, validRow };
  };


  const checkMatch = (data) => {

    let matchFoundClient = true;

    let client_vide = false

    let matchFoundManifest = true;

    let manifest_vide = false

    let manifest_error = ""

    let client_error = ""

    let reference_vide = false

    let cbm_vide = false

    for (let i = 0; i < data.length; i++) {

      let reference = data[i]['reference']

      let cbm = data[i]['cbm']

      let ref_client = data[i]['ref_client']

      if (reference == '' && reference == null) {
        reference_vide = true;
      }

      if (cbm == '' && cbm == null) {
        cbm_vide = true;
      }

      if (ref_client !== '' && ref_client !== null) {
        if (!client_id.includes(ref_client)) {
          matchFoundClient = false
          client_error += ` ${ref_client}`;
        }
      }
      else {
        client_vide = true
      }
    }

    for (let i = 0; i < data.length; i++) {
      let numero_manifeste = data[i]['numero_manifeste']

      if (numero_manifeste !== '' && numero_manifeste !== null) {

        if (!manifest_id.includes(numero_manifeste)) {
          matchFoundManifest = false
          manifest_error += ` ${numero_manifeste}`;
        }
      }
      else {
        manifest_vide = true
      }
    }


    return { matchFoundClient, matchFoundManifest, manifest_error, client_error, manifest_vide, client_vide, reference_vide, cbm_vide, csvColis: data };
  };


  const importCSV = () => {

    let isOk = false

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

    if (client_vide) {
      message += '<div style="margin-bottom:10px;"><i class="swal2-error-line"></i> Client vide.</div>';
    }

    if (matchFoundClient) {
      message += '<div style="margin-bottom:10px;"><i class="swal2-success-line"></i> Client identifié.</div>';
    } else {
      message += `<div style="margin-bottom:10px;"><i class="swal2-error-line"></i> Client introuvable: ${client_error} </div>`;
    }

    if (matchFoundManifest) {
      message += '<div style="margin-bottom:10px;"><i class="swal2-success-line"></i> Manifeste identifié.</div>';
    }
    else {
      message += `<div style="margin-bottom:10px;"><i class="swal2-error-line"></i>Manifeste non identifié: ${manifest_error} </div>`;
    }

    if (reference_vide) {
      message += '<div style="margin-bottom:10px;"><i class="swal2-error-line"></i> Reference vide.</div>';
    }
    else {
      message += `<div style="margin-bottom:10px;"><i class="swal2-success-line"></i>Reference </div>`;
    }

    if (cbm_vide) {
      message += '<div style="margin-bottom:10px;"><i class="swal2-warning-line"></i> CBM vide</div>';
    }
    else {
      message += `<div style="margin-bottom:10px;"><i class="swal2-success-line"></i>CBM </div>`;
    }

    if (manifest_vide) {
      message += '<div style="margin-bottom:10px;"><i class="swal2-warning-line"></i> Manifeste vide.</div>';
    }

    if (matchFoundManifest && matchFoundClient && !reference_vide) {
      isOk = true
    }
    else {
      isOk = false
    }

    message += '</div>';
    Swal.fire({
      title: `Verification du fichier ${fileName} ?`,
      showCancelButton: true,
      showConfirmButton: isOk,
      confirmButtonColor: '#4BB543',
      confirmButtonText: 'Ajouter',
      cancelButtonText: 'Annuler',
      backdrop: true,
      html: message
    }).then((result) => {
      if (result.isConfirmed) {

        axios.post('/api/import_colis', {
          'csv_colis': csvColis
        })
          .then(function (response) {
            if (response.data == 1) {
              setAlertType('success');
              setAlertMessage('import successfully');
              setAlertOpen(true);
              fetchColis()
              setTabValue('all')
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
        setCSVColis([])
      }
    })
  }

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(dataFiltered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Mon excel');

    XLSX.writeFile(wb, 'exported_data.xlsx');
  };

  return (

    <Container>
      {alertOpen && <AlertMessage open={alertOpen} message={alertMessage} type={alertType} onClose={() => setAlertOpen(false)} />}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Suivi de colis</Typography>

        <Button onClick={redirectFormulaire} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          nouveau colis
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
        <ColisTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={onFilterByName}
          filterNature={filterNature}
          onFilterNature={onFilterByNature}
          tabValue={tabValue}
          onTabValue={onTabValue}
          loading={loading}
          recu={recu}
          non_recu={non_recu}
          manifesté={manifesté}
          all={all}
        />
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <ColisTableHead
              order={order}
              orderBy={orderBy}
              rowCount={colis.length}
              numSelected={selected.length}
              onRequestSort={onSort}
              onSelectAllClick={onSelectAllClick}
              headLabel={[
                { id: 'reference', label: 'Reference' },
                { id: 'nature', label: 'Nature' },
                { id: 'cbm', label: 'CBM' },
                { id: 'poids', label: 'Poids' },
                { id: 'date', label: 'Date de creation' },
                { id: 'is_recu', label: 'Etat', align: 'center' },
                { id: '' },
              ]}
              tabValue={tabValue}
              manifest={manifest}
              onManId={onManId}
              onAddColis={addColisInManifest}
              updateColis={updateColis}
              onNumero={onNumero}
              numero={numero}


            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <ColisTableRow
                    tabValue={tabValue}
                    key={row.id}
                    colis_id={row.id}
                    reference={row.reference}
                    nature={row.nature}
                    cbm={row.cbm}
                    poids={row.poids}
                    date={row.date}
                    manifest_id={row.manifest_id}
                    is_recu={row.is_recu}
                    onDeleteColis={deleteColis}
                    selected={selected.indexOf(row.id) !== -1}
                    handleClick={(event) => onClick(event, row.id)}
                  />
                ))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, colis.length)}
              />

              {/* {notFoundName  && <TableNoData query={filterName} query1={filterNature}/>} */}
              {notFoundName && <TableNoData query={filterName} />}
              {aucunRes && <TableNoRes colSpan={8} />}
            </TableBody>
          </Table>
        </TableContainer>
        {/* </Scrollbar> */}

        <TablePagination
          page={page}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
