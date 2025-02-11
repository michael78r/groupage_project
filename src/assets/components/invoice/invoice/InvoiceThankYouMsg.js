import React, {Fragment} from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({

    titleContainer: {
        flexDirection: 'row',
        marginTop: 12
    },
    titleContainer1: {
        flexDirection: 'row',
        marginTop: 15
    },
    reportTitle: {
        fontSize: 8,
        textAlign: 'center',
    }
});


const InvoiceThankYouMsg = () => (
    <Fragment>
        <View style={styles.titleContainer}>
            <Text style={styles.reportTitle}>N.B :  Toute réclamation doit être faite au moment de l'enlèvement ou livraison des colis, autrement nous déclinons toute responsabilité en cas d'avarie et/ou perte.</Text>
        </View>
        <View style={styles.titleContainer1}>
            <Text style={styles.reportTitle}>N.B :  Any complaint must be made at the time of the removal or the delivery of the parcel, otherwise we disclaim all liability in case of damage and/or loss.</Text>
        </View>
    </Fragment>
);

export default InvoiceThankYouMsg