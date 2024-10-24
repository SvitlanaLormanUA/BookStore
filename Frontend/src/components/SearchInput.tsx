import { useState } from 'react';
import { SearchInputProps } from '../interfaces/SearchInputProps';
import { useNavigate } from 'react-router-dom';

export default function SearchInput({ searchIn }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); 

  const handleSearch = () => {
    const regex = new RegExp(searchQuery, 'i');

    // Filter the array of books based on the search query
    const results = searchIn.filter(book => 
      regex.test(book.title) || 
      regex.test(book.author) || 
      regex.test(book.genre)
    );

    if (results.length > 0) {
      navigate('/books', { state: { books: results } });
    } else {
      // Optional: Uncomment to alert user when no books found
      // alert('No books found'); 
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
