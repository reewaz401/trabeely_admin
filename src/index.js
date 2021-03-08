import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "react-responsive-combo-box/dist/index.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "react-confirm-alert/src/react-confirm-alert.css";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import AuthContextProvider from './contexts/UserAuthentication'
import { ToastProvider } from 'react-toast-notifications'
import PackagesContextProvider from "contexts/AgentPackageContext";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import HotelContextProvider from "contexts/HotelContext";
import RestaurantContextProvider from "contexts/AgentRestaurantContext";
// import PreloaderContextProvider from './contexts/Preloader'
ReactDOM.render(
  <PackagesContextProvider>
    <HotelContextProvider>
      <RestaurantContextProvider>
        <AuthContextProvider>
          <ToastProvider placement='top-center' autoDismissTimeout='3000'>
            <BrowserRouter>
              <Switch>
                <Route path="/app" render={(props) => <AdminLayout {...props} />} />
                <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
                <Redirect from="/" to="/auth/login" />
              </Switch>
            </BrowserRouter>
          </ToastProvider>
        </AuthContextProvider>
      </RestaurantContextProvider>
    </HotelContextProvider>
  </PackagesContextProvider>
  ,
  document.getElementById("root")
);
