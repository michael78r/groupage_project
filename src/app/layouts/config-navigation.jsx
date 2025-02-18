
import SvgColor from '../components/svg-color';
import React from 'react';
import ico1 from "../../assets/icons/ic_analytics.svg"
import ico2 from "../../assets/icons/ic_cart.svg"
import ico3 from "../../assets/icons/ic_user.svg"
import ico4 from "../../assets/icons/ic_blog.svg"
import ico5 from "../../assets/icons/ic_lock.svg"
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={name} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Tableau de bord',
    path: '/dashboard',
    icon: icon(ico1),
  },
  {
    title: 'gestion des manifestes',
    //path: '/manifeste',
    path: '/manifeste',
    ajout: '/ajoutmanifest',
    facture: '/detailsmanifeste',
    paiement: '/detailsfacture',
    //path: '/detailsfacture',
    icon: icon(ico2),
  },

  // {
  //   title: 'Facture & proforma',
  //   path: '/detailsmanifeste',
  //   icon: icon('ic_lock'),
  // },
  {
    title: 'Gestion des clients',
    path: '/client',
    icon: icon(ico3),
  },

  {
    title: 'Gestion des colis',
    path: '/colis',
    test: '/addcolis',
    icon: icon(ico4),
  },

  {
    title: 'paramètres',
    path: '/parametre',
    icon: icon(ico5),
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
