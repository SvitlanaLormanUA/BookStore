import books from '../books.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function Filters() {

    const genres: string[] = getBooksGenres();
    
    function getBooksGenres() {
        const genres: string[] = books.map(book => book.genre);
        let uniqueGenres = genres.filter((value, index) => genres.indexOf(value) === index);
        uniqueGenres = uniqueGenres.map(genre => 
            genre.split(' ')
                 .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                 .join(' ')
        );
        return uniqueGenres;
    }
    
    function createGenresComponent() {
        return genres.map((genre) => <option key={genre} value={genre}>{genre}</option>);
    }

    return (
        <>
            <div className="filters-genres-container"> 
                <select className="form-select" aria-label="Select Genre">
                    <option value="">Select a genre</option> {/* Optional placeholder */}
                    {createGenresComponent()}
                </select>
            </div>
        </>
    );
}
