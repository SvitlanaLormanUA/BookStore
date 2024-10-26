
import { BookItemProps } from "../interfaces/BookItemProps";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

export default function BookItem({ book, placeDiscountIcon }: BookItemProps) {
  const navigate = useNavigate();

  function handleClick() {
 
    navigate(`/book/${book._id}`, { state: book });
    console.log(book);

  }

  function calculateSalePrice(price: number, sale: number) {
    return price - (price * sale) / 100;
  }
  
  return (
    <div className="book-item">
      {book.sale > 0 && placeDiscountIcon ? (
        <div className="dicount-icon-container">
          <span className="dicount-icon"> - {book.sale}%</span>
        </div>
      ) : null}
      
      <img src={book.img} alt={book.title} onClick={handleClick} />
      <h3>{book.title}</h3>
      <p className="book-item-author">{book.author}</p>

      <div className="book-item-buy-container">
        {book.sale > 0 ? (
          <div className="book-item-price-container">
            <p className="crossed" id="book-item-price">
              {book.price} $
            </p>
            <p id="book-item-price-red">
              {calculateSalePrice(book.price, book.sale).toFixed(2)} $
            </p>
          </div>
        ) : (
          <p className="ordinary" id="book-item-price">
            {book.price} $
          </p>
        )}
       
        <div>
          <AddToCartButton book={book}/>
        </div>
      </div>
    </div>
  );
}
