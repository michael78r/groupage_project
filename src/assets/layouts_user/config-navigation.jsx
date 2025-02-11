
import SvgColor from '../components/svg-color';
import React from 'react';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Suivi Colis',
    path: '/suivi_colis',
    icon: icon('ic_analytics'),
  }
];

export default navConfig;
