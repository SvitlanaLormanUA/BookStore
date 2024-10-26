import { useNavigate } from "react-router-dom";
import { useBooksInCart } from "../context/BooksInCartContext";
import AddToCartButton from "./AddToCartButton";
import AmountOfFoundBooks from "./AmountOfFoundBooks";
import { Book } from "../type/Book";
import SearchInput from "./SearchInput";

export default function BooksCart() {
    const { booksInCart, removeBookFromCart } = useBooksInCart();
    const navigate = useNavigate();
    function handleClick(book: Book) {
        navigate(`/book/${book._id}`, { state: book });
        console.log(book);
    }

    return (
        <div className="cart-to-buy-books-container">
           
            <div className="input-fav-container">
                        <SearchInput 
                            searchIn={booksInCart}  
                            navigateTo="/cart" 
                        />
                        </div>
                    <ul className="liked-books-list">
                        {booksInCart.map((book: Book) => (
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
                                            <button onClick={() => removeBookFromCart(book._id)}>Remove</button>
                                </div>
                              
                            </li>
                        ))}
                    </ul>
        </div>
    )
}