
import Index from "views/Index.js";
import PackageTab from "views/package/PackageTab";
import RestaurantTab from "views/restaurant/RestaurantTab";
import HotelTab from "views/hotel/HotelTab";
import ClubTab from "views/club/ClubTab";
import PreRegisters from "views/pre-register/PreRegisters";
import UserDetails from "views/user/UserDetails";
import HotelDetails from "views/hotel/HotelDetails";
import PackageDetails from "views/package/PackageDetails";
import RestaurantDetails from "views/restaurant/RestaurantDetails";
import ClubDetails from "views/club/ClubDetails";
import BookingDetails from "views/booking/BoookingDetails";
var adminRoutes =[
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: "ni ni-tv-2 text-primary",
      component: Index,
      layout: "/app"
    },
    {
      path: "/package",
      name: "Add Package",
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
    },
    {
      path: "/hotel",
      name: "Add Hotel",
      icon: "fa fa-bed text-orange",
      component: HotelTab,
      layout: "/app",
    },
    {
      path: "/hotel-view",
      name: "Hotel List",
      icon: "fa fa-bed text-orange",
      component: HotelDetails,
      layout: "/app",
    },
    {
      path: "/restaurant",
      name: "Add Restaurant",
      icon: "fas fa-utensils text-yellow",
      component: RestaurantTab,
      layout: "/app",
    },
    {
      path: "/restaurant-view",
      name: "Restaurant List",
      icon: "fas fa-utensils text-yellow",
      component: RestaurantDetails,
      layout: "/app",
    },
    {
      path: "/club",
      name: "Add Club",
      icon: "fas fa-glass-cheers text-orange",
      component: ClubTab,
      layout: "/app"
    },
    {
      path: "/club-view",
      name: "Club List",
      icon: "fas fa-glass-cheers text-orange",
      component: ClubDetails,
      layout: "/app"
    },
    // {
    //   path: "/gallery",
    //   name: "Gallery",
    //   icon: "fas fa-images text-blue",
    //   // component: Register,
    //   layout: "/app"
    // },
    {
      path: "/booking",
      name: "Booking",
      icon: "fas fa-map-marker-alt text-blue",
      component: BookingDetails,
      layout: "/app"
    },
    // {
    //   path: "/review",
    //   name: "Review",
    //   icon: "fas fa-images text-blue",
    //   component: ReviewDetails,
    //   layout: "/app"
    // },
    {
      path: "/registration",
      name: "Pre-Registration",
      icon: "fas fa-check text-orange",
      component: PreRegisters,
      layout: "/app"
    },
    {
      path: "/users",
      name: "Users",
      icon: "fas fa-user text-orange",
      component: UserDetails,
      layout: "/app"
    },

 ]

export default adminRoutes;
