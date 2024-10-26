import React, { createContext, useState, useContext, useEffect } from "react";
import { BooksInCardContextType } from "../type/BooksInCardContextType";
import { Book } from "../type/Book";


const BooksInCartContext = createContext<BooksInCardContextType | undefined>(undefined);

export const BooksInCartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [booksInCart, setBooksInCart] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem("booksInCart");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem('booksInCart', JSON.stringify(booksInCart));

}, [booksInCart]);

const toggleBookInCart = (book: Book) => {
  setBooksInCart(prev => {
      if (isBookInCart(book)) {
          return prev.filter(b => b._id !== book._id);
      } else {
          return [...prev, book];
      }
  });
};

const removeBookFromCart = (bookId: string) => {
  setBooksInCart(prevBooks => prevBooks.filter(book => book._id !== bookId));
};

const isBookInCart= (book: Book) => {
  return booksInCart.some(b => b._id === book._id);
};

return (
  <BooksInCartContext.Provider value={{ booksInCart, toggleBookInCart, isBookInCart, removeBookFromCart }}>
      {children}
  </BooksInCartContext.Provider>
);

};



// Хук для використання контексту
export const useBooksInCart = () => {
  const context = useContext(BooksInCartContext);
  if (!context) {
    throw new Error("useBooksInCart must be used within a BooksInCartContextProvider");
  }
  return context;
};
