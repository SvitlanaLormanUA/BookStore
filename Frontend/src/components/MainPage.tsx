import React, { useState, useEffect } from "react";
import SwiperBooks from "./SwiperBooks";
import booksData from "../books.js"; 
import { Book } from "../type/Book.js";
import "../styles/App.css";
import "../styles/mediaQueries.css";


const booksDataTyped: Book[] = booksData;

export default function MainPage() {
  const [books, setBooks] = useState<{ title: string; author: string; img: string; }[]>([]);

  useEffect(() => {
   
    const popularBooks = booksDataTyped.filter(book => book.popular);

  
    const formattedBooks = popularBooks.map(book => {
      const { title, author, img } = book; 
      return { title, author, img };
    });

   
    setBooks(formattedBooks);
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
          {/* Pass only popular books to SwiperBooks component */}
          <SwiperBooks books={books} />
        </section>
      </section>
    </>
  );
}
