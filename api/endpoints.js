const postFix = "/api";
export const API = {
  // Authentication

  SignUp: "/api/Authentication/Signup", //post
  Login: "/api/Authentication/SignIn", //post
  RefreshToken: "/api/Authentication/TokenRefresh", //post
  RevokeToken: "/api/Authentication/TokenRevoke", //post
  ChangePassword: "/api/Authentication/ChangePassword", //post
  GetLoginUser: "/api/Authentication/GetLoggedInUser", //get
  GetProfile: "/api/Authentication/UpdateProfilePicture", // patch

  // User......
  PostUser: "/api/User/Create", //post
  GetUser: "/api/User/GetAll", //get
  GetSingleUser: "/api/User/GetById/{DocId}", //get
  DeleteUser: "/api/User/DeleteById/{DocId}", // delete
  UpdateUser: "/api/ApplicationUser/UpdateOwnProfile",
  UpdateProfile: "/api/ApplicationUser/UpdateOwnProfilePicture",

  // Space Type
  CreateSpaceType: "/api/SpaceType/Create", // post
  GetSpaceType: "/api/SpaceType/GetAll", //get
  GetSingleSpaceType: "/api/SpaceType/GetById/{DocId}", //get
  UpdateSpaceType: "/api/SpaceType/UpdateById/{DocId}", //patch
  DeleteSpaceType: "/api/SpaceType/DeleteById/{DocId}", //delete
  GetAllDropdownSpaceType: "/api/SpaceType/GetAllForDropdown", // get all dropdown

  //SpaceAccess Option
  SpaceAccessCreate: "/api/SpaceAccessMethod/Create", //post
  GetAllSpaceAccess: "/api/SpaceAccessMethod/GetAll", // get
  GetSingleAccessOption: "/api/SpaceAccessMethod/GetById/{DocId}", //get
  UpdateAccessOption: "/api/SpaceAccessMethod/UpdateById/{DocId}", //update-patch
  DeleteAccessOption: "/api/SpaceAccessMethod/DeleteById/{DocId}", //delete
  GetAllDropdownAccess: "/api/SpaceAccessMethod/GetAllForDropdown", // get all dropdown

  // Storage  Condition Features
  StorageConditionCreate: "/api/StorageCondition/Create", //post
  GetStorageCondition: "/api/StorageCondition/GetAll", // get
  DeleteStorageCondition: "/api/StorageCondition/DeleteById", // d
  GetAllStorageConditionDropdown: "/api/StorageCondition/GetAllForDropdown",

  // Space Security Features
  SpaceSecurityCreate: "/api/SpaceSecurity/Create", //post
  GetSpaceSecurity: "/api/SpaceSecurity/GetAll", //get
  DeleteSpaceSecurity: "/api/SpaceSecurity/DeleteById/{DocId}", //delete
  GetAllSpaceSecurityDropdown: "/api/SpaceSecurity/GetAllForDropdown", //delete

  // Space Schedule Features
  SpaceScheduleCreate: "/api/SpaceSchedule/Create", //post
  GetSpaceSchedule: "/api/SpaceSchedule/GetAll", //get
  DeleteSpaceSchedule: "/api/SpaceSchedule/DeleteById/{DocId}", //delete
  GetAllScheduleDropdown: "/api/SpaceSchedule/GetAllForDropdown", //delete

  //Unloading and Moving Feature
  UnloadingCreate: "/api/UnloadingAndMoving/Create",
  GetUnloadingAll: "/api/UnloadingAndMoving/GetAll",
  DeleteUnloading: "api/UnloadingAndMoving/DeleteByID",
  GetAllUnloadingDropdown: "/api/UnloadingAndMoving/GetAllForDropdown",

  //Space - Reviews
  SpaceReviewCreate: "/api/SpaceReview/Create",
  GetSpaceReviewAll: "/api/SpaceReview/GetAll",
  DeleteSpaceReview: "api/SpaceReview/DeleteByID",
  GetSpaceReviewByID: "/api/SpaceReview/GetAllBySpaceId",

  // Space For Rent
  SpaceForRentCreate: "/api/SpaceForRent/Create", //post
  GetSpaceForRent: "/api/SpaceForRent/GetAll", //get
  GetSingleSpaceForRent: "/api/SpaceForRent/GetById", //get
  UpdateSpaceForRent: "/api/SpaceForRent/UpdateById/", //update
  DeleteSpaceForRent: "/api/SpaceForRent/DeleteById/", //delete
  AddSpaceImage: "/api/SpaceForRent/AddSpaceImageById/{DocId}", //post
  DeleteSpaceImage:
    "/api/SpaceForRent/DeleteSpaceImageById/{SpaceId}/{ImageId}", //delete

  // Booking
  SpaceBooking: "/api/SpaceBooking/Book", // Post for Booking Space.

  //Country API
  CountryList: "https://api.countrystatecity.in/v1/countries",

  // Supports
  GetAllTicket: "/api/Support/GetAllTickets",
  CreateTicket: "/api/Support/CreateTicket",
  GetSupportStatus: "/api/Support/GetSupportStatusForDropdown",
  UpdateTicketById: "/api/Support/UpdateTicketById/",
  GetAllMessage: "/api/Support/GetAllMessagesById/",
  AddMessage: "/api/Support/AddMessageById/",
};
