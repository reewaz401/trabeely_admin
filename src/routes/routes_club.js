
import Index from "views/Index.js";
import ClubTab from "views/club/ClubTab";
import ClubDetails from "views/club/ClubDetails";
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
];

export default clubRoutes;
