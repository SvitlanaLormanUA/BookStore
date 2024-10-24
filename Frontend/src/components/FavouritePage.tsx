import { useState } from 'react';
import { useLikedBooks } from '../context/LikedBooksContext';
import { Book } from '../types/Book';
import AddToCartButton from './AddToCartButton';
import AmountOfFoundBooks from './AmountOfFoundBooks';

export default function FavouritePage() {
    const { likedBooks, removeLikedBook } = useLikedBooks(); // Include removeLikedBook

    const [sortedBooks, setSortedBooks] = useState(likedBooks); // Initialize state for sorted books
    const [isAscending, setIsAscending] = useState(true); // Sorting order state

    // Handle removing books
    const handleRemove = (bookId: string) => {
        removeLikedBook(bookId); // Call the remove function
        setSortedBooks(sortedBooks.filter((book) => book._id !== bookId)); // Update sortedBooks list
    };

    // Handle sorting books
    const handleSort = () => {
        const sorted = [...sortedBooks].sort((a, b) => {
            if (isAscending) {
                return a.title.localeCompare(b.title); // Sort A-Z
            } else {
                return b.title.localeCompare(a.title); // Sort Z-A
            }
        });
        setSortedBooks(sorted);
        setIsAscending(!isAscending); // Toggle sorting order
    };

    return (
        <div className="favouritePage-container">
            <div className="favourite-page">
                {sortedBooks.length === 0 ? (
                    <p>You have no favourite books.</p>
                ) : (
                    <>
                    <div className="fav-books-found-cont">
                        <div className="amountOfBooks">
                        <AmountOfFoundBooks message={'Favourite books'} items={sortedBooks} />
                        </div>
                        {/* Sort Button */}
                        <button onClick={handleSort} className="sort-button">
                            Sort By {isAscending ? '↓' : '↑'}
                        </button>
                    </div>
                    <ul className="liked-books-list">
                        {sortedBooks.map((book: Book) => (
                            <li key={book._id} className="liked-book-item">
                                <img src={book.img} alt="Book Cover" />
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
