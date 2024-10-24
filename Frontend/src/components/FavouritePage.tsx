// FavouritePage.tsx
import { useLikedBooks } from '../context/LikedBooksContext';
import { Book } from '../types/Book';
import AddToCartButton from './AddToCartButton';

export default function FavouritePage() {
    const { likedBooks, removeLikedBook } = useLikedBooks(); // Include removeLikedBook

    const handleRemove = (bookId: string) => {
        removeLikedBook(bookId); // Call the remove function
    };

    return (
        <div className="favouritePage-container">
            <div className="favourite-page">
                {likedBooks.length === 0 ? (
                    <p>You have no favourite books.</p>
                ) : (
                    <ul className="liked-books-list">
                        {likedBooks.map((book: Book) => (
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
                )}
            </div>
        </div>
    );
}
