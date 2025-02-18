import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { styled, useTheme } from '@mui/material/styles';
import { fNumber } from '../../utils/format-number';
import Chart, { useChart } from '../../components/chart';
import MenuItem from '@mui/material/MenuItem';

import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { listClasses } from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Iconify from '../../components/iconify';


// ----------------------------------------------------------------------

const CHART_HEIGHT = 500;

const LEGEND_HEIGHT = 72;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    borderTop: `dashed 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

const SORT_OPTIONS = [
  { value: 1, label: 'Client' },
  { value: 2, label: 'Manifeste' },
];

// ----------------------------------------------------------------------

export default function Vente({
  title,
  subheader,
  chart,
  resultat,
  onChangeValue }) {

  const theme = useTheme();

  const [open, setOpen] = useState(null);

  const [rs, setRs] = useState(resultat);

  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  useEffect(() => {
    onChangeValue(rs)
  }, [rs])

  const onChange = (event, option) => {
    setRs(option);
    setOpen(null);
  };
  const onOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const onClose = () => {
    setOpen(null);
  };


  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors,
    labels: series.map((i) => i.label),
    stroke: {
      colors: [theme.palette.background.paper],
    },
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    ...options,
  });

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />
        <Button
          disableRipple
          color="inherit"
          onClick={onOpen}
          endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
        >
          <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
            {rs === 1 && "Client"}
            {rs === 2 && "Manifeste"}
          </Typography>
        </Button>

        <Menu
          open={!!open}
          anchorEl={open}
          onClose={onClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{
            paper: {
              sx: {
                [`& .${listClasses.root}`]: {
                  p: 0,
                },
              },
            },
          }}
        >
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} selected={option.value === rs} onClick={(event) => onChange(event, option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <StyledChart
        dir="ltr"
        type="pie"
        series={chartSeries}
        options={chartOptions}
        width="100%"
        height={380}
      />
    </Card>
  );
}

Vente.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
  resultat: PropTypes.number,
  onChangeValue: PropTypes.func
};
