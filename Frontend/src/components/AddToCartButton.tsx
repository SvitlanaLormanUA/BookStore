import { FaCheck } from "react-icons/fa";
import { useBooksInCart } from "../context/BooksInCartContext";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom"; 
import { Book } from "../interfaces/Book";

export default function AddToCartButton({ book }: { book: Book }) {
  const { toggleBookInCart, isBookInCart } = useBooksInCart();
  const navigate = useNavigate(); // Для навігації

  const inCart = isBookInCart(book);

  const handleClick = () => {
    toggleBookInCart(book); // Викликаємо toggleBookInCart для додавання або видалення книги
  };

  return (
    <>
      <Button
        id="buy-button"
        className={`w-100 ${inCart ? "bg-white text-success border-success" : "btn-danger"}`}
        onClick={handleClick}
        disabled={inCart} 
      >
        {inCart ? (
          <>
            <FaCheck /> In Cart
          </>
        ) : (
          "Add to Cart"
        )}
      </Button>
    </>
  );
}
