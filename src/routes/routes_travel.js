
import BookingDetails from "views/booking/BoookingDetails";
import Index from "views/Index.js";
import PackageDetails from "views/package/PackageDetails";
import PackageTab from "views/package/PackageTab";
var travelRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/app",
    },
  {
    path: "/package",
    name: "Package Add",
    icon: "fas fa-route text-blue",
    component: PackageTab,
    layout: "/app",
  },
  {
    path: "/package-view",
    name: "Package List",
    icon: "fas fa-route text-blue",
    component: PackageDetails,
    layout: "/app",
  },{
    path: "/booking",
    name: "Booking",
    icon: "fas fa-map-marker-alt text-blue",
    component: BookingDetails,
    layout: "/app"
  },
];

export default travelRoutes;
