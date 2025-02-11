import React, { useState, Suspense } from "react";
import { Navigate, BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import { jwtDecode } from "jwt-decode";
import './index.css'

import ThemeProvider from "./assets/theme";
import Layout from "./assets/layouts";
import LayoutUser from "./assets/layouts_user";
import ManifestPage from "./assets/pages/manifest";
import ColisPage from "./assets/pages/colis";
import DetailsManifestPage from "./assets/pages/detailsmanifeste";
import DetailsFacturePage from "./assets/pages/detailsfacture";
import LoginView from "./assets/sections/login/login-view";
import DashboardPage from "./assets/pages/dashboard";
import useToken from './assets/useToken';
import ManifestAjout from "./assets/sections/manifest/view/man-ajout";
import PrivateRoutes from "./assets/routes/PrivateRoutes";
import GenererColis from "./assets/sections/proforma/view/generer_colis";
import { MyContext } from "./assets/components/context/mycontext";
import Page404 from "./assets/sections/error/not-found-view";
import GenererPDF from "./assets/pages/facture-pdf";
import SuiviColisPage from "./assets/pages/suivi_colis";
import BasicTable from "./assets/pages/test"
// import './assets/global.css';
import Page401 from "./assets/sections/error/401-error";
import { ColisAdd } from "./assets/sections/colis/view/colis-ajout";
import RegisterView from "./assets/sections/login/register";
import ClientPage from "./assets/pages/client";
import ExcelExport from "./assets/pages/test";
import Parametre from "./assets/pages/parametre";



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
                            <Route path="*" element={<Navigate to="/404" replace />} />

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

