import React from 'react';
import { useParams, Link } from 'react-router-dom';
import booksData from "../books.js"; 
import { Book } from '../type/Book.js';

export default function GenrePage() {
  
  const { genre } = useParams();  
  

  const booksDataTyped: Book[] = booksData;

  const books = genre ? getBooksByGenre(booksDataTyped, genre) : [];  

  return (
    <div>
     
      <h1>{genre ? genre.charAt(0).toUpperCase() + genre.slice(1) : 'Unknown'} Books</h1>
      
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {/* Link to the detailed page for the book */}
            <Link to={`/books/${genre}/${book.id}`}>
              {book.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function getBooksByGenre(books: Book[], genre: string) {
  return books.filter((book) => book.genre === genre);
}
