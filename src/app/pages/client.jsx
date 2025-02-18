import React from "react";
import ClientView from "../sections/client/view/client-view";
import { Helmet } from 'react-helmet-async';

export default function ClientPage() {
  return (
  <>
    <Helmet>
      <title> Admin | Client </title>
    </Helmet>

    <ClientView />
  </>)

}