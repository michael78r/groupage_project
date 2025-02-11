import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end',
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    invoiceDate: {
            fontSize: 12,
            fontStyle: 'bold',
    },
    label: {
        width: 60
    }
    
  });


  const InvoiceNo = ({invoice}) => (
        <Fragment>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.label}>Facture No: </Text>
                <Text style={styles.invoiceDate}>{invoice.reference_facture}</Text>
            </View>
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.invoiceDate}>Date: {invoice.del}</Text>
                {/* <Text >{facture.trans_date}</Text> */}
            </View>
        </Fragment>
  );
  
  export default InvoiceNo