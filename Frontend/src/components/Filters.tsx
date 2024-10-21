import books from '../books.js';

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
        return genres.map((genre) => <div key={genre} className="fiters-genre-unit">{genre}</div>);
    }

    return (
        <>
             <div className="filters-genres-container"> 
                {createGenresComponent()}
             </div>
        </>
    );
}
