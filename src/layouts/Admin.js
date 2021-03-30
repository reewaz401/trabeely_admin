
import React, { useContext, useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { AuthContext } from '../contexts/UserAuthentication'

import routes from "../routes/routes";
import adminRoutes from "../routes/routes_admin";
import travelRoutes from "../routes/routes_travel";
import restaurantRoutes from "../routes/routes_restaurant";
import clubRoutes from "../routes/routes_club";
import hotelRoutes from "../routes/routes_hotel";
import ProtectedRoute from "ProtectedRoute";
// import PackageDetails from "views/package/PackageDetails";
// import HotelDetails from "views/hotel/HotelDetails";
// import RestaurantDetails from "views/restaurant/RestaurantDetails";
// import ClubDetails from "views/club/ClubDetails";
import Profile from "views/setting/Profile";
import { PermissionContext } from "contexts/PermissionContext";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const {granted} = useContext(PermissionContext)
  // React.useEffect(() => {
  //   PermissionHandler().then(result => setGranted(result.data.type)).catch(err => console.log(err))
  // }, [])
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes, grant) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/app") {
        return (
          <ProtectedRoute
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />)
      } else {
        return null;
      }
    });
  };
  // const getTextHeaderName = (routess) => {
  //   for (let i = 0; i < routess.length; i++) {
  //       return routess[i].name;
  //   }
  // };
  const getTextHeaderName = (routess) => {
    for (let i = 0; i < routess.length; i++) {
            return routess[i].name;
        }
    // for (let i = 0; i < routess.length; i++) {
    //   if (
    //     props.location.pathname.indexOf(routess[i].layout + routess[i].path) !==
    //     -1
    //   ) {
    //     return routess[i].name;
    //   }
    // }
    // return "Brand";
  };

  const getBrandText = (path) => {
    if (granted === "admin") {
     return getTextHeaderName(adminRoutes);
    } else if (granted === "travel") {
     return getTextHeaderName(travelRoutes);
    } else if (granted === "hotel") {
     return getTextHeaderName(hotelRoutes);
    } else if (granted === "club") {
    return  getTextHeaderName(clubRoutes);
    } else if (granted === "restaurant") {
    return  getTextHeaderName(restaurantRoutes);
    }
  };

  return (
    <>
      {granted === "admin" ? <Sidebar
        {...props}
        routes={adminRoutes}
        logo={{
          innerLink: "/app/index",
          imgSrc: `${process.env.PUBLIC_URL}/res/img/logo7.png`,
          imgAlt: "...",
        }}
      /> : ""}
      {granted === "travel" ? <Sidebar
        {...props}
        routes={travelRoutes}
        logo={{
          innerLink: "/app/index",
          imgSrc: `${process.env.PUBLIC_URL}/res/img/logo7.png`,
          imgAlt: "...",
        }}
      /> : ""}
      {granted === "restaurant" ? <Sidebar
        {...props}
        routes={restaurantRoutes}
        logo={{
          innerLink: "/app/index",
          imgSrc: `${process.env.PUBLIC_URL}/res/img/logo7.png`,
          imgAlt: "...",
        }}
      /> : ""}
      {granted === "club" ? <Sidebar
        {...props}
        routes={clubRoutes}
        logo={{
          innerLink: "/app/index",
          imgSrc: `${process.env.PUBLIC_URL}/res/img/logo7.png`,
          imgAlt: "...",
        }}
      /> : ""}
      {granted === "hotel" ? <Sidebar
        {...props}
        routes={hotelRoutes}
        logo={{
          innerLink: "/app/index",
          imgSrc: `${process.env.PUBLIC_URL}/res/img/logo7.png`,
          imgAlt: "...",
        }}
      /> : ""}
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {/* <ProtectedRoute path="/app/package-view" component={PackageDetails} />
          <ProtectedRoute path="/app/hotel-view" component={HotelDetails} />
          <ProtectedRoute path="/app/restaurant-view" component={RestaurantDetails} />
          <ProtectedRoute path="/app/club-view" component={ClubDetails} />
        <ProtectedRoute path="/app/profile/" component={Profile} /> */}
          <ProtectedRoute path="/app/profile/" component={Profile} />
          {granted === "admin" && getRoutes(adminRoutes, granted)}
          {granted === "travel" && getRoutes(travelRoutes, granted)}
          {granted === "hotel" && getRoutes(hotelRoutes, granted)}
          {granted === "restaurant" && getRoutes(restaurantRoutes, granted)}
          {granted === "club" && getRoutes(clubRoutes, granted)}
          {granted === undefined && <Redirect from="*" to="/" />}

        </Switch>
        {/* <Container fluid>
          <AdminFooter />
        </Container> */}
      </div>
    </>
  );
};

export default Admin;

