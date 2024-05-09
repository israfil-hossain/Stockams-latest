import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";

const AuthUserContext = createContext();

const AuthUserProvider = ({ children }) => {
  // const [userRole,setUserRole] = useState(""); 
  const {
    data:{data:userData = {}} = {},
    isLoading: userLoading = true,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["/api/Authentication/GetLoggedInUser"],
  });

  console.log({userData})
  

  // React.useEffect(() => {
  //   if (!userLoading && !!userData) {
  //     setUserRole(userData?.role);
  //   }
  // }, [userData]);
  

  const userContextValues = {
    // states
    userData,
    userLoading,
    userFound: Boolean(!userLoading && !!userData?.email),
    // methods
    userRefetch,
    userRole:userData?.role || "RENTER",
  };

  

  return (
    <AuthUserContext.Provider value={userContextValues}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUserContext = () => useContext(AuthUserContext);

export default AuthUserProvider;
