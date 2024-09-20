import { createContext, ReactNode } from "react";
import UserData from "../interfaces/UserData";
import { useLocalStorage } from "@mantine/hooks";

interface AuthContextType {
  currentUserData: UserData | null;
  setCurrentUserData: (user: UserData | null) => void;
  clearStoredData: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  currentUserData: null,
  setCurrentUserData: () => {},
  clearStoredData: () => {},
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUserData, setCurrentUserData] =
    useLocalStorage<UserData | null>({
      key: "currentUserData",
      defaultValue: null,
    });

  const clearStoredData = () => {
    localStorage.clear();
    setCurrentUserData(null);
  };

  const context = {
    currentUserData,
    setCurrentUserData,
    clearStoredData,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
