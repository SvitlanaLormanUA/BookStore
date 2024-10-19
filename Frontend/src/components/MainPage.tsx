import React, { useState, useEffect } from "react";
import SwiperBooks from "./SwiperBooks";

import { v4 as uuidv4 } from 'uuid';
import { Book } from "../type/Book.js";
import "../styles/App.css";
import "../styles/mediaQueries.css";
import DiscountSlider from "./DiscountSlider.js";
import SearchInput from "./SearchInput.js";
const books = [
  {
      id: uuidv4(),
      title: 'Where the Crawdads Sing',
      author: 'Delia Owens',
      year: 2018,
      genre: 'Mystery',
      description: 'A young woman raised in the marshes of North Carolina becomes the prime suspect in a murder case.',
      img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582135294i/36809135.jpg',
      popular: false,
      soldCopies: 2000000,
      copiesInStock: 500,
      price: 12.99,
      isForSale: true,
      sale: 10,
      new: false
  },
  {
      id: uuidv4(),
      title: 'The Night Circus',
      author: 'Erin Morgenstern',
      year: 2011,
      genre: 'Fantasy',
      description: 'A magical competition between two illusionists that transforms into a deep connection within a mysterious circus.',
      img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1387124618i/9361589.jpg',
      popular: true,
      soldCopies: 1000000,
      copiesInStock: 200,
      price: 9.99,
      isForSale: true,
      sale: 15,
      new: false
  },
  {
      id: uuidv4(),
      title: 'The Midnight Library',
      author: 'Matt Haig',
      year: 2020,
      genre: 'Fantasy',
      description: 'A woman finds herself in a library between life and death where she explores the lives she could have lived.',
      img: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1602190253l/52578297.jpg',
      popular: false,
      soldCopies: 1500000,
      copiesInStock: 350,
      price: 14.99,
      isForSale: false,
      sale: 0,
      new: true
  },
  {
      id: uuidv4(),
      title: 'Normal People',
      author: 'Sally Rooney',
      year: 2018,
      genre: 'Romance',
      description: 'A complicated relationship between two young adults as they navigate love, friendship, and societal expectations.',
      img: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/f/i/file_164_2.png',
      popular: true,
      soldCopies: 1200000,
      copiesInStock: 400,
      price: 11.99,
      isForSale: false,
      sale: 0,
      new: false
  },
  {
      id: uuidv4(),
      title: 'The Vanishing Half',
      author: 'Brit Bennett',
      year: 2020,
      genre: 'Historical Fiction',
      description: 'The story of twin sisters who grow up together in a small, Black community but take very different paths in life.',
      img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1577090827l/51791252.jpg',
      popular: false,
      soldCopies: 900000,
      copiesInStock: 300,
      price: 13.99,
      isForSale: false,
      sale: 0,
      new: true
  },
  {
      id: uuidv4(),
      title: 'Educated',
      author: 'Tara Westover',
      year: 2018,
      genre: 'Memoir',
      description: 'A memoir of a woman who grows up in a strict and abusive household in rural Idaho but eventually escapes to learn about the world through education.',
      img: 'https://www.usatoday.com/gcdn/-mm-/4453ec9ae81a9fad845c3f03a178477f1bd0f741/c=0-162-1838-2613/local/-/media/2018/02/13/USATODAY/USATODAY/636541388748249933-EDUCATED-Cover.jpg?width=660&height=881&fit=crop&format=pjpg&auto=webp',
      popular: false,
      soldCopies: 1800000,
      copiesInStock: 100,
      price: 16.99,
      isForSale: true,
      sale: 25,
      new: false
  },
  {
      id: uuidv4(),
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      year: 2019,
      genre: 'Psychological Thriller',
      description: 'A psychotherapist becomes obsessed with uncovering the truth behind a woman’s mysterious silence after she murders her husband.',
      img: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/8/1/81_vle6hyol.jpg',
      popular: false,
      soldCopies: 800000,
      copiesInStock: 250,
      price: 10.99,
      isForSale: true,
      sale: 10,
      new: false
  },
  {
      id: uuidv4(),
      title: 'Circe',
      author: 'Madeline Miller',
      year: 2018,
      genre: 'Fantasy',
      description: 'A retelling of the myth of Circe, the enchantress from Greek mythology, as she carves out a place for herself in a world of gods and mortals.',
      img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1565909496i/35959740.jpg',
      popular: true,
      soldCopies: 1300000,
      copiesInStock: 150,
      price: 12.49,
      isForSale: true,
      sale: 5,
      new: false
  },
  {
      id: uuidv4(),
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      year: 2017,
      genre: 'Historical Fiction',
      description: 'A reclusive Hollywood icon recounts her tumultuous life and seven marriages in a compelling, fictional memoir.',
      img: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/7/1/71pievu3eel.jpg',
      popular: false,
      soldCopies: 1400000,
      copiesInStock: 120,
      price: 15.99,
      isForSale: false,
      sale: 0,
      new: true
  },
  {
      id: uuidv4(),
      title: 'A Man Called Ove',
      author: 'Fredrik Backman',
      year: 2012,
      genre: 'Fiction',
      description: 'A grumpy but loveable man finds his world turned upside down when a lively young family moves in next door.',
      img: 'https://static.yakaboo.ua/media/catalog/product/9/1/916fuxlx90l.jpg',
      popular: false,
      soldCopies: 1100000,
      copiesInStock: 180,
      price: 9.99,
      isForSale: true,
      sale: 20,
      new: false
  },

  {
      id: uuidv4(),
      title: 'Dune',
      author: 'Frank Herbert',
      year: 1965,
      genre: 'Science Fiction',
      description: 'Set on the desert planet Arrakis, this epic tale follows the journey of Paul Atreides as he navigates politics, religion, and the fight for control of the universe’s most valuable resource.',
      img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg',
      popular: false,
      soldCopies: 20000000,
      copiesInStock: 300,
      price: 19.99,
      isForSale: true,
      sale: 0,
      new: false
  },
  {
      id: uuidv4(),
      title: 'The Song of Achilles',
      author: 'Madeline Miller',
      year: 2011,
      genre: 'Fantasy',
      description: 'A retelling of the myth of Achilles and Patroclus, exploring their friendship, love, and the events leading up to the Trojan War.',
      img: 'https://m.media-amazon.com/images/I/81msb6gUBTL._AC_UF1000,1000_QL80_.jpg',
      popular: true,
      soldCopies: 500000,
      copiesInStock: 450,
      price: 14.99,
      isForSale: false,
      sale: 0,
      new: true
  },
  {
      id: uuidv4(),
      title: 'Becoming',
      author: 'Michelle Obama',
      year: 2018,
      genre: 'Memoir',
      description: 'In this deeply personal memoir, Michelle Obama reflects on the experiences that shaped her life, from her childhood in Chicago to her years as First Lady of the United States.',
      img:'https://m.media-amazon.com/images/I/81+QX4VMrmS._AC_UF894,1000_QL80_.jpg',
      popular: false,
      soldCopies: 10000000,
      copiesInStock: 200,
      price: 18.99,
      isForSale: false,
      sale: 0,
      new: true
  },
  {
      id: uuidv4(),
      title: 'The Invisible Life of Addie LaRue',
      author: 'V.E. Schwab',
      year: 2020,
      genre: 'Fantasy',
      description: 'A woman makes a pact to live forever, but is cursed to be forgotten by everyone she meets until one day, someone remembers her.',
      img: "https://d3ddkgxe55ca6c.cloudfront.net/assets/t1669384890/a/c2/67/219279-ml-2162359.jpg",
      popular: true,
      soldCopies: 1500000,
      copiesInStock: 450,
      price: 17.99,
      isForSale: true,
      sale: 10,
      new: false
  },
  {
      id: uuidv4(),
      title: 'The Priory of the Orange Tree',
      author: 'Samantha Shannon',
      year: 2019,
      genre: 'Fantasy',
      description: 'A high fantasy epic featuring dragons, magic, and a world on the brink of destruction.',
      img:'https://www.bookerycincy.com/cdn/shop/products/9_58c52905-e97f-4b36-8d7a-cf6749849114_700x.jpg?v=1661132293',
      popular: false,
      soldCopies: 700000,
      copiesInStock: 320,
      price: 24.99,
      isForSale: true,
      sale: 20,
      new: false
  },
  {
      id: uuidv4(),
      title: 'The House in the Cerulean Sea',
      author: 'TJ Klune',
      year: 2020,
      genre: 'Fantasy',
      description: 'A heartwarming story about a government worker who is sent to oversee a group of magical children and discovers the power of love and acceptance.',
      img: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1569514209i/45047384.jpg',
      popular: true,
      soldCopies: 1200000,
      copiesInStock: 400,
      price: 16.99,
      isForSale: true,
      sale: 5,
      new: false
  },
  {
      id: uuidv4(),
      title: 'The Seven Deaths of Evelyn Hardcastle',
      author: 'Stuart Turton',
      year: 2018,
      genre: 'Mystery',
      description: 'A man must solve the murder of Evelyn Hardcastle, but every time he dies, he wakes up in the body of a different guest at the event.',
    img:'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506896221i/36337550.jpg',
      popular: false,
      soldCopies: 800000,
      copiesInStock: 250,
      price: 14.49,
      isForSale: true,
      sale: 15,
      new: false
  },
  {
      id: uuidv4(),
      title: 'Red, White & Royal Blue',
      author: 'Casey McQuiston',
      year: 2019,
      genre: 'Romance',
      description: 'A romantic comedy about the son of the U.S. president and the Prince of Wales who go from rivals to lovers.',
      img: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/7/1/710bsrzv7kl.jpg',
      popular: true,
      soldCopies: 2000000,
      copiesInStock: 500,
      price: 13.99,
      isForSale: true,
      sale: 10,
      new: false
  }
];

const booksDataTyped: Book[] = books;

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
