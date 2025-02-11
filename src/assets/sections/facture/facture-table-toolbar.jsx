import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Iconify from '../../components/iconify';
import { Badge } from '@mui/material';
import Stack from '@mui/material/Stack';
// ----------------------------------------------------------------------

export default function FactureTableToolbar({
  filterName,
  onFilterName,
  tabValue,
  onTabValue,
  n_all,
  n_payer,
  n_nonpayer,
  n_avoir,
  loading,

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
                  <Badge sx={{ marginRight: 2 }} badgeContent={n_all === 0 ? "0" : n_all} color="primary" /> Tous
                </Box>
              } />
              <Tab value="payer" label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge sx={{ marginRight: 2 }} badgeContent={n_payer === 0 ? "0" : n_payer} color="success" /> Payé
                </Box>
              } />
              <Tab value="non_payer" label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge sx={{ marginRight: 2 }} badgeContent={n_nonpayer === 0 ? "0" : n_nonpayer} color="error" /> Non payé
                </Box>
              } />
              <Tab value="trop_percu" label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge sx={{ marginRight: 2 }} badgeContent={n_avoir === 0 ? "0" : n_avoir} color="warning" /> Trop_percu
                </Box>
              } />
            </Tabs>
          </Box>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 3 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>

          <OutlinedInput
            value={filterName}
            onChange={onFilterName}
            placeholder="rechercher reference..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 30, height: 30 }}
                />
              </InputAdornment>
            }
          />
        </Stack>
      </Stack>



    </Toolbar>
  );
}


// FactureTableToolbar.propTypes = {
//   filterName: PropTypes.string,
//   onFilterName: PropTypes.func,
//   tabValue: PropTypes.string,
//   onChangeTabvalue: PropTypes.func,
//   n_all: PropTypes.number,
//   n_payer: PropTypes.number,
//   n_nonpayer: PropTypes.number,
//   n_avoir: PropTypes.number,

// };
