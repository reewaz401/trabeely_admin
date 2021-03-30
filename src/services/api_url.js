const BASE_URI = process.env.REACT_APP_BASE_URI;
module.exports = {
    LOGIN_API: BASE_URI + "/auth/sign-in",
    REGISTER_API: BASE_URI + "/auth/sign-up",
    LOGOUT_API: BASE_URI + "/auth/logout",
    roleUpdateAPI: BASE_URI + "/user/update-role/",  //{id}
    CHECK_PERMISSION: BASE_URI + "/auth/permission-handler",
    //Package
    PACKAGE_API: BASE_URI + "/packages/add-package",
    PACKAGE_DELETE_API: BASE_URI + "/packages/delete/",//{id}
    PACKAGE_UPDATE_API: BASE_URI + "/packages/update/",//{id}
    ITINERARY_API: BASE_URI + "/packages/add-itinerary",
    AGENT_PACKAGE_API: BASE_URI + "/packages/agent-package",
    PACKAGE_ALL_API: BASE_URI + "/packages",
    //Hotels
    HOTEL_ADD_API: BASE_URI + "/hotels/add-hotel",
    HOTEL_ROOM_ADD_API: BASE_URI + "/hotels/add-room",
    AGENT_HOTEL_API: BASE_URI + "/hotels/agent-hotel",
    HOTEL_DELETE_API: BASE_URI + "/hotels/delete/",//{id}
    HOTEL_ALL_API: BASE_URI + "/hotels",
    //Restaurant
    RESTAURANT_ADD_API: BASE_URI + "/restaurants/add-restaurant",
    FOOD_ADD_API: BASE_URI + "/foods/add-food",
    AGENT_RESTAURANT_API: BASE_URI + "/restaurants/agent-restaurant",
    RESTAURANT_DELETE_API: BASE_URI + "/restaurants/delete/",//{id}
    RESTAURANT_ALL_API: BASE_URI + "/restaurants",
    //Club
    CLUB_ADD_API: BASE_URI + "/club/add-club",
    AGENT_CLUB_API: BASE_URI + "/club/agent-club",
    CLUB_DELETE_API: BASE_URI + "/club/delete/",//{id}
    CLUB_ALL_API: BASE_URI + "/club",

    //GALLERY
    GALLERY_ADD_API: BASE_URI + "/gallery/add-gallery",
    AGENT_GALLERY_API: BASE_URI + "/gallery/agent-gallery",
    GALLERY_DELETE_API: BASE_URI + "/gallery/delete/",//{id}
    GALLERY_ALL_API: BASE_URI + "/gallery",

    //Admin Work
    //Business
    PRE_REGISTER_GET: BASE_URI + "/auth/business-detail",
    APPROVE_PRE_REGISTER: BASE_URI + "/auth/approve-business/", //{id}
    //Users
    GET_USER_PROFILE: BASE_URI + "/users/user-profile",
    USERS_GET: BASE_URI + "/users",
    USERS_ADD_API: BASE_URI + "/users/user-add",
    USER_DELETE_API: BASE_URI + "/users/delete/",//{id}
    USER_UPDATE_API: BASE_URI + "/users/update",
    USER_UPDATE_PASSWORD_API: BASE_URI + "/users/update-password",

    //Booking
    GET_BOOKING_BY_AGENT_API: BASE_URI + "/booking/agent-booking-detail",
    CONFIRM_BOOKING_FOR_AGENT_API: BASE_URI + "/booking/confirm-booking",

}