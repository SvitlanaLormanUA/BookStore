import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BookItem from './BookItem';
import defaultBooks from '../books.js';
import SearchInput from './SearchInput.js';
import Filters from './Filters.js';

export default function Books() {
    const location = useLocation();
    const books = location.state?.books || defaultBooks;

    // Стан для визначення мобільного режиму
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    
    // Відстеження зміни розміру екрану для адаптації
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = isMobile ? 3 : 9; // Для мобільних пристроїв показуємо 3 книги

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

    const renderPageNumbers = () => {
        const pageNumbers = [];

        
        if (currentPage > 3) {
            pageNumbers.push(
                <button key={1} onClick={() => goToPage(1)} className={`pagination-number ${currentPage === 1 ? 'active' : ''}`}>
                    1
                </button>
            );

            if (currentPage > 4) {
                pageNumbers.push(<span key="ellipsis-start" className='pagination-number'> ... </span>);
            }
        }

        // Додаємо поточну сторінку і сусідні
        for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
            pageNumbers.push(
                <button key={i} onClick={() => goToPage(i)} className={`pagination-number ${currentPage === i ? 'active' : ''}`}>
                    {i}
                </button>
            );
        }

        // Додаємо останню сторінку
        if (currentPage < totalPages - 2) {
            if (currentPage < totalPages - 3) {
                pageNumbers.push(<span key="ellipsis-end">...</span>);
            }

            pageNumbers.push(
                <button key={totalPages} onClick={() => goToPage(totalPages)} className={`pagination-number ${currentPage === totalPages ? 'active' : ''}`}>
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <>
            <div className="books-page">
                <div className="search-books-page-container">
                    <SearchInput searchIn={defaultBooks} />
                </div>
                <div className="filters-and-books"> 
                    <div className="filters-container">
                        <Filters />
                    </div>
                    {books.length > 0 ? (
                        <div className="all-book-list-container">
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

                                {/* Скорочена пагінація */}
                                <div className="pagination-numbers">
                                    {renderPageNumbers()}
                                </div>

                                <button 
                                    className="pagination-btn" 
                                    onClick={goToNextPage} 
                                    disabled={currentPage === totalPages}
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className='no-books-avaliable'>No books found </p>
                    )}
                </div>
            </div> 
        </>
    );
}
