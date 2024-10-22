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
    
    const detectLanguage = (title: string): string => {
     
      const cyrillicRegex = /[а-яА-ЯіІїЇєЄґҐ]/;
      if (cyrillicRegex.test(title)) {
        const crimeanTatarRegex = /[қğışүңә]/;  
        if (crimeanTatarRegex.test(title)) {
          return 'Crimean Tatar';
        }
        return 'Ukrainian'; 
      }
      
   
      const latinRegex = /[a-zA-Z]/;
      if (latinRegex.test(title)) {
     
        const frenchRegex = /[éèêëàâçù]/;
        const germanRegex = /[äöüß]/;    
        const chineseRegex = /[\u4e00-\u9fa5]/;
        const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u31F0-\u31FF\u4E00-\u9FFF]/; 
        
        if (chineseRegex.test(title)) {
          return 'Chinese';
        }
        if (japaneseRegex.test(title)) {
          return 'Japanese';
        }
        if (frenchRegex.test(title)) {
          return 'French';
        }
        if (germanRegex.test(title)) {
          return 'German';
        }
        return 'English'; 
      }
      
      return 'Unknown'; 
    }
  
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
    
      // Ensure all fields are non-negative
      if (book.soldCopies < 0) book.soldCopies = Math.abs(book.soldCopies);
      if (book.copiesInStock < 0) book.copiesInStock = Math.abs(book.copiesInStock);
      if (book.price < 0) book.price = Math.abs(book.price);
      if (book.year < 0) book.year = Math.abs(book.year);
      if (book.stars < 0) book.stars = Math.abs(book.stars);
      if (book.stars > 5) book.stars = 5;
    
      // Detect the language based on the title
      if (book.language === undefined)
      book.language = detectLanguage(book.title);
    
      const bookKey = `${book.title}|${book.author}|${book.publisher}`;
    
      if (bookMap[bookKey] !== undefined) {
        // If the book is already in the array, increase stock count
        books[bookMap[bookKey]].copiesInStock += book.copiesInStock;
        books.splice(i, 1);
        i--;  // Adjust index after removal
      } else {
        // If the book is not in the list, add it
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
