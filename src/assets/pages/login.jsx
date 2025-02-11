import { Helmet } from 'react-helmet-async';
import React from 'react';

import { LoginView } from '../sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Groupage_easylink </title>
      </Helmet>

      <LoginView />
    </>
  );
}
