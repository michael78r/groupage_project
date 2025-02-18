import PropTypes from 'prop-types';
import React from 'react';
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
import Grid from '@mui/material/Grid';

// ----------------------------------------------------------------------

export default function ManTableToolbar({
  filterName,
  onFilterName,
  datemin,
  onDatemin,
  datemax,
  onDatemax,
  tabValue,
  onTabValue,
  all,
  valide,
  non_valide,
  cloture,
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
        height: { xs: 'auto', sm: 130 },
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <Stack
        direction="column"
        alignItems="left"
        flexWrap="wrap-reverse"
        sx={{ mb: 0, width: '100%' }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 0 }}>
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={tabValue}
              onChange={changeTabs}
              textColor="primary"
              indicatorColor="primary"
              aria-label="primary tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                value="tous"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge sx={{ marginRight: 2 }} badgeContent={all === 0 ? '0' : all} color="primary" /> Tous
                  </Box>
                }
              />
              <Tab
                value="valide"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge sx={{ marginRight: 2 }} badgeContent={valide === 0 ? '0' : valide} color="success" /> Validé
                  </Box>
                }
              />
              <Tab
                value="non_valide"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge sx={{ marginRight: 2 }} badgeContent={non_valide === 0 ? '0' : non_valide} color="error" /> Non validé
                  </Box>
                }
              />
              <Tab
                value="cloture"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge sx={{ marginRight: 2 }} badgeContent={cloture === 0 ? '0' : cloture} color="info" /> Cloturé
                  </Box>
                }
              />
            </Tabs>
          </Box>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} flexShrink={0} sx={{ my: 1, width: '100%' }}>
          <OutlinedInput
            value={filterName}
            onChange={onFilterName}
            placeholder="rechercher numero..."
            sx={{ width: { xs: '100%', sm: 250 }, height: 60 }}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 30, height: 30 }} />
              </InputAdornment>
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ width: { xs: '100%', sm: 'auto' } }}>
              <DatePicker
                label="Date MIN"
                value={datemin}
                onChange={onDatemin}
                format="DD/MM/YYYY"
                variant="standard"
                slotProps={{
                  field: { clearable: true, onClear: () => onDatemin(Object) },
                }}
              />
              <DatePicker
                label="Date MAX"
                value={datemax}
                onChange={onDatemax}
                format="DD/MM/YYYY"
                variant="standard"
                slotProps={{
                  field: { clearable: true, onClear: () => onDatemax(Object) },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Stack>
      </Stack>
    </Toolbar>
  );
}

// ManTableToolbar.propTypes = {
//   filterName: PropTypes.string,
//   onFilterName: PropTypes.func,
//   datemin: PropTypes.object,
//   onDatemin: PropTypes.func,
//   datemax: PropTypes.object,
//   onDatemax: PropTypes.func,
//   tabValue: PropTypes.string,
//   onTabValue: PropTypes.func,
//   all: PropTypes.number,
//   valide: PropTypes.number,
//   non_valide: PropTypes.number,
//   cloture: PropTypes.number,
//   loading: PropTypes.bool,
// };