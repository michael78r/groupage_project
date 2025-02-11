import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Badge } from '@mui/material';
import Stack from '@mui/material/Stack';
// ----------------------------------------------------------------------

export default function HistoriqueTableToolbar({
  tabValue,
  onTabValue,
  all,
  avoir,
  paiement,
  deduit,
  transfert,
  loading

}) {

  const handleChange = (event, newValue) => {
    if (!loading) {
      onTabValue(newValue);
    }
  };
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
      }}
    >

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="primary tabs example"
            >
              <Tab value="tous" label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge sx={{ marginRight: 2 }} badgeContent={all === 0 ? "0" : all} color="primary" /> Tous
                </Box>
              } />
              <Tab value="paiement" label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge sx={{ marginRight: 2 }} badgeContent={paiement === 0 ? "0" : paiement} color="success" /> Paiement
                </Box>
              } />
              <Tab value="avoir" label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge sx={{ marginRight: 2 }} badgeContent={avoir === 0 ? "0" : avoir} color="error" /> Avoir
                </Box>
              } />
              <Tab value="deduit" label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge sx={{ marginRight: 2 }} badgeContent={deduit === 0 ? "0" : deduit} color="warning" /> Deduit
                </Box>
              } />
                            <Tab value="transfert" label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge sx={{ marginRight: 2 }} badgeContent={transfert === 0 ? "0" : transfert} color="warning" /> Transfert
                </Box>
              } />
            </Tabs>
          </Box>
        </Stack>
      </Stack>

    </Toolbar>
  );
}


HistoriqueTableToolbar.propTypes = {
  tabValue: PropTypes.string,
  onChangeTabvalue: PropTypes.func,

};
