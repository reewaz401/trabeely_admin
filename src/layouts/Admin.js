
import React,{useContext} from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import {AuthContext} from '../contexts/UserAuthentication'

import routes from "routes.js";
import ProtectedRoute from "ProtectedRoute";
import PackageDetails from "views/package/PackageDetails";
import HotelDetails from "views/hotel/HotelDetails";
import RestaurantDetails from "views/restaurant/RestaurantDetails";
import ClubDetails from "views/club/ClubDetails";

const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const {authUser} = useContext(AuthContext)

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/app") {
        return (
          <ProtectedRoute
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: `${process.env.PUBLIC_URL}/res/img/logo7.png`,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          <ProtectedRoute path="/app/package-view" component={PackageDetails} />
          <ProtectedRoute path="/app/hotel-view" component={HotelDetails} />
          <ProtectedRoute path="/app/restaurant-view" component={RestaurantDetails} />
          <ProtectedRoute path="/app/club-view" component={ClubDetails} />
          {getRoutes(routes)}
          <Redirect from="*" to="" />
        </Switch>
        {/* <Container fluid>
          <AdminFooter />
        </Container> */}
      </div>
    </>
  );
};

export default Admin;
