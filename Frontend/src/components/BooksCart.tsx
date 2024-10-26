import { useBooksInCart } from "../context/BooksInCartContext";

export default function BooksCart() {
    const { booksInCart, removeBookFromCart } = useBooksInCart(); 
    return (
        <div>
            <h1>Books in Cart</h1>
            <ul>
                {booksInCart.map(book => (
                    <li key={book._id}>
                        {book.title} <button onClick={() => removeBookFromCart(book._id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}