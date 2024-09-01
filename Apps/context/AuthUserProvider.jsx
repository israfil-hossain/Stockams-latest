import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";

const AuthUserContext = createContext();

const AuthUserProvider = ({ children }) => {
  const {
    data:{data:userData = {}} = {},
    isLoading: userLoading = true,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["/api/Authentication/GetLoggedInUser"],
  });

  const userContextValues = {
    // states
    userData,
    userLoading,
    userFound: Boolean(!userLoading && !!userData?.email),
    // methods
    userRefetch,
    userRole:userData?.role,
  };

  

  return (
    <AuthUserContext.Provider value={userContextValues}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUserContext = () => useContext(AuthUserContext);

export default AuthUserProvider;
