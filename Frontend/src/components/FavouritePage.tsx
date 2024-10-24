
import { useLikedBooks } from '../context/LikedBooksContext'; // Adjust the path
import { Book } from '../types/Book'; // Import the Book type if necessary

export default function FavouritePage() {
    const { likedBooks, toggleLikedBook } = useLikedBooks();

    return (
        <div className="favourite-page">
            <h1>Your Favourite Books</h1>
            {likedBooks.length === 0 ? (
                <p>You have no favourite books.</p>
            ) : (
                <ul className="liked-books-list">
                    {likedBooks.map((book: Book) => (
                        <li key={book.id} className="liked-book-item">
                            <div className="book-details">
                                <img src={book.img} alt={book.title} />
                                <div className="book-info">
                                    <h2>{book.title}</h2>
                                    <p>{book.author}</p>
                                </div>
                            </div>
                            <div 
                                className="liked-book-toggle" 
                                onClick={() => toggleLikedBook(book)} 
                                style={{ cursor: 'pointer', fontSize: '24px' }}
                            >
                                ♥️ Remove from Favourites
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
