import React, { createContext, useState, useContext, useEffect } from "react";
import { BooksInCardContextType } from "../type/BooksInCardContextType";
import { Book } from '../interfaces/Book';


const BooksInCartContext = createContext<BooksInCardContextType | undefined>(undefined);

export const BooksInCartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [booksInCart, setBooksInCart] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem("booksInCart");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem('booksInCart', JSON.stringify(booksInCart ));

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

const removeBookFromCart = (bookId: string | number) => {
  setBooksInCart(prevBooks => prevBooks.filter(book => book._id !== bookId));
  
};

const isBookInCart= (book: Book) => {
  return booksInCart.some(b => b._id === book._id);
};

const purchaseBooks = (books: Book[], fullName: string, email: string, country: string, city: string, post: string, ) => {
  const purchaseObj = {
      books: books,
      buyerInfo: {
          fullName,
          email,
          country,
          city,
          post
      }
  }
localStorage.setItem('purchasedBooks', JSON.stringify(purchaseObj));
}

return (
  <BooksInCartContext.Provider value={{ booksInCart, toggleBookInCart, isBookInCart, removeBookFromCart, purchaseBooks }}>
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
