import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import books from '../books.js';
import { Book } from '../type/Book.js';

export default function Filters() {
    const genres = getBooksGenres();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]); 
    const [onSale, setOnSale] = useState(false);
    const [popular, setPopular] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Стан для бокового меню
    const navigate = useNavigate();

    // Отримуємо унікальні жанри
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

    // Фільтруємо книги за жанрами та додатковими фільтрами
    function filterBooksByGenre() {
        let filteredBooks: Book[] = books;

        if (selectedGenres.length > 0) {
            filteredBooks = filteredBooks.filter(book => selectedGenres.includes(book.genre));
        }

        if (onSale) {
            filteredBooks = filteredBooks.filter(book => book.isForSale);
        }

        if (popular) {
            filteredBooks = filteredBooks.filter(book => book.popular);
        }

        navigate(`/books`, { state: { books: filteredBooks } });
    }

    // Обробка зміни жанрів при виборі/знятті чекбоксів
    function handleGenreChange(genre: string) {
        setSelectedGenres(prevGenres => {
            if (prevGenres.includes(genre)) {
                return prevGenres.filter(g => g !== genre);
            } else {
                return [...prevGenres, genre];
            }
        });
    }

    // Обробка зміни чекбокса "On Sale"
    function handleOnSaleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setOnSale(event.target.checked);
    }

    // Обробка зміни чекбокса "Popular"
    function handlePopularChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPopular(event.target.checked);
    }

    // Автоматичне застосування фільтрів
    useEffect(() => {
        filterBooksByGenre();
    }, [selectedGenres, onSale, popular]);

    // Створюємо компоненти для жанрів із чекбоксами
    function createGenresComponent() {
        return genres.map((genre) => (
            <div key={genre} className="filters-genres-item">
                <input
                    type="checkbox"
                    id={genre}
                    value={genre}
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                    className='checkbox-input'
                />
                <label htmlFor={genre} className='checkbox-input-label'>{genre}</label>
            </div>
        ));
    }

    // Скидання всіх фільтрів
    function resetGenres() {
        setSelectedGenres([]);
        setOnSale(false);
        setPopular(false);
    }

    // Відкриття/закриття бокового меню
    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
    <>
    <div className="filters-container">
        {/* Фільтри для великих екранів */}
        <div className="computer-screen-filters">
            <div className="genres-navigation">
                <div className="label-and-reset-button-container">
                    <h3 className="genres-navigation-label">Filters</h3>
                    <button className='reset-filters-btn' onClick={resetGenres}>
                        Reset Filters
                    </button>
                </div>
                {/* Dropdown для жанрів */}
                <div className="filters-genres-dropdown">
                    <div className="dropdown-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
                         Genres  <span className="arrow-down">{dropdownOpen ? ' ↓' : ' ↑'}</span>
                    </div>
                    {dropdownOpen && (
                        <div className="dropdown-options">
                            {createGenresComponent()}
                        </div>
                    )}
                </div>
            </div>
            {/* Чекбокси для On Sale і Popular */}
            <div className="filters-checkbox-container">
                <div className="checkbox-container-sale-and-popular">
                    <input
                        type="checkbox"
                        checked={onSale}
                        onChange={handleOnSaleChange}
                        name='onSale-checkbox-input'
                        className='checkbox-input '
                    />
                    <label htmlFor="onSale-checkbox-input" className='checkbox-input-label'>On Sale</label>
                </div>
                <div className="checkbox-container-sale-and-popular">
                    <input
                        type="checkbox"
                        checked={popular}
                        onChange={handlePopularChange}
                        name='popular-checkbox-input'
                        className='checkbox-input '
                    />
                    <label htmlFor="popular-checkbox-input" className='checkbox-input-label'>Popular</label>
                </div>
            </div>  
        </div>

        {/* Кнопка для мобільних пристроїв */}
        <div className='mobile-filters'>
            <button className='filters-button' onClick={toggleSidebar}>
                Filters
            </button>

            {/* Бокове меню для мобільних пристроїв */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-content">
                    <div className="label-mobile-filters-cont">
                    <h3>Filters</h3>
                    <button className='close-sidebar' onClick={toggleSidebar}>✖</button>
                  
                    </div>
                    {createGenresComponent()}
                    <div className="filters-checkbox-container">
                        <div className="checkbox-container-sale-and-popular">
                            <input
                                type="checkbox"
                                checked={onSale}
                                onChange={handleOnSaleChange}
                                name='onSale-checkbox-input'
                                className='checkbox-input '
                            />
                            <label htmlFor="onSale-checkbox-input" className='checkbox-input-label'>On Sale</label>
                        </div>
                        <div className="checkbox-container-sale-and-popular">
                            <input
                                type="checkbox"
                                checked={popular}
                                onChange={handlePopularChange}
                                name='popular-checkbox-input'
                                className='checkbox-input '
                            />
                            <label htmlFor="popular-checkbox-input" className='checkbox-input-label'>Popular</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay для затемнення позаду бокового меню */}
            {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
        </div>
    </div>
    </>
    );
}
