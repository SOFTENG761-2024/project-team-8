import { createContext, ReactNode, useEffect, useState } from "react";

const AuthContext = createContext({
    currentUser: null,
});

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // TODO: Set the current user state
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
