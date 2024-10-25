import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLikedBooks } from '../context/LikedBooksContext';
import { Book } from '../types/Book';
import AddToCartButton from './AddToCartButton';
import AmountOfFoundBooks from './AmountOfFoundBooks';
import SearchInput from './SearchInput';

export default function FavouritePage() {
    const { likedBooks, removeLikedBook } = useLikedBooks(); 
    const location = useLocation();
    const navigate = useNavigate();
    
    const [sortedBooks, setSortedBooks] = useState<Book[]>(likedBooks); 
    const [isAscending, setIsAscending] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // Track the search term

    function handleClick(book: Book) {
        navigate(`/book/${book._id}`, { state: book });
        console.log(book);
    }

    // Check if there are any search results from the search page
    useEffect(() => {
        if (location.state?.books) {
            setSortedBooks(location.state.books);
        } else {
            setSortedBooks(likedBooks);
        }
    }, [location.state, likedBooks]); 

    const handleRemove = (bookId: string) => {
        removeLikedBook(bookId); 
        setSortedBooks(sortedBooks.filter((book) => book._id !== bookId)); 
    };

    const handleSort = () => {
        const sorted = [...sortedBooks].sort((a, b) => {
            if (isAscending) {
                return a.title.localeCompare(b.title); // Sort A-Z
            } else {
                return b.title.localeCompare(a.title); // Sort Z-A
            }
        });
        setSortedBooks(sorted);
        setIsAscending(!isAscending); 
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        const filteredBooks = likedBooks.filter((book) =>
            book.title.toLowerCase().includes(term.toLowerCase())
        );
        setSortedBooks(filteredBooks);
    };

    return (
        <div className="favouritePage-container">
            <div className="favourite-page">
                {sortedBooks.length === 0 && searchTerm ? (
                    <div className="no-results-message">
                        <p>Oops, you haven't liked this book. Would you like to browse all books in the bookstore?</p>
                        <button onClick={() => navigate('/bookstore')}>
                            Browse Bookstore
                        </button>
                    </div>
                ) : sortedBooks.length === 0 ? (
                    <p>You have no favourite books.</p>
                ) : (
                    <>
                    <div className="input-fav-container">
                        <SearchInput 
                            searchIn={likedBooks}  
                            navigateTo="/favorite" 
                        />
                    </div>
                    <div className="fav-books-found-cont">
                        <div className="amountOfBooks">
                            <AmountOfFoundBooks message={'Found in favourite books'} items={sortedBooks} />
                        </div>
                        <button onClick={handleSort} className="sort-button">
                            Sort By {isAscending ? '↓' : '↑'}
                        </button>
                    </div>
                    <ul className="liked-books-list">
                        {sortedBooks.map((book: Book) => (
                            <li key={book._id} className="liked-book-item" >
                                <img src={book.img} alt="Book Cover" onClick={() => handleClick(book)} />
                                <div className="text-info-liked-book">
                                    <p>{book.title}</p>
                                    <p>{book.author}</p>
                                    <div className="rating-container">
                                        <div className="stars">
                                            {Array.from({ length: Math.floor(book.stars) }, (_, i) => (
                                                <span key={i}>⭐️</span>
                                            ))}
                                        </div>
                                        <p>{book.stars}</p>
                                    </div>
                                    <div className="button-container">
                                        <div className="add-to-cart-btn-container">
                                            <AddToCartButton />
                                        </div>
                                    </div>
                                </div>
                                <p 
                                    className="remove-book-btn" 
                                    onClick={() => handleRemove(book._id)} 
                                    aria-label="Remove from favorites"
                                >
                                    🗑️
                                </p>
                            </li>
                        ))}
                    </ul>
                    </>
                )}
            </div>
        </div>
    );
}
