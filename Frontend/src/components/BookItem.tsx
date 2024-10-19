import Button from "react-bootstrap/esm/Button";
import { BookItemProps } from "../interfaces/BookItemProps";

export default function BookItem({ book, placeDiscountIcon }: BookItemProps) {
    function calculateSalePrice(price: number, sale: number) {
        return price - (price * sale) / 100;
      }
      
    return (
        <>
            <div className="book-item">
                  {book.sale > 0 && placeDiscountIcon ? (
                    <div className="dicount-icon-container">
                      <span className="dicount-icon"> - {book.sale}%</span>
                    </div>
                  ) : null}
                  
                  <img src={book.img} alt={book.title} />
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
                      <Button id="buy-button" className="btn btn-danger w-100">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
        </>
    );
}