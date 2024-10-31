import { useLocation, useNavigate } from "react-router-dom";
import { useBooksInCart } from "../context/BooksInCartContext";
import AmountOfFoundBooks from "./AmountOfFoundBooks";
import { Book } from "../type/Book";
import SearchInput from "./SearchInput";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contects/AuthProvider";

export default function BooksCart() {
    const { user } = useContext(AuthContext);


    const [showPurchaseForm, setShowPurchaseForm] = useState(false);
    const { booksInCart, removeBookFromCart, purchaseBooks } = useBooksInCart();
    const [sortedBooks, setSortedBooks] = useState<Book[]>(booksInCart);
    const location = useLocation();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [isAscending, setIsAscending] = useState(true);
    const [totalBooks, setTotalBooks] = useState(booksInCart.length);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalSaleAmount, setTotalSaleAmount] = useState(0);

    // Track book amounts using a map of book IDs to amounts
    const [bookAmounts, setBookAmounts] = useState<{ [id: string]: number }>(() =>
        booksInCart.reduce((acc, book) => {
            acc[book._id] = 1; // Set default amount to 1 htmlFor each book
            return acc;
        }, {} as { [id: string]: number })
    );

    function calculateSalePrice(price: number, sale: number) {
        return price - (price * sale) / 100;
    }



    function handlePurchase() {
        event.preventDefault();
        const fullName = (document.getElementById("fullName") as HTMLInputElement).value;
        const country = (document.getElementById("country") as HTMLInputElement).value;
        const city = (document.getElementById("city") as HTMLInputElement).value;
        const branchNumber = (document.getElementById("branchNumber") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
    
   
        purchaseBooks(booksInCart, bookAmounts, fullName, country, city, branchNumber, email, Number(totalSaleAmount.toFixed(2)));
        setShowPurchaseForm(false);
       // console.log({ fullName, country, city, branchNumber });
    }
    
    function handleBuy() {
        if (totalSaleAmount == 0 || totalAmount == 0) {
            alert("Your cart is empty");
            return;
        }
            setShowPurchaseForm(true);
    }
    useEffect(() => {
        if (location.state?.books) {
            setSortedBooks(location.state.books);
        } else {
            setSortedBooks(booksInCart);
        }
    }, [location.state, booksInCart]);
    useEffect(() => {
        const totalBooksCount = Object.values(bookAmounts).reduce((sum, amount) => sum + amount, 0);
        setTotalBooks(totalBooksCount);
    
        const totalWithoutDiscount = sortedBooks.reduce((sum, book) => {
            return sum + (book.price * (bookAmounts[book._id] || 1));
        }, 0);
    
        const totalWithDiscount = sortedBooks.reduce((sum, book) => {
            const salePrice = book.sale > 0 ? calculateSalePrice(book.price, book.sale) : book.price;
            return sum + (salePrice * (bookAmounts[book._id] || 1));
        }, 0);
    
        setTotalAmount(totalWithoutDiscount);
        setTotalSaleAmount(totalWithDiscount);
    }, [bookAmounts, sortedBooks]);
    
    const filteredBooks = sortedBooks.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSort = () => {
        const sorted = [...sortedBooks].sort((a, b) => {
            return isAscending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        });
        setSortedBooks(sorted);
        setIsAscending(!isAscending);
    };
    const handleRemoveBook = (bookId: string) => {
        removeBookFromCart(bookId);
        setBookAmounts((prevAmounts) => {
            const { [bookId]: removed, ...newAmounts } = prevAmounts; // Create a new object without the removed book
            return newAmounts; // Return the new amounts object
        });
    };

    const handleChange = (action: string, bookId: string) => {
        setBookAmounts((prevAmounts) => {
            const newAmounts = { ...prevAmounts };
            if (action === "increase") {
                newAmounts[bookId] += 1;
            } else if (action === "decrease") {
                if (newAmounts[bookId] > 1) {
                    newAmounts[bookId] -= 1;
                } else {
                    handleRemoveBook(bookId); // Remove book and update amounts
                    return newAmounts; // Return updated amounts
                }
            }
            return newAmounts;
        });
    };

    return (
        <>
        <div className="favouritePage-container">
            <div className="books-in-cart-cont">
                <div className="input-fav-container">
                    <SearchInput 
                        searchIn={booksInCart}  
                        navigateTo="/cart"
                    />
                </div>
                <div className="finally-order">
                        <div className="total-books">
                                {/*} <p>У кошику: {totalBooks}</p>*/}
                                <p>In total: </p>
                                <div className="price-book-cart">
                                    <p className={totalSaleAmount > 0 ? 'price-book-cart crossed' : 'book-price'}>{totalAmount.toFixed(2)} $</p>
                                    {totalSaleAmount > 0 ? (
                                        <p className="book-sale-price" id="book-item-price-red">{totalSaleAmount.toFixed(2)} $</p>)
                                    : null}
                                </div>
                            </div>
                            <button className="order-btn" onClick={handleBuy}>Buy</button>
        </div>
                <div className="booksInCart-container">
                    {filteredBooks.length === 0 && searchTerm ? (
                        <div className="no-results-message">
                            <p>Oops, you don't have this book. Would you like to browse all books in the bookstore?</p>
                            <button onClick={() => navigate('/bookstore')}>
                                Browse Bookstore
                            </button>
                        </div>
                    ) : filteredBooks.length === 0 ? (
                        <p className="smth-empty">Your cart is empty</p>
                    ) : (
                        <>
                            <div className="cart-btn-sort">
                                <button onClick={handleSort} className="sort-button">
                                    Sort By {isAscending ? '↓' : '↑'}
                                </button>
                            </div>
                            <ul className="liked-books-list">
                                {filteredBooks.map((book: Book) => (
                                    <li key={book._id} className="liked-book-item">
                                        <img 
                                            src={book.img} 
                                            alt="Book Cover" 
                                            onClick={() => navigate(`/book/${book._id}`, { state: book })} 
                                        />
                                        <div className="text-info-liked-book">
                                            <p>{book.title}</p>
                                            <p>{book.author}</p>
                                            <div className="stars">
                                                {Array.from({ length: Math.floor(book.stars) }, (_, i) => (
                                                    <span key={i}>⭐️</span>
                                                ))}
                                                <p>{book.stars}</p>
                                            </div>
                                            <div className="amount-and-price">
                                            <div className="this-book-amount">
                                                <button className="decrease" onClick={() => handleChange("decrease", book._id)}>-</button>
                                                <p className="this-book-in-cart">{bookAmounts[book._id]}</p>
                                                <button className="increase" onClick={() => handleChange("increase", book._id)}>+</button>
                                            </div>

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
                                            </div>
                                        </div>
                                 
                                        <p 
                                            className="remove-book-btn" 
                                            onClick={() => handleRemoveBook(book._id)} 
                                            aria-label="Remove from favourites"
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
        </div>
      
        {showPurchaseForm && (
    <div className="popup-overlay">
        <form onSubmit={(e) => { e.preventDefault(); handlePurchase(); }} className="overlay-form">
            <p className="close-button" onClick={() => setShowPurchaseForm(false)}>✖️</p> 
            <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="fullName" 
                    placeholder="Enter your full name" 
                    required 
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="Enter your email" 
                    required 
                />
            </div>
            <div className="form-group">
                <label htmlFor="country">Country</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="country" 
                    placeholder="Enter your country" 
                    required 
                />
            </div>
            <div className="form-group">
                <label htmlFor="city">City</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="city" 
                    placeholder="Enter the city you live in" 
                    required 
                />
            </div>
            <div className="form-group">
                <label htmlFor="branchNumber">Post</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="branchNumber" 
                    placeholder="Post number" 
                    required 
                />
            </div>
            <button type="submit" className="btn btn-primary">Purchase</button>
        </form>
    </div>
)}


       

        </>
    );
}
