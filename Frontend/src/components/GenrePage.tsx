import { useParams } from 'react-router-dom';
import booksData from "../books.js"; 

import { Link } from 'react-router-dom';
import { Book } from '../type/Book.js';
export default function GenrePage() {
  const { genre } = useParams();  
  const booksDataTyped: Book[] = booksData;
  
  const books = getBooksByGenre(booksDataTyped);  

  return (
    <div>
      <h1>{genre.charAt(0).toUpperCase() + genre.slice(1)} Books</h1>  {/* Capitalize genre */}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${genre}/${book.id}`}>
              {book.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


function getBooksByGenre(books: Book[]) {

  return books.filter((book) => book.genre === genre);
}
