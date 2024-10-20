import React, { useState, useEffect } from "react";
import SwiperBooks from "./SwiperBooks";

import { v4 as uuidv4 } from 'uuid';
import { Book } from "../type/Book.js";
import "../styles/App.css";
import "../styles/mediaQueries.css";
import DiscountSlider from "./DiscountSlider.js";
import SearchInput from "./SearchInput.js";
import books from "../books.js";

const booksToBook: Book[] = books;

function arrangeBooks(books: Book[]): Book[] {
    const bookMap: { [key: string]: number } = {}; 
    
 
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
  
    
      if (book.soldCopies < 0) book.soldCopies = Math.abs(book.soldCopies);
      if (book.copiesInStock < 0) book.copiesInStock = Math.abs(book.copiesInStock);
      if (book.price < 0) book.price = Math.abs(book.price);
      if (book.year < 0) book.year = Math.abs(book.year);
  
    
      const bookKey = `${book.title}|${book.author}|${book.publisher}`;
  
      if (bookMap[bookKey] !== undefined) {
        // Якщо книга вже є в масиві, збільшуємо кількість у наявності
        books[bookMap[bookKey]].copiesInStock += book.copiesInStock;
        

        books.splice(i, 1);
        i--; 
      } else {
        // Якщо книги немає в списку, додаємо її
        bookMap[bookKey] = i; 
      }
    }
  
    return books;
  }
  
  
  const booksDataTyped: Book[] = arrangeBooks(booksToBook).sort((a, b) => a.title.localeCompare(b.title));
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
         <SearchInput searchIn={booksDataTyped} />
        </section>
        <section className="swiperBooks">
         
          <SwiperBooks
             books={popularBooks}
             auto={true}
             title={"Popular Books"}
             forLink="popular" />
        </section>
      </section>

<div id="other-main-content">
    
      <SwiperBooks
             books={newBooks}
             auto={false} 
             title={"New Books"}
             forLink="new" />

      <img src="https://media1.thehungryjpeg.com/thumbs2/ori_3852208_98jcsv1707xmjyh3xorfzb9irp99x77fmjl1tswi_kids-read-books-and-learn-happy-reading-people-girls-and-boys-with-b.jpg" alt="" />
      <DiscountSlider message="Fall Pcice Drops 🍁"/>
      <SwiperBooks
             books={saleBooks}
             auto={false} 
             title={""} 
             placeDiscountIcon={true}
             forLink="sale" />
       </div>
    </>
  
  );
}
