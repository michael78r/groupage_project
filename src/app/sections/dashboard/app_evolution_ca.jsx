import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { listClasses } from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Chart, { useChart } from '../../components/chart'
import Iconify from '../../components/iconify';
import { formatterMontant } from '../../components/formatterMontant';

// ----------------------------------------------------------------------
const ANNEES = [];
const anneeActuel = new Date().getFullYear()
for (let annee = 2012; annee <= anneeActuel; annee++) {
  ANNEES.push(annee);
}

export default function ChiffreDaffaire({
  title,
  subheader,
  chart,
  ...other
}) {
  const { labels, colors, series } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'date',
    },
    tooltip: {
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${formatterMontant(value)} MGA`;
          }
          return value;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CardHeader title={title} subheader={subheader} />
      </div>
      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

// ChiffreDaffaire.propTypes = {
//   chart: PropTypes.object,
//   subheader: PropTypes.string,
//   title: PropTypes.string,
// };
