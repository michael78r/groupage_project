import React from 'react';
import* as XLSX from 'xlsx';

function ExcelExport() {
  const exportToExcel = () => {
    const data = [
      ['Classement des clients'],
      ['Année', 2023],
      ['Mois', 'Juin'],
      ['Code client', 'NOM', 'Contact', 'Volume', 'Chiffre d\'affaires'],
      ['123', 'Client A', 'John Doe', 'john.doe@example.com', 100, 1000],
      ['124', 'Client B', 'Jane Smith', 'jane.smith@example.com', 150, 1500],
    ];

    // Créer un nouveau classeur
    const workbook = XLSX.utils.book_new();

    // Créer une feuille de calcul
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Mise en forme des cellules
    const cellStyle = {
      font: { bold: true },
      alignment: { horizontal: 'center' }
    };

    XLSX.utils.sheet_add_aoa(worksheet, [
      ['', '', '', '', ''], // Ajouter une ligne vide
      ['', '', '', '', ''], // Ajouter une ligne vide
    ], { origin: -1 });

    // Appliquer le style aux cellules
    Object.keys(worksheet).forEach(key => {
      if (key !== '!ref' && key !== '!margins' && key !== '!merges') {
        worksheet[key].s = cellStyle;
      }
    })

    // Ajouter la feuille de calcul au classeur
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Classement des clients');

    // Enregistrer le fichier
    XLSX.writeFile(workbook, 'classement_clients.xlsx');
  };

  return (
    <div>
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
}

export default ExcelExport;
