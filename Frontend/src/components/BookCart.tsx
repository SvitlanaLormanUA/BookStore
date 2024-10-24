import { useLocation } from 'react-router-dom';
import { Book } from '../types/Book';
import AddToCartButton from './AddToCartButton';
import { useLikedBooks } from '../context/LikedBooksContext';

export default function BookCart() {
    const location = useLocation();
    const book = location.state as Book;

    const { toggleLikedBook, isBookLiked } = useLikedBooks();
    const liked = isBookLiked(book);

    function calculateSalePrice(price: number, sale: number) {
        return price - (price * sale) / 100;
    }

    return (
        <div className="book-cart">
            {book ? (
                <div className="book-details">
                    <div className="book-details-image">
                        <img src={book.img} alt={book.title} />
                    </div>
                    <div className="book-details-text">
                        <h2 className="book-title">{book.title}</h2>
                        <p className="book-author">{book.author}</p>
                        <div className="description-und-price">
                            <p className="book-description">{book.description}</p>

                            <div className="price-and-button">
                                <div className="price-book-cart">
                                    <p className={`${book.sale > 0 ? 'price-book-cart crossed' : 'book-price'}`}>
                                        {book.price} $
                                    </p>

                                    {book.sale > 0 ? (
                                        <p className="book-sale-price" id="book-item-price-red">
                                            {calculateSalePrice(book.price, book.sale).toFixed(2)} $
                                        </p>
                                    ) : null}
                                </div>
                                <AddToCartButton />
                            </div>
                        </div>
                    </div>
                    <div 
                        className="liked-book" 
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the book detail click
                            toggleLikedBook(book); 
                        }} 
                        style={{ cursor: 'pointer', fontSize: '24px' }}
                    >
                        {liked ? '♥️' : '♡'}
                    </div>
                </div>
            ) : (
                <p className="no-book-message">No book information available.</p>
            )}
        </div>
    );
}
