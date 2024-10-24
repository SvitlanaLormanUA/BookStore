import React, { createContext, useContext, useState } from 'react';
import { Book } from '../types/Book';

interface LikedBooksContextType {
    likedBooks: Book[];
    toggleLikedBook: (book: Book) => void;
    isBookLiked: (book: Book) => boolean;
}

const LikedBooksContext = createContext<LikedBooksContextType | undefined>(undefined);

export const LikedBooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [likedBooks, setLikedBooks] = useState<Book[]>([]);

    const toggleLikedBook = (book: Book) => {
        setLikedBooks(prev => {
            if (isBookLiked(book)) {
                // If it's already liked, remove it from the likedBooks
                return prev.filter(b => b._id !== book._id);
            } else {
                // Otherwise, add it to the likedBooks
                return [...prev, book];
            }
        });
    };

    const isBookLiked = (book: Book) => {
        return likedBooks.some(b => b._id === book._id);
    };

    return (
        <LikedBooksContext.Provider value={{ likedBooks, toggleLikedBook, isBookLiked }}>
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
