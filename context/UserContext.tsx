import React, { createContext, useReducer } from "react";
import {
  AuthContextProp,
  AuthStateProp,
  ISignInProps,
} from "../constant/types/interfaces";
import { userReducer } from "./userReducer";

const userInitialState: AuthStateProp = {
  token: null,
  user: null,
  errorMessage: "",
  status: "not-autenticated"
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
    if(typeof window !== "undefined"){
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  };

  const logOut = async () => {
    dispatch({ type: "logOut" });
    if(typeof window !== "undefined"){
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
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
