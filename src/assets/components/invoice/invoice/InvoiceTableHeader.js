import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
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

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.reference}>Total package</Text>
        <Text style={styles.nature}>Description</Text>
        <Text style={styles.cbm}>CBM</Text>
        <Text style={styles.poids}>Unité CBM</Text>
        <Text style={styles.total}>Total</Text>
    </View>
  );
  
  export default InvoiceTableHeader