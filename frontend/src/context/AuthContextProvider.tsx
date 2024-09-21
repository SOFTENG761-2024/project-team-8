import { createContext, ReactNode, useEffect, useState } from "react";
import UserData from "../interfaces/UserData";
import { useLocalStorage } from "@mantine/hooks";

interface AuthContextType {
  currentUserData: UserData | null;
  setCurrentUserData: (user: UserData | null) => void;
  loadingData: boolean;
  clearStoredUserData: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  currentUserData: null,
  setCurrentUserData: () => {},
  loadingData: true,
  clearStoredUserData: () => {},
});

/**
 * This component provides the AuthContext to the rest of the application.
 *
 * @param children The children of the component, which will have access to the AuthContext.
 */
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUserData, setCurrentUserData] =
    useLocalStorage<UserData | null>({
      key: "currentUserData",
      defaultValue: null,
    });
  const [loadingData, setLoadingData] = useState<boolean>(true);

  // Load the user data from local storage when the component mounts
  useEffect(() => {
    const storedUserData = localStorage.getItem("currentUserData");
    if (storedUserData) {
      setCurrentUserData(JSON.parse(storedUserData));
      setLoadingData(false);
    }
  }, []);

  // Clear only the specific key instead of clearing all local storage
  const clearStoredUserData = () => {
    localStorage.removeItem("currentUserData");
    setCurrentUserData(null);
  };

  const context = {
    currentUserData,
    setCurrentUserData,
    loadingData,
    clearStoredUserData,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
