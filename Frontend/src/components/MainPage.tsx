import React, { useState, useEffect } from "react";
import SwiperBooks from "./SwiperBooks";
import booksData from "../books.js"; 

import "../styles/App.css";
import '../styles/mediaQueries.css'

export default function MainPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
   
    const formattedBooks = booksData.map(book => {
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
          <h1>Bam Book</h1>
        </section>
        <section className="swiperBooks">
             <SwiperBooks books={books} />
        </section>
      </section>
    </>
  );
}
