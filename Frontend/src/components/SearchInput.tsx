import { useState } from 'react';
import { SearchInputProps } from '../interfaces/SearchInputProps';
import { useNavigate } from 'react-router-dom';

export default function SearchInput({ searchIn, navigateTo }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); 

  const handleSearch = () => {
    const regex = new RegExp(searchQuery, 'i');

    
    const results = searchIn.filter(book => 
      regex.test(book.title) || 
      regex.test(book.author) || 
      regex.test(book.genre)
    );

    if (results.length > 0) {
      //setSearchQuery('');
      navigate(navigateTo, { state: { books: results } });
    } else {
     
       alert('No books matches your description. Try again!'); 
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(); 
    }
  };

  return (
    <div className="books-input-container">
      <input
        type="text"
        className="books-input"
        placeholder="Find a book..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
        onKeyDown={handleKeyDown}  
        aria-label="Search books" // Accessibility improvement
      />
      <button onClick={handleSearch} aria-label="Search">Search</button> 
    </div>
  );
}
