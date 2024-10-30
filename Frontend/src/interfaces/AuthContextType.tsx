import { User, UserCredential } from "firebase/auth";

export interface AuthContextType {
    createUser: (email: string, password: string) => Promise<UserCredential>;
    loginUser: (email: string, password: string) => Promise<UserCredential>;
    loginWithGoogle: () => Promise<UserCredential>;
    logOut: () => Promise<void>;
    user: User | null;
    role: string | null;
    loading: boolean;
}
