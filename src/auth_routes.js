import Register from "views/auth/Register.js";
import Login from "views/auth/Login.js";

var routes = [
    {
      path: "/login",
      name: "Login",
      icon: "fas fa-sign-in-alt text-yellow",
      component: Login,
      layout: "/auth",
    },
    {
      path: "/register",
      name: "Register",
      icon: "fas fa-user-shield text-blue",
      component: Register,
      layout: "/auth",
    },
  ];

  export default routes;