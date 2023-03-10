import { createContext, useContext, ReactNode } from "react";

interface AuthContextValue {
    /* define the properties and methods that you want to expose in the context */
    user: any
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
    value: AuthContextValue;
}

export function AuthProvider({ children, value }: AuthProviderProps) {
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthValue(): AuthContextValue {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthValue must be used within an AuthProvider");
    }
    return context;
}