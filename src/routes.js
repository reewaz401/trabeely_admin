
import Index from "views/Index.js";
import Profile from "views/auth/Profile.js";
import Register from "views/auth/Register.js";
import Login from "views/auth/Login.js";
import PackageTab from "views/package/PackageTab";
import PackageDetails from "views/package/PackageDetails";
import RestaurantTab from "views/restaurant/RestaurantTab";
import HotelTab from "views/hotel/HotelTab";
import ClubTab from "views/club/ClubTab";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/app",
  },
  {
    path: "/package",
    name: "Package",
    icon: "fas fa-route text-blue",
    component: PackageTab,
    layout: "/app",
  },
  {
    path: "/hotel",
    name: "Hotels",
    icon: "fa fa-bed text-orange",
    component: HotelTab,
    layout: "/app",
  },
  {
    path: "/restaurant",
    name: "Restaurant",
    icon: "fas fa-utensils text-yellow",
    component: RestaurantTab,
    layout: "/app",
  },
  {
    path: "/club",
    name: "Club",
    icon: "fas fa-glass-cheers text-orange",
    component: ClubTab,
    layout: "/app"
  },
  {
    path: "/gallery",
    name: "Gallery",
    icon: "fas fa-images text-blue",
    component: Register,
    layout: "/app"
  },
];


export default routes;
