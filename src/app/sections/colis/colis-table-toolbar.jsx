import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Iconify from '../../components/iconify';
import { Badge, useMediaQuery, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';

export default function ColisTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  filterNature,
  onFilterNature,
  tabValue,
  onTabValue,
  loading,
  recu,
  non_recu,
  all,
  manifesté
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const changeOnTabValue = (event, newValue) => {
    if (!loading && numSelected === 0) {
      onTabValue(newValue);
    }
  };

  return (
    <Toolbar
      sx={{
        height: isMobile ? 160 : 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
      }}
    >
      <Stack
        direction={isMobile ? 'column' : 'row'}
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: isMobile ? 2 : 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={tabValue}
              onChange={changeOnTabValue}
              textColor="primary"
              indicatorColor="primary"
              aria-label="primary tabs example"
              variant={isMobile ? 'scrollable' : 'standard'}
              scrollButtons={isMobile ? 'auto' : 'off'}
            >
              <Tab value="all" label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge sx={{ marginRight: 2 }} badgeContent={all === 0 ? "0" : all} color="primary" /> Tous
                </Box>
              } />
              <Tab value="recu" label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge sx={{ marginRight: 2 }} badgeContent={recu === 0 ? "0" : recu} color="success" /> Recu
                </Box>
              } />
              <Tab value="non_recu" label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge sx={{ marginRight: 2 }} badgeContent={non_recu === 0 ? "0" : non_recu} color="error" /> Non recu
                </Box>
              } />
              <Tab value="manifesté" label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Badge sx={{ marginRight: 2 }} badgeContent={manifesté === 0 ? "0" : manifesté} color="warning" /> Manifesté
                </Box>
              } />
            </Tabs>
          </Box>
        </Stack>
      </Stack>

      <Stack
        direction={isMobile ? 'column' : 'row'}
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: isMobile ? 2 : 3 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <OutlinedInput
            value={filterName}
            onChange={onFilterName}
            placeholder="reference..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 30, height: 30 }}
                />
              </InputAdornment>
            }
            sx={{ mb: isMobile ? 2 : 0 }}
          />

          <OutlinedInput
            value={filterNature}
            onChange={onFilterNature}
            placeholder="nature..."
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

// ColisTableToolbar.propTypes = {
//   numSelected: PropTypes.number,
//   filterName: PropTypes.string,
//   onFilterName: PropTypes.func,
//   filterNature: PropTypes.string,
//   onFilterNature: PropTypes.func,
//   tabValue: PropTypes.string,
//   onTabValue: PropTypes.func,
//   loading: PropTypes.bool,
//   recu: PropTypes.number,
//   non_recu: PropTypes.number,
//   all: PropTypes.number,
//   manifesté: PropTypes.number,
// };