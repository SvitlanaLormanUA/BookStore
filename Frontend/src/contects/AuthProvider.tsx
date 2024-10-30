import React, { createContext, useState, ReactNode, useEffect } from 'react';
import app from '../../firebase/firebase.config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    UserCredential,
    onAuthStateChanged,
    User,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { getFirestore, doc, setDoc, addDoc, collection } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    createUser: (email: string, password: string) => Promise<UserCredential>;
    loginUser: (email: string, password: string) => Promise<UserCredential>;
    loginWithGoogle: () => Promise<UserCredential>;
    logOut: () => Promise<void>;
    loading: boolean;
    makePurchase: (items: string[], buyerInfo: { name: string, address: string }) => Promise<void>;  // Функція для покупки
}

export const AuthContext = createContext<AuthContextType | null>(null);

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const createUser = async (email: string, password: string) => {
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            email: email,
            role: 'user' // Установлюємо роль за замовчуванням
        });
        return userCredential;
    };

    const loginUser = (email: string, password: string) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const makePurchase = async (items: string[], buyerInfo: { name: string, address: string }) => {
        if (!user) {
            throw new Error('User is not logged in');
        }

        // Створюємо замовлення в Firestore, прив'язане до користувача
        const purchaseData = {
            userId: user.uid,  // Прив'язуємо покупку до поточного користувача
            items,
            buyerInfo,
            purchaseDate: new Date(),
        };

        await addDoc(collection(db, 'orders'), purchaseData);
    };

    const authInfo: AuthContextType = {
        user,
        createUser,
        loginUser,
        loginWithGoogle,
        logOut,
        loading,
        makePurchase,  // Додаємо функцію для покупки в контекст
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
