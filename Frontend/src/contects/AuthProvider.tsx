import React, { createContext, useState, ReactNode, useEffect } from 'react';
import app from '../../firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface AuthContextType {
    createUser: (email: string, password: string) => Promise<UserCredential>;
    loginUser: (email: string, password: string) => Promise<UserCredential>; // Add loginUser function
    user: User | null; // Specify user type
    loginWithGoogle: () => Promise<UserCredential>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
    
        return () => {
            unsubscribe();
        };
    }, []);

    const createUser = (email: string, password: string) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email: string, password: string) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
  
    const authInfo: AuthContextType = {
      user,
      createUser,
      loginUser, // Include loginUser function
      loginWithGoogle
    };
  
    return (
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    );
};
