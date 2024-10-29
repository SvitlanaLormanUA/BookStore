import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import BookItem from './BookItem';
import { BooksContext } from "../context/BooksContext.js";
import SearchInput from './SearchInput.js';
import Filters from './Filters.js';
import AmountOfFoundBooks from './AmountOfFoundBooks.js';

export default function Books() {
    const defaultBooks = useContext(BooksContext); 
    const location = useLocation();
    const books = location.state?.books || defaultBooks;

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [sortedBooks, setSortedBooks] = useState(books); // Для відсортованих книг
    const [isAscending, setIsAscending] = useState(true); // Стан для порядку сортування

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
    const booksPerPage = isMobile ? 5 : 9;

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

    const totalPages = Math.ceil(sortedBooks.length / booksPerPage);

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

    // Сортування книг
    const handleSort = () => {
        const sorted = [...sortedBooks].sort((a, b) => {
            if (isAscending) {
                return a.title.localeCompare(b.title); // Зростання
            } else {
                return b.title.localeCompare(a.title); // Спадання
            }
        });

        setIsAscending(!isAscending); // Змінюємо порядок сортування
        setSortedBooks(sorted); // Оновлюємо відсортовані книги
        setCurrentPage(1); // Повертаємо на першу сторінку
    };

    // Effect to reset current page to 1 when books change
    useEffect(() => {
        setSortedBooks(books); // Оновлюємо список книг при зміні
        setCurrentPage(1);
    }, [books]); 

    return (
        <>
            <div className="books-page">
                <div className="search-books-page-container">
                    <SearchInput 
                        searchIn={defaultBooks} 
                        navigateTo="/books"
                    />
                </div>
              
                <div className="filters-and-books"> 
                    <div className="filters-container">
                        <Filters />
                    </div>
                 
                    {sortedBooks.length > 0 ? (
                        <div className="all-book-list-container">
                            <div className="sorted-books-container">
                                <AmountOfFoundBooks message={'Found'} items={sortedBooks} />
                                <button onClick={handleSort} className="sort-button-2">
                                    Sort By {isAscending ? '↓' : '↑'}
                                </button>
                            </div>

                            <div className="book-list">
                                {currentBooks.map((book) => (
                                    <BookItem key={book._id} book={book} />
                                ))}
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
                        </div>
                    ) : (
                        <p className='no-books-avaliable'>No books found</p>
                    )}
                </div>
            </div> 
        </>
    );
}
