import React, { useState, useEffect, useContext } from "react";
import SwiperBooks from "./SwiperBooks";
import { Book } from "../interfaces/Book.js";
import "../styles/App.css";
import "../styles/mediaQueries.css";
import DiscountSlider from "./DiscountSlider.js";
import SearchInput from "./SearchInput.js";
import { BooksContext } from "../context/BooksContext.js";


export default function MainPage() {
  const booksToBook = useContext(BooksContext); // Access the context

  
  const [popularBooks, setPopularBooks] = useState<Book[]>([]);
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const [saleBooks, setSaleBooks] = useState<Book[]>([]);

  // Process books once booksToBook is updated
  useEffect(() => {
    if (!booksToBook) return; // Ensure booksToBook is defined

    const filteredPopularBooks = booksToBook.filter((book) => book.popular);
    setPopularBooks(filteredPopularBooks);

    const filteredNewBooks = booksToBook.filter((book) => book.new);
    setNewBooks(filteredNewBooks);

    const filteredSaleBooks = booksToBook.filter((book) => book.sale > 0);
    setSaleBooks(filteredSaleBooks);
  }, [booksToBook]);

  return (
    <>
      <section className="welcomePage">
        <section className="bookstore-name">
          <p>best choice</p>
          <h1>BamBook</h1>
          <SearchInput 
          searchIn={booksToBook}
          navigateTo="/books" />
          <img src="src/assets/images/cat-on-books 1.png" alt="" className="img-main-page" />
        </section>

        <section className="swiperBooks">
          <SwiperBooks books={popularBooks} auto={true} title="Popular Books" forLink="popular" />
        </section>
      </section>

      <div id="other-main-content">
        <SwiperBooks books={newBooks} auto={false} title="New Books" forLink="new" />
        <img src="https://media1.thehungryjpeg.com/thumbs2/ori_3852208_98jcsv1707xmjyh3xorfzb9irp99x77fmjl1tswi_kids-read-books-and-learn-happy-reading-people-girls-and-boys-with-b.jpg" alt="" />
        <DiscountSlider message="Fall Price Drops 🍁" />
        <SwiperBooks books={saleBooks} auto={false} title="" placeDiscountIcon={true} forLink="sale" />
      </div>
    </>
  );
}
