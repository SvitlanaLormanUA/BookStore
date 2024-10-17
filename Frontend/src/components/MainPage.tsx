import React, { useState, useEffect } from "react";
import SwiperBooks from "./SwiperBooks";
import booksData from "../books.js"; 
import { Book } from "../type/Book.js";
import "../styles/App.css";
import "../styles/mediaQueries.css";

const booksDataTyped: Book[] = booksData;

export default function MainPage() {

  const [popularBooks, setPopularBooks] = useState<{ title: string; author: string; img: string; }[]>([]);
  const [newBooks, setNewBooks] = useState<{ title: string; author: string; img: string; }[]>([]);

  useEffect(() => {
    const filteredPopularBooks = booksDataTyped.filter(book => book.popular);

    
    const formattedPopularBooks = filteredPopularBooks.map(book => {
      const { title, author, img } = book;
      return { title, author, img };
    });

   
    const filteredNewBooks = booksDataTyped.filter(book => book.new);

    
    const formattedNewBooks = filteredNewBooks.map(book => {
      const { title, author, img } = book;
      return { title, author, img };
    });

   
    setPopularBooks(formattedPopularBooks);
    setNewBooks(formattedNewBooks);
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
  </div>
    </>
  
  );
}
