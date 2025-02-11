// Utilitaire de formatage de montant
export const formatterMontant = (montant) => {
    const montantNumerique = typeof montant === 'string' ? parseFloat(montant) : montant;
        if (montant !== undefined) {
          const montantFormate = montantNumerique.toLocaleString('fr-FR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          return montantFormate;
        }
        
    };
    