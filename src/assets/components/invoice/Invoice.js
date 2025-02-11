import React from 'react';
import { Page, Document, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './invoice/InvoiceTitle';
import InvoiceNo from './invoice/InvoiceNo';
import BillTo from './invoice/BillTo';
import InvoiceItemsTable from './invoice/InvoiceItemsTable';
import InvoiceThankYouMsg from './invoice/InvoiceThankYouMsg';



const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });
  
  const Invoice = ({invoice}) => (
    
            <Document>
                <Page size="A4" style={styles.page}>
                    <InvoiceTitle title={invoice.reference_facture.charAt(0)=='F' ? 'Facture' : "Avoir"}/>
                    <InvoiceNo invoice={invoice}/>
                     <BillTo Invoice={invoice}/>
                   <InvoiceItemsTable invoice={invoice}/>
                    <InvoiceThankYouMsg/>
                </Page>
            </Document>
        );
  
  export default Invoice