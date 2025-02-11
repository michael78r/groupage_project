import { Helmet } from 'react-helmet-async';

import React from 'react';
// import { AppView } from '../sections/acceuil/view';
import ManifestView from '../sections/manifest/view/man-view';

// ----------------------------------------------------------------------

export default function ManifestPage() {
  return (
    <>
      <Helmet>
        <title> Admin | Manifeste </title>
      </Helmet>

      <ManifestView />
    </>
  );
}
