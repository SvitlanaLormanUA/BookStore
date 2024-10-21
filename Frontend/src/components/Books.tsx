import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import BookItem from './BookItem';
import defaultBooks from '../books.js';
import SearchInput from './SearchInput.js';
import Filters from './Filters.js';

export default function Books() {
    const location = useLocation();

    const books = location.state?.books || defaultBooks;
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 9; // Number of books to display per page

    // Calculate the starting and ending index for the books to display
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const totalPages = Math.ceil(books.length / booksPerPage);

    // Handle page navigation
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="book-filters"></div>
            <div className="books-page">
                <div className="search-books-page-container">
                    <SearchInput searchIn={defaultBooks} />
                </div>
                <div className="filters-container">
                    <Filters />
                </div>
                {books.length > 0 ? (
                    <>
                        <div className="book-list">
                            {currentBooks.map((book) => {
                                return <BookItem key={book.id} book={book} />;
                            })}
                        </div>


                        <div className="pagination">
                            <button 
                                className="pagination-btn" 
                                onClick={goToPreviousPage} 
                                disabled={currentPage === 1}
                            >
                                &lt; 
                            </button>

                            {/* Page Numbers */}
                            <div className="pagination-numbers">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button 
                                        key={index + 1} 
                                        className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                                        onClick={() => goToPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <button 
                                className="pagination-btn" 
                                onClick={goToNextPage} 
                                disabled={currentPage === totalPages}
                            >
                                 &gt;
                            </button>
                        </div>
                    </>
                ) : (
                    <p className='no-books-avaliable'>No books found </p>
                )}
            </div>
        </>
    );
}
