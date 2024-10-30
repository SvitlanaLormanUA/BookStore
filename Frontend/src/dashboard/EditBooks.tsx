import { useLoaderData, useParams } from "react-router-dom";
import { BookForPosting } from "../interfaces/BookForPosting";
import { useState } from "react";

const EditBooks = () => {
  const { id } = useParams();
  const bookData = useLoaderData() as BookForPosting; // Assuming loader fetches a single book
  const { title, author, year, genre, description, img, copiesInStock, price, sale, publisher, language, stars } = bookData || {}; // fallback if data not loaded
  const [rating, setRating] = useState(stars || 0); // Default to loaded star rating

  const getFormData = (): BookForPosting => {
    const bookTitle = (document.getElementById('bookTitle') as HTMLInputElement).value;
    const authorName = (document.getElementById('authorName') as HTMLInputElement).value;
    const year = Number((document.getElementById('year') as HTMLInputElement).value);
    const genre = (document.getElementById('genre') as HTMLInputElement).value;
    const price = Number((document.getElementById('price') as HTMLInputElement).value);
    const img = (document.getElementById('img') as HTMLInputElement).value;
    const sale = Number((document.getElementById('bookSale') as HTMLInputElement).value);
    const copiesInStock = Number((document.getElementById('copiesInStock') as HTMLInputElement).value);
    const description = (document.getElementById('description') as HTMLTextAreaElement).value;
    const publisher = (document.getElementById('publisher') as HTMLInputElement).value;
    const language = (document.getElementById('language') as HTMLInputElement).value;
    const localDate = new Date().getFullYear();

    const bookData: BookForPosting = {
      title: bookTitle,
      author: authorName,
      year: year,
      genre: genre,
      price: price,
      img: img,
      sale: sale,
      copiesInStock: copiesInStock,
      description: description,
      publisher: publisher,
      language: language,
      popular: false,
      soldCopies: 0,
      isForSale: sale > 0,
      new: year === new Date().getFullYear(),
      stars: rating,
      dateAdded: localDate,
    };

    return bookData;
  };

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedBookData = getFormData();
    fetch(`http://localhost:3000/book/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBookData),
    }).then((response) => {
      if (response.ok) {
        alert('Book updated successfully');
      } else {
        alert('An error occurred while updating the book');
      }
    });
  };

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <div className='container'>
      <h2 className="title">Update the Book Data</h2>
      <form className="custom-form" noValidate onSubmit={handleUpdate}>
        {/* First Row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="bookTitle">Book Title</label>
            <input type="text" id="bookTitle" defaultValue={title} required />
            <div className="invalid-feedback">Please provide a book title.</div>
          </div>
          <div className="form-group">
            <label htmlFor="authorName">Author Name</label>
            <input type="text" id="authorName" defaultValue={author} required />
            <div className="invalid-feedback">Please provide an author name.</div>
          </div>
        </div>

        {/* Second Row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="year">Publication Year</label>
            <input type="number" id="year" defaultValue={year} required />
            <div className="invalid-feedback">Please provide a publication year.</div>
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input type="text" id="genre" defaultValue={genre} required />
            <div className="invalid-feedback">Please provide a genre.</div>
          </div>
        </div>

        {/* Third Row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input type="number" step="0.01" id="price" defaultValue={price} required />
            <div className="invalid-feedback">Please provide a price.</div>
          </div>
          <div className="form-group">
            <label htmlFor="img">Image URL</label>
            <input type="url" id="img" defaultValue={img} required />
            <div className="invalid-feedback">Please provide a valid image URL.</div>
          </div>
        </div>

        {/* Fourth Row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="bookSale">Sale ($)</label>
            <input type="number" step="1" id="bookSale" defaultValue={sale} min="0" required />
            <div className="invalid-feedback">Sale must be at least 1.</div>
          </div>
          <div className="form-group">
            <label htmlFor="copiesInStock">Copies In Stock</label>
            <input type="number" step="1" id="copiesInStock" defaultValue={copiesInStock} min="0" required />
          </div>
        </div>

        {/* Publisher and Language */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="publisher">Publisher</label>
            <input type="text" id="publisher" defaultValue={publisher} required />
            <div className="invalid-feedback">Please provide a publisher.</div>
          </div>
          <div className="form-group">
            <label htmlFor="language">Language</label>
            <input type="text" id="language" defaultValue={language} required />
            <div className="invalid-feedback">Please provide a language.</div>
          </div>
        </div>

        {/* Description */}
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="description">Description</label>
            <textarea id="description" defaultValue={description} required></textarea>
            <div className="invalid-feedback">Please provide a description.</div>
          </div>
        </div>

        {/* Star Rating */}
        <div className="form-row">
          <div className="form-group">
            <label>Rating:</label>
            <div className="star-rating" role="radiogroup" aria-label="Book rating">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className="star"
                  role="radio"
                  aria-checked={index < rating}
                  tabIndex={0}
                  aria-label={`${index + 1} star`}
                  onClick={() => handleStarClick(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleStarClick(index);
                  }}
                  style={{ color: index < rating ? 'gold' : 'gray' }}
                >
                  {index < rating ? '⭐' : '☆'}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="upload-book-btn">Update Book</button>
      </form>
    </div>
  );
};

export default EditBooks;
