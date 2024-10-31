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


 function purchaseBooks(books: Book[], bookAmounts: { [id: string]: number }, fullName: string, country: string, city: string, branchNumber: string, email: string, totalSaleAmount: number) {
  // Приклад обробки кожної книги з врахуванням кількості
  const booksToPurchase = books.map((book) => ({
      ...book,
      amount: bookAmounts[book._id] || 1, // Отримуємо кількість для кожної книги, якщо є
  }));

  // Логіка для збереження замовлення
  const orderDetails = {
      books: booksToPurchase,
      buyer: { fullName, country, city, branchNumber, email },
      totalSaleAmount,
      purchaseDate: new Date().toISOString(),
      send: false,
  };

  fetch("http://localhost:3000/add-purchase", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
  })
      .then((res) => {
          if (!res.ok) {
              throw new Error("Network response was not ok");
          }
          return res.json();
      })
      .then((data) => {
          console.log("Order saved successfully:", data);
          // Очистити кошик після успішного замовлення
          setBooksInCart([]);
      })
      .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
  });

  console.log("Order details:", orderDetails);

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
