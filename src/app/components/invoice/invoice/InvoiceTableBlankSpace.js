import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        color: 'white'
    },
    reference: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    nature: {
        width: '30%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    cbm: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    poids: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    total: {
        width: '25%',   
    },
   
  });

const InvoiceTableBlankSpace = ({rowsCount}) => {
    const blankRows = Array(rowsCount).fill(0)
    const rows = blankRows.map( (x, i) => 
        <View style={styles.row} key={`BR${i}`}>
            <Text style={styles.reference}>-</Text>
            <Text style={styles.nature}>-</Text>
            <Text style={styles.cbm}>-</Text>
            <Text style={styles.poids}>-</Text>
            <Text style={styles.total}>-</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
export default InvoiceTableBlankSpace