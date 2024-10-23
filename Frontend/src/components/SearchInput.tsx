import{ useState } from 'react';
import { SearchInputProps } from '../interfaces/SearchInputProps';
import { useNavigate } from 'react-router-dom';


export default function SearchInput({ searchIn }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); 

  const handleSearch = () => {
   
    const regex = new RegExp(searchQuery, 'i');

    // Фільтруємо масив книг за введеним запитом
    const results = searchIn.filter(book => 
      regex.test(book.title) || 
      regex.test(book.author) || 
      regex.test(book.genre)
    );

    if (results.length > 0) {
      navigate('/books', { state: { books: results } });
   
     //alert(' found'); 
    } /*else {
      alert('No books found'); 
    }*/
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(); 
      
    }
  };


  return (
    <>
      <div className="books-input-container">
        <input
          type="text"
          className="books-input"
          placeholder="Find a book..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Оновлюємо стан при введенні
          onKeyDown={handleKeyDown}  
        />
        <button onClick={handleSearch}>Search</button> 
      </div>
    </>
  );
}
