import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 30
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
  });

  const BillTo = ({invoice}) => (
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Facturer à:</Text>
        <Text>Alexandre Simons</Text>
        <Text>+261346548788</Text>
        <Text>alexandre.simons@gmail.com</Text>
    </View>
  );
  
  export default BillTo