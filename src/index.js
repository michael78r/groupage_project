import React, { useState, Suspense } from "react";
import { Navigate, BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import { jwtDecode } from "jwt-decode";
import './index.css'

import ThemeProvider from "./app/theme";
import Layout from "./app/layouts";
import ManifestPage from "./app/pages/manifest";
import ColisPage from "./app/pages/colis";
import DetailsManifestPage from "./app/pages/detailsmanifeste";
import DetailsFacturePage from "./app/pages/detailsfacture";
import LoginView from "./app/sections/login/login-view";
import DashboardPage from "./app/pages/dashboard";
import useToken from './app/useToken';
import ManifestAjout from "./app/sections/manifest/view/man-ajout";
import PrivateRoutes from "./app/routes/PrivateRoutes";
import GenererColis from "./app/sections/proforma/view/generer_colis";
import { MyContext } from "./app/components/context/mycontext";
import Page404 from "./app/sections/error/not-found-view";
import GenererPDF from "./app/pages/facture-pdf";
import SuiviColisPage from "./app/pages/suivi_colis";
import BasicTable from "./app/pages/test"
// import './app/global.css';
import Page401 from "./app/sections/error/401-error";
import { ColisAdd } from "./app/sections/colis/view/colis-ajout";
import RegisterView from "./app/sections/login/register";
import ClientPage from "./app/pages/client";
import ExcelExport from "./app/pages/test";
import Parametre from "./app/pages/parametre";



function Main() {
    //const { token, setToken } = useToken();

    //console.log(token)

    // if (!token) {
    //     return (
    //         <ThemeProvider>
    //             <Router>
    //                 <Routes>
    //                     <Route path="login" element={<LoginView setToken={setToken}/>} />
    //                     <Route path="register" element={<RegisterView/>} />
    //                     <Route path="*" element={<Navigate to="/login?errors=true" replace />} />
    //                 </Routes>
    //             </Router>
    //         </ThemeProvider>
    //     );
    // }
    // else {
    // const decoded = jwtDecode(token);
    // const roles = decoded.roles;
    // const username1 = decoded.username;
    return (
        // <MyContext.Provider value={username1}>
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route>
                        {/* <Route element={<PrivateRoutes monRole={roles} roleAutorise={["ROLE_ADMINISTRATEUR"]} />}> */}
                        <Route
                            path="/"
                            element={
                                <Layout>
                                    <Suspense>
                                        <Outlet />
                                    </Suspense>
                                </Layout>
                            }
                        >
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                            <Route path="dashboard" element={<DashboardPage />} />
                            <Route path="manifeste" element={<ManifestPage />} />
                            <Route path="detailsmanifeste" element={<DetailsManifestPage />} />
                            <Route path="colis" element={<ColisPage />} />
                            <Route path="detailsfacture" element={<DetailsFacturePage />} />
                            <Route path="ajoutmanifest" element={<ManifestAjout />} />
                            <Route path="login" element={<Navigate to="/dashboard" replace />} />
                            <Route path="generer" element={<GenererColis />} />
                            {/* <Route path="addcolis" element={<ColisAdd />} /> */}
                            <Route path="test" element={<ExcelExport />} />
                            <Route path="parametre" element={<Parametre />} />
                            <Route path="client" element={<ClientPage />} />
                            <Route path="*" element={<Navigate to="/dashboard" replace />} />

                        </Route>
                        <Route path="generer_pdf" element={<GenererPDF />} />
                        <Route path="404" element={<Page404 />} />
                        <Route path="401" element={<Page401 />} />
                    </Route>
{/* 
                    <Route element={<PrivateRoutes monRole={roles} roleAutorise={["ROLE_UTILISATEUR"]} />}>
                        <Route
                            path="user"
                            element={
                                <LayoutUser>
                                    <Suspense>
                                        <Outlet />
                                    </Suspense>
                                </LayoutUser>
                            }
                        >
                            <Route path="suivi_colis" element={<SuiviColisPage />} />
                        </Route>
                    </Route> */}

                </Routes>
            </Router>
        </ThemeProvider>
        //</MyContext.Provider>
    );
}
//}

export default Main;

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <Suspense>
                <Main />
            </Suspense>
        </HelmetProvider>

    </React.StrictMode>
)

