import dayjs from 'dayjs';

export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export function emptyRows(page, rowsPerPage, arrayLength) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function descendingComparator(a, b, orderBy) {
  if (a[orderBy] === null) {
    return 1;
  }
  if (b[orderBy] === null) {
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


// 12 13 = 1
  // 52 8 = -1
  // 9 9

  // 13 12 52 8 9 9

  // 12 13 8 52 9 9


  
//-------------------------------- FACTURE -----------------------------------------


export function filterFacture({ inputData, comparator, filterName }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) => user.reference_facture.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}

//-------------------------------- MANIFESTE -----------------------------------------
export function filterManifeste({ inputData, comparator, filterName, datemin, datemax }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) => user.numero.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }
  if (datemin && datemax!= null) {
    const dtmn = dayjs(datemin.$d).format('MM-DD-YYYY');
    const dtmx = dayjs(datemax.$d).format('MM-DD-YYYY');

    inputData = inputData.filter(i => {
      const date = dayjs(i.eta).format('MM-DD-YYYY');
      return dayjs(date).isAfter(dtmn) && dayjs(date).isBefore(dtmx);
    });
  }

  return inputData;
}


export function filterHistorique({ inputData, comparator }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  return inputData;
}


//-------------------------------- COLIS -----------------------------------------

export function filterColis({ inputData, comparator, filterName, filterNature }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName || filterNature) {
    inputData = inputData.filter(
      (colis) => colis.reference.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );

    inputData = inputData.filter(
      (colis) => colis.nature.toLowerCase().indexOf(filterNature.toLowerCase()) !== -1
    );
  }

  return inputData;
}


//-------------------------------- CLIENT-----------------------------------------

export function filterClient({ inputData, comparator, filterName }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) => user.nom.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}


export function getMois (mois) {
  switch (mois) {
    case 1:
      return "Janvier";
    case 2:
      return "Février";
    case 3:
      return "Mars";
    case 4:
      return "Avril";
    case 5:
      return "Mai";
    case 6:
      return "Juin";
    case 7:
      return "Juillet";
    case 8:
      return "Août";
    case 9:
      return "Septembre";
    case 10:
      return "Octobre";
    case 11:
      return "Novembre";
    case 12:
      return "Décembre";
    default:
      return "";
  }
};


