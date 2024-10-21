import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import books from '../books.js';
import { Book } from '../type/Book.js';

export default function Filters() {
    const genres = getBooksGenres();
    const [selectedGenre, setSelectedGenre] = useState('Select a genre');
    const [onSale, setOnSale] = useState(false);
    const [popular, setPopular] = useState(false);
    const navigate = useNavigate();

    function getBooksGenres() {
        const genres = books.map(book => book.genre);
        let uniqueGenres = genres.filter((value, index) => genres.indexOf(value) === index);
        uniqueGenres = uniqueGenres.map(genre =>
            genre.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')
        );
        return uniqueGenres;
    }

    function filterBooksByGenre() {
        let filteredBooks: Book[] = books.filter(book => book.genre === selectedGenre);

        if (onSale) {
            filteredBooks = filteredBooks.filter(book => book.isForSale);
        }

        if (popular) {
            filteredBooks = filteredBooks.filter(book => book.popular);
        }

        navigate(`/books`, { state: { books: filteredBooks } });
    }

    function handleGenreClick(genre: string) {
        setSelectedGenre(genre);
        filterBooksByGenre();
    }

    function handleOnSaleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setOnSale(event.target.checked);
    }

    function handlePopularChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPopular(event.target.checked);
    }

    function createGenresComponent() {
        return genres.map((genre) => (
            <li key={genre} className='filters-genres-item' onClick={() => handleGenreClick(genre)}>
                {genre}
            </li>
        ));
    }

    return (
    <>
    <div className="filters-container">
      
        <div className="genres-navigation">
            <ul className="filters-genres-dropdown">
                <li className='filters-genres-trigger'>
                    {selectedGenre} <span className="arrow-down"></span>
                    <ul className="filters-genres-options">
                        {createGenresComponent()}
                    </ul>
                </li>
            </ul>
        </div>

            {/* Checkboxes for On Sale and Popular filters */}
          <div className="filters-checkbox-container">
            <div className="onSale-checkbox">
                    <input
                        type="checkbox"
                        checked={onSale}
                        onChange={handleOnSaleChange}
                         name='onSale-checkbox-input'
                    />
                  
                    <label htmlFor="onSale-checkbox-input">
                    On Sale
                     </label>
                </div>
            <div className="popular-checkbox">
                                <input
                                    type="checkbox"
                                    checked={popular}
                                    onChange={handlePopularChange}
                                    name='popular-checkbox-input'
                                />
                            <label htmlFor="popular-checkbox-input">
                                 Popular
                            </label>

            
            </div>
            </div>  
            </div>
            <button onClick={filterBooksByGenre} className="apply-filters-btn">Apply Filters</button>
            
            </>
    );
}
