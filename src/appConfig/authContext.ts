import {createContext, useContext} from "react";
import {AuthContext, AuthContextProvider} from "./AuthContextProvider";

export interface AuthContextType {
  accessToken: string | undefined;
  setAccessToken: (token: string | undefined) => void;
}


export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};