import React, { createContext, useContext, useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { LikedBooksContextType } from '../type/LikedBooksContextType';



const LikedBooksContext = createContext<LikedBooksContextType | undefined>(undefined);

export const LikedBooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 
    const [likedBooks, setLikedBooks] = useState<Book[]>(() => {
        const savedBooks = localStorage.getItem('likedBooks');
        return savedBooks ? JSON.parse(savedBooks) : [];
    });

  
    useEffect(() => {
        localStorage.setItem('likedBooks', JSON.stringify(likedBooks));
    }, [likedBooks]);

    const toggleLikedBook = (book: Book) => {
        setLikedBooks(prev => {
            if (isBookLiked(book)) {
                return prev.filter(b => b._id !== book._id);
            } else {
                return [...prev, book];
            }
        });
    };

    const removeLikedBook = (bookId: string) => {
        setLikedBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
    };

    const isBookLiked = (book: Book) => {
        return likedBooks.some(b => b._id === book._id);
    };

    return (
        <LikedBooksContext.Provider value={{ likedBooks, toggleLikedBook, isBookLiked, removeLikedBook }}>
            {children}
        </LikedBooksContext.Provider>
    );
};

export const useLikedBooks = () => {
    const context = useContext(LikedBooksContext);
    if (!context) {
        throw new Error('useLikedBooks must be used within a LikedBooksProvider');
    }
    return context;
};
