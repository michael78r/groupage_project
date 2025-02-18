import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import numeral from 'numeral';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 11,
        fontStyle: 'bold',
    },
    description: {
        width: '75%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '25%',
        textAlign: 'right',
        paddingRight: 8,
    },
});


const InvoiceTableFooter = ({ items }) => {
    const formattedTaux = numeral(items.taux_vente).format('0,0.00');
    const formattedMGA = numeral(items.mga).format('0,0.00');
    const formattedPaye = numeral(items.paye).format('0,0.00');
    const formattedRAP = numeral(items.reste_a_payer).format('0,0.00');
    // const total = items.map(item => item.qty * item.rate)
    //     .reduce((accumulator, currentValue) => accumulator + currentValue , 0)
    return (
        <Fragment>
            <View style={styles.row}>
                <Text style={styles.description}>Taux</Text>
                <Text style={styles.total}>{formattedTaux} MGA</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>Total MGA</Text>
                <Text style={styles.total}>{items.mga < 0 ? (formattedMGA.slice(1)) : formattedMGA} MGA</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>Total payé</Text>
                <Text style={styles.total}>{items.paye < 0 ? (formattedPaye.slice(1)) : formattedPaye} MGA</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.description}>Reste à payer</Text>
                <Text style={styles.total}>{items.reste_a_payer < 0 ? (formattedRAP.slice(1)) : formattedRAP} MGA</Text>
            </View>
        </Fragment>
        // )
    )
};

export default InvoiceTableFooter