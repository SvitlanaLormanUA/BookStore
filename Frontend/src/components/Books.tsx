
import { useLocation } from 'react-router-dom';
import BookItem from './BookItem';

export default function Books() {
  
    const location = useLocation();
    const books = location.state?.books || [];

    return (
        <div className='books-page'>
           
            {books.length > 0 ? (
               <div className="book-list">
                    {books.map((book, index) => (
                        <BookItem book={book} />
                    ))}
                </div>
            ) : (
                <p>No books available.</p>
            )}
        </div>
    );
}
