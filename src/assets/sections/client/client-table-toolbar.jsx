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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

// ----------------------------------------------------------------------

export default function ClientTableToolbar({
  filterName,
  onFilterName,
  tabValue,
  onTabValue,
  all,
  actif,
  non_actif,
  loading,

}) {

  const changeTabs = (event, newValue) => {
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
              onChange={changeTabs}
              textColor="primary"
              indicatorColor="primary"
              aria-label="primary tabs example"
            >
              <Tab value="tous" label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge sx={{ marginRight: 2 }} badgeContent={all === 0 ? "0" : all} color="primary" /> Tous
                </Box>
              } />
              <Tab value="actif" label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge sx={{ marginRight: 2 }} badgeContent={actif === 0 ? "0" : actif} color="success" /> Actif
                </Box>
              } />
              <Tab value="non_actif" label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge sx={{ marginRight: 2 }} badgeContent={non_actif === 0 ? "0" : non_actif} color="error" /> Non actif
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

ClientTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  tabValue: PropTypes.string,
  onChangeTabvalue: PropTypes.func,
  all: PropTypes.number,
  actif: PropTypes.number,
  non_actif: PropTypes.number,

};
