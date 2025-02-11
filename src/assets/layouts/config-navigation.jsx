
import SvgColor from '../components/svg-color';
import React from 'react';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Tableau de bord',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'gestion des manifestes',
    //path: '/manifeste',
    path: '/manifeste',
    ajout: '/ajoutmanifest',
    facture: '/detailsmanifeste',
    paiement: '/detailsfacture',
    //path: '/detailsfacture',
    icon: icon('ic_cart'),
  },

  // {
  //   title: 'Facture & proforma',
  //   path: '/detailsmanifeste',
  //   icon: icon('ic_lock'),
  // },
  {
    title: 'Gestion des clients',
    path: '/client',
    icon: icon('ic_user'),
  },

  {
    title: 'Gestion des colis',
    path: '/colis',
    test: '/addcolis',
    icon: icon('ic_blog'),
  },

  {
    title: 'paramètres',
    path: '/parametre',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'paiement',
  //   path: '/detailsfacture',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
