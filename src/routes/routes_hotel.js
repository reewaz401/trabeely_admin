
import Index from "views/Index.js";
import HotelTab from "views/hotel/HotelTab";
import HotelDetails from "views/hotel/HotelDetails";
var hotelRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/app",
    access:"all"
    },
  {
    path: "/hotel",
    name: "Hotel Add",
    icon: "fa fa-bed text-orange",
    component: HotelTab,
    layout: "/app",
    access:"hotel"
  },
  {
    path: "/hotel-view",
    name: "Hotel List",
    icon: "fa fa-bed text-orange",
    component: HotelDetails,
    layout: "/app",
    access:"hotel"
  }
];

export default hotelRoutes;
