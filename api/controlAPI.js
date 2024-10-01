const SpaceAccessApi = {
    SpaceAccessCreate: "/api/SpaceAccessMethod/Create", //post
    GetAllSpaceAccess: "/api/SpaceAccessMethod/GetAll", // get
    GetSingleAccessOption: "/api/SpaceAccessMethod/GetById/", //get
    UpdateAccessOption: "/api/SpaceAccessMethod/UpdateById/", //update-patch
    DeleteAccessOption: "/api/SpaceAccessMethod/DeleteById", //delete
  };
  
  const TermsAPI = {
    TermsAndConditionCreate: "/api/TermsAndCondition/Create", //post
    GetAllTerms: "/api/TermsAndCondition/GetAll", // get
    DeleteTermsAndCondition: "/api/TermsAndCondition/DeleteById", // delete
    UpdateTermsAndConditon: "/api/TermsAndCondition/UpdateById/", // update
  };
  
  const SpaceTypeAPI = {
    CreateSpaceType: "/api/SpaceType/Create",
    GetAllSpaceType: "/api/SpaceType/GetAll",
    GetByIdSpaceType: "/api/SpaceType/GetById/",
    UpdateSpaceType: "/api/SpaceType/UpdateById/",
    DeleteSpaceType: "/api/SpaceType/DeleteById",
    GetAllSpaceTypeDropdown: "/api/SpaceType/GetAllForDropdown",
  };
  
  const SpaceScheduleAPI = {
    SpaceScheduleCreate: "/api/SpaceSchedule/Create", //post
    GetSpaceSchedule: "/api/SpaceSchedule/GetAll", //get
    DeleteSpaceSchedule: "/api/SpaceSchedule/DeleteById", //delete
    DropdownSchedule : "/api/SpaceSchedule/GetAllForDropdown"
  };
  
  const SpaceSecurityAPI = {
    SpaceSecurityCreate: "/api/SpaceSecurity/Create", //post
    GetSpaceSecurity: "/api/SpaceSecurity/GetAll", //get
    DeleteSpaceSecurity: "/api/SpaceSecurity/DeleteById", //delete
  };
  
  const StorageAPI = {
    StorageCreate : "/api/StorageCondition/Create", 
    GetStorageAll : "/api/StorageCondition/GetAll", 
    DeleteStorage : "/api/StorageCondition/DeleteById", 
    DropdownStorage : "/api/StorageCondition/GetAllForDropdown", 
  }
  
  const UnloadAPI = {
    UnloadCreate : "/api/UnloadingAndMoving/Create", 
    GetUnloadAll : "/api/UnloadingAndMoving/GetAll", 
    DeleteUnload : "/api/UnloadingAndMoving/DeleteById", 
    DropdownUnload : "/api/UnloadingAndMoving/GetAllForDropdown", 
  }
  
  export {
    SpaceAccessApi,
    TermsAPI,
    SpaceTypeAPI,
    SpaceScheduleAPI,
    SpaceSecurityAPI,
    StorageAPI,
    UnloadAPI
  };
  