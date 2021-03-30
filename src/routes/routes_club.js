
import Index from "views/Index.js";
import ClubTab from "views/club/ClubTab";
import ClubDetails from "views/club/ClubDetails";
import BookingDetails from "views/booking/BoookingDetails";
var clubRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/app",
  },
  {
    path: "/club",
    name: "Club Add",
    icon: "fas fa-glass-cheers text-orange",
    component: ClubTab,
    layout: "/app",
  },
  {
    path: "/club-view",
    name: "Club List",
    icon: "fas fa-glass-cheers text-orange",
    component: ClubDetails,
    layout: "/app",
  },
  {
    path: "/booking",
    name: "Booking",
    icon: "fas fa-map-marker-alt text-blue",
    component: BookingDetails,
    layout: "/app"
  },
];

export default clubRoutes;
