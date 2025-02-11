import React from "react";
import DashboardView from "../sections/dashboard/view/dashboard-view";
import { Helmet } from 'react-helmet-async';

export default function DashboardPage() {
  return (
  <>
    <Helmet>
      <title> Admin | Dashboard </title>
    </Helmet>

    <DashboardView />
  </>
  )

}