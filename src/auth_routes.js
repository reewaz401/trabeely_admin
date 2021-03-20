import Login from "views/auth/Login.js";
import Denied from "views/auth/Denied.js";

var routes = [
    {
      path: "/login",
      name: "Login",
      icon: "fas fa-sign-in-alt text-yellow",
      component: Login,
      layout: "/auth",
    },
    {
      path: "/fail",
      name: "Fail",
      component: Denied,
      layout: "/auth",
    }    
  ];

  export default routes;