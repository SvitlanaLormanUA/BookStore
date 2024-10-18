import React, { useState, useEffect } from "react";
import SwiperBooks from "./SwiperBooks";
import booksData from "../books.js"; 
import { Book } from "../type/Book.js";
import "../styles/App.css";
import "../styles/mediaQueries.css";

const booksDataTyped: Book[] = booksData;

export default function MainPage() {
  
  const [popularBooks, setPopularBooks] = useState<Book[]>([]);
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const [saleBooks, setSaleBooks] = useState<Book[]>([]);
  useEffect(() => {
    const filteredPopularBooks = booksDataTyped.filter(book => book.popular);
  
    setPopularBooks(filteredPopularBooks);
  

    const filteredNewBooks = booksDataTyped.filter(book => book.new)
    setNewBooks(filteredNewBooks);

    const filteredSaleBooks = booksDataTyped.filter(book => book.sale > 0);

    setSaleBooks(filteredSaleBooks);

  }, []);

  return (
    <>
      <section className="welcomePage">
        <section className="bookstore-name">
          <p>best choice</p>
          <h1>BamBook</h1>
          <div className="books-input-container">
            <input type="text" className="books-input" placeholder="Find a book..." />
            <button>Search</button>
          </div>
        </section>
        <section className="swiperBooks">
         
          <SwiperBooks
             books={popularBooks}
             auto={true}
             title={"Popular Books"} />
        </section>
      </section>

<div id="other-main-content">
    
      <SwiperBooks
             books={newBooks}
             auto={false} 
             title={"New Books"} />


      <SwiperBooks
             books={saleBooks}
             auto={false} 
             title={"Fall Pcice Drops 🍁"} />
 </div>
    </>
  
  );
}
