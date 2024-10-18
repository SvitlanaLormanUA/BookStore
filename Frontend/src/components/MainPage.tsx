import React, { useState, useEffect } from "react";
import SwiperBooks from "./SwiperBooks";
import booksData from "../books.js"; 
import { Book } from "../type/Book.js";
import "../styles/App.css";
import "../styles/mediaQueries.css";
import DiscountSlider from "./DiscountSlider.js";

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

      <img src="https://media1.thehungryjpeg.com/thumbs2/ori_3852208_98jcsv1707xmjyh3xorfzb9irp99x77fmjl1tswi_kids-read-books-and-learn-happy-reading-people-girls-and-boys-with-b.jpg" alt="" />
      <DiscountSlider message="Fall Pcice Drops 🍁"/>
      <SwiperBooks
             books={saleBooks}
             auto={false} 
             title={""} 
             placeDiscountIcon={true} />
 </div>
    </>
  
  );
}
