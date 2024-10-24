// FavouritePage.tsx
import { useLikedBooks } from '../context/LikedBooksContext';
import { Book } from '../types/Book';
import AddToCartButton from './AddToCartButton';
import BookCard from './BookCard'; // Corrected import

export default function FavouritePage() {
    const { likedBooks } = useLikedBooks();

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
                                <p className='book-title'>{book.title}</p>
                                <p className='book-author'>{book.author}</p>
                                <div className="rating-container">
                                    <div className="stars">
                                        {Array.from({ length: Math.floor(book.stars) }, (_, i) => (
                                            <span key={i}>⭐️</span> 
                                        ))}
                                    </div>
                                    <p>{book.stars}</p> 
                                    
                                </div>
                                < AddToCartButton />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
