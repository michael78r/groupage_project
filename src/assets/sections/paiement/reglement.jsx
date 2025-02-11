import React from 'react';
import {
    Box,
    Card,
    CardHeader,
    Stack,
    Divider,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Checkbox,
    Skeleton
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LoadingButton from '@mui/lab/LoadingButton';
import Scrollbar from '../../components/scrollbar'
import { formatterMontant } from '../../components/formatterMontant';

export default function Reglement({
    mad,
    handleChecked,
    checked,
    onPaye,
    enDeduire,
    reste_payer,
    loading,
    loading_mad,
    newEtat
}) {

    const handleDeduire = () => {
        enDeduire()
    }

    const handlePaye = () => {
        onPaye()
    }

    const sum = mad.reduce((acc, value) => acc + parseFloat(value.reste_a_payer), 0);

    return (
        <Card>
            <CardHeader title="Gestion des crédits" subheader="Cette fonctionnalité permet de collecter et de gérer tous les montants excédentaires payés par un client. Les credits accumulés peuvent ensuite être appliqués pour régler d'autre factures" />
            <Scrollbar>

                <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                    <Stack direction="row" spacing={2}>
                        <Box sx={{ minWidth: 300, flexGrow: 1 }}>
                            {/* {newEtat == 0 &&
                                <>
                                    <div><Skeleton variant="text" width={200} height={30} /></div>
                                    <div><Skeleton variant="text" width={200} height={30} /></div>
                                    <br />
                                    <div><Skeleton variant="text" width={100} height={20} style={{ marginLeft: '12px' }} /></div>
                                    <div><Skeleton variant="text" width={100} height={20} style={{ marginLeft: '12px' }} /></div>
                                    <br />
                                    <div>  <Skeleton variant="text" width={90} height={35} /></div>
                                </>
                            } */}

                            {/* {newEtat == 1 && */}
                                <>
                                    {/* <div>
                                        <Typography variant="subtitle2" noWrap display="inline">
                                            Accompte :{' '}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap display="inline" >
                                            0 MGA
                                        </Typography>
                                    </div> */}
                                    <div>
                                        <Typography variant="subtitle2" noWrap display="inline">
                                            Montant total à deduire :{' '}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap display="inline" >
                                            {formatterMontant(Math.abs(sum))} MGA
                                        </Typography>
                                        {loading_mad ? <>
                                            <br />
                                            <div><Skeleton variant="text" width={330} height={38} style={{ marginLeft: '12px' }} /></div>
                                            <div><Skeleton variant="text" width={330} height={38} style={{ marginLeft: '12px' }} /></div>
                                            {/* <div><Skeleton variant="text" width={330} height={38} style={{ marginLeft: '12px' }} /></div> */}
                                        </> :
                                            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                {mad.map((value) => {
                                                    const labelId = `checkbox-list-secondary-label-${value.id}`;
                                                    return (
                                                        <ListItem
                                                            key={value.id}
                                                            secondaryAction={
                                                                <Checkbox
                                                                    disabled={reste_payer <= 0}
                                                                    edge="end"
                                                                    onChange={handleChecked(value.id, value.reference_facture, value.reste_a_payer)}
                                                                    checked={checked.findIndex(item => item.id === value.id) !== -1}
                                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                                />
                                                            }
                                                            disablePadding
                                                        >
                                                            <ListItemButton>
                                                                <ListItemText id={value.id}
                                                                    primary=
                                                                    {<span>
                                                                        <strong>{value.reference_facture} :</strong> <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap display="inline" >
                                                                        {formatterMontant(Math.abs(value.reste_a_payer))} MGA
                                                                    </Typography> &nbsp;
                                                                    </span>}
                                                                    // secondary={}

                                                                />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    );
                                                })}
                                            </List>}

                                        <LoadingButton
                                            size="small"
                                            disabled={mad.length === 0 || checked.length === 0}
                                            color="primary"
                                            onClick={handleDeduire}
                                            loading={loading}
                                            loadingPosition="start"
                                            startIcon={<RestartAltIcon />}
                                            variant="contained"
                                        >
                                            <span>Deduire</span>
                                        </LoadingButton>
                                    </div>
                                </>
                            {/* }
                            {newEtat == 2 &&
                                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap display="inline" >
                                    Aucun resultat
                                </Typography>
                            } */}


                        </Box>

                    </Stack>
                </Stack>

            </Scrollbar>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Box sx={{ p: 2, textAlign: 'right' }}>
            </Box>
        </Card>
    );

}