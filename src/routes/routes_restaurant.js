
import Index from "views/Index.js";
import RestaurantDetails from "views/restaurant/RestaurantDetails";
import RestaurantTab from "views/restaurant/RestaurantTab";
var restaurantRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/app"
      },
  {
    path: "/restaurant",
    name: "Restaurant Add",
    icon: "fas fa-utensils text-yellow",
    component: RestaurantTab,
    layout: "/app"
    },
  {
    path: "/restaurant-view",
    name: "Restaurant List",
    icon: "fas fa-utensils text-yellow",
    component: RestaurantDetails,
    layout: "/app"
    }
];

export default restaurantRoutes;
