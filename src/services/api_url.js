const BASE_URI = process.env.REACT_APP_BASE_URI;
module.exports = {
    LOGIN_API: BASE_URI + "/auth/sign-in",
    REGISTER_API: BASE_URI + "/auth/sign-up",
    LOGOUT_API: BASE_URI + "/auth/logout",
    roleUpdateAPI: BASE_URI + "/user/update-role/",  //{id}
    tokenAPI: BASE_URI + "/check-token",
    //Package
    PACKAGE_API: BASE_URI + "/packages/add-package",
    PACKAGE_DELETE_API: BASE_URI + "/packages/delete/",//{id}
    ITINERARY_API: BASE_URI + "/packages/add-itinerary",
    AGENT_PACKAGE_API: BASE_URI + "/packages/agent-package", 
    PACKAGE_ALL_API: BASE_URI + "/packages",
    //Hotels
    HOTEL_ADD_API:BASE_URI+"/hotels/add-hotel",
    HOTEL_ROOM_ADD_API:BASE_URI+"/hotels/add-room",
    AGENT_HOTEL_API:BASE_URI+"/hotels/agent-hotel",
    HOTEL_DELETE_API:BASE_URI+"/delete/",//{id}
    HOTEL_ALL_API: BASE_URI + "/hotels",
    //Restaurant
    RESTAURANT_ADD_API:BASE_URI+"/restaurants/add-restaurant",
    FOOD_ADD_API:BASE_URI+"/foods/add-food",
    AGENT_RESTAURANT_API:BASE_URI+"/restaurants/agent-restaurant",
    RESTAURANT_DELETE_API:BASE_URI+"/delete/",//{id}
    RESTAURANT_ALL_API: BASE_URI + "/restaurants",
    //Club
    CLUB_ADD_API:BASE_URI+"/club/add-club",
    AGENT_CLUB_API:BASE_URI+"/club/agent-club",
    CLUB_DELETE_API:BASE_URI+"/delete/",//{id}
    CLUB_ALL_API: BASE_URI + "/club",

    //GALLERY
    GALLERY_ADD_API:BASE_URI+"/gallery/add-gallery",
    AGENT_GALLERY_API:BASE_URI+"/gallery/agent-gallery",
    GALLERY_DELETE_API:BASE_URI+"/delete/",//{id}
    GALLERY_ALL_API: BASE_URI + "/gallery",

}