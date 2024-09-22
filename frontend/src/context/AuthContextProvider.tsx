import { createContext, ReactNode, useEffect, useState } from "react";
import Parse from "../../parseconfig";

const APP_ID = import.meta.env.VITE_BACK4APP_APP_ID;

interface AuthContextType {
  currentUserData: Parse.User | null;
  setCurrentUserData: (user: Parse.User | null) => void;
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
  const [currentUserData, setCurrentUserData] = useState<Parse.User | null>(
    null
  );
  const [loadingData, setLoadingData] = useState<boolean>(true);

  // Load the user data when the component mounts
  useEffect(() => {
    const loadUser = async () => {
      const sessionToken = sessionStorage.getItem("sessionToken");

      if (sessionToken) {
        try {
          const currentUser = await Parse.User.become(sessionToken);
          setCurrentUserData(currentUser);
          localStorage.removeItem(`Parse/${APP_ID}/currentUser`);
        } catch (error) {
          console.error(
            "Failed to authenticate user with session token:",
            error
          );
        }
      }

      setLoadingData(false);
    };

    loadUser();
  }, []);

  // Clear the stored user data
  const clearStoredUserData = () => {
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
