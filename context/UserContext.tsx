import React, { createContext, useReducer } from "react";
import {
  AuthContextProp,
  AuthStateProp,
  ILoginData,
  ISignInProps,
} from "../constant/types/interfaces";
import { userReducer } from "./userReducer";

const userInitialState: AuthStateProp = {
  token: null,
  user: null,
};

export const AuthContext = createContext({} as AuthContextProp);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  
  const signIn = ({ token, user }: ISignInProps) => {
    dispatch({
      type: "signIn",
      payload: {
        token,
        user,
      },
    });
  };

  const logOut = async () => {
    dispatch({ type: "logOut" });
  };

  const removeError = () => {
    dispatch({ type: "removeError" });
  };

  const [state, dispatch] = useReducer(userReducer, userInitialState);
  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        logOut,
        removeError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
