import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';
import numeral from 'numeral';


const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    reference: {
        width: '20%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    nature: {
        width: '30%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    cbm: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    poids: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    total: {
        width: '25%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const InvoiceTableRow = ({facture}) => {
    const formattedUP = numeral(facture.unit_price).format('0,0.00');
    const formattedTotal = numeral(facture.total).format('0,0.00');
    return(
        <View style={styles.row}>
            <Text style={styles.reference}>{facture.nombre_package}</Text>
            <Text style={styles.nature}>colis</Text>
            <Text style={styles.cbm}>{facture.cbm}</Text>
            <Text style={styles.poids}>{formattedUP}</Text>
            <Text style={styles.total}>{formattedTotal < 0 ? (-(formattedTotal)) : formattedTotal} USD</Text>
        </View>
    );
}
    // const rows = colis_manifest.map( cm => 

    // )
   // return (<Fragment>{rows}</Fragment> )

  
export default InvoiceTableRow