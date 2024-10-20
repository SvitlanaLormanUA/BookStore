
import { useLocation, useState } from 'react-router-dom';
import BookItem from './BookItem';
import defaultBooks from '../books.js';
import SearchInput from './SearchInput.js';

export default function Books() {
  
    const location = useLocation();

    const books = location.state?.books || defaultBooks;

    return (
        <>
        <div className="book-filters"></div>
    <div className='books-page'>
        <div className="search-books-page-container">
        <SearchInput searchIn={defaultBooks}/>
        </div>
            {books.length > 0 ? (
               <div className="book-list">
                    {books.map((book, index) => {
                        console.log(book);
                        return <BookItem key={book.id} book={book} />;
                    })}
                    
                </div>
            ) : (
                <p>No books available.</p>
            )}
        </div>
        </>
    );
}
