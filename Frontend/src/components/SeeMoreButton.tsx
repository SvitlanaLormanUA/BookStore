import { useNavigate } from "react-router-dom";
import { SeeMoreButtonProps } from "../interfaces/SeeMoreButtonProps";

import { Book } from "../interfaces/Book.js";
import { useContext } from "react";
import { BooksContext } from "../context/BooksContext.js";

export default function SeeMoreButton({ forLink }: SeeMoreButtonProps) {
    
    const books = useContext(BooksContext); // Access the context
    let results ;
    // Фільтруємо книги на основі властивості forLink
    if(forLink==='sale') {
        results = books.filter(book => 
            book.sale > 0
        );

    } else {
     results = books.filter(book => 
        book[forLink as keyof Book] === true  
    );
}

    const navigate = useNavigate();

    const goToOtherBookPage = () => {
       // console.log(forLink);
        //console.log(results);
        navigate(`/books`, { state: { books: results } });
    };

    return (
        <div className="see-more-button-container">
            <button className="see-more-button" onClick={goToOtherBookPage}>See More</button>
        </div>
    );
}
