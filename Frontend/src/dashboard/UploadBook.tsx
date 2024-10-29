import { useState } from "react";
import { BookForPosting } from "../interfaces/BookForPosting";

export default function UploadBook() {
    const [rating, setRating] = useState(0);

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
        const dateAdded: Date = new Date();

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
            new: (new Date().getFullYear() - dateAdded.getFullYear()) < 30,
            stars: rating,
            dateAdded: dateAdded // Додано дату
        };

        return bookData;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const bookData = getFormData();

            // Перевірка на існування книги перед додаванням
            fetch(`http://localhost:3000/check-book?title=${bookData.title}&author=${bookData.author}`)
            .then(res => res.json())
            .then(existingBook => {
                if (existingBook) {
                    // Якщо книга вже існує, вивести повідомлення
                    alert('This book already exists in the database.');
                } else {
                    // Якщо книга не існує, додати її в базу
                    fetch('http://localhost:3000/upload-book', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(bookData)
                    })
                    .then(res => res.json())
                    .then(data => {
                        alert('Book uploaded successfully');
                    })
                    .catch(error => {
                        console.error('Error uploading book:', error);
                    });
                }
            })
            .catch(error => {
                console.error('Error checking book existence:', error);
            });
        }
    };

    const handleStarClick = (index: number) => {
        setRating(index + 1);
    };

    return (
        <div className='container'>
            <h2 className="title">Upload a Book</h2>
            <form className="custom-form" noValidate onSubmit={handleSubmit}>
                {/* First Row */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="bookTitle">Book Title</label>
                        <input type="text" id="bookTitle" placeholder="Book Title" required />
                        <div className="invalid-feedback">Please provide a book title.</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="authorName">Author Name</label>
                        <input type="text" id="authorName" placeholder="Author Name" required />
                        <div className="invalid-feedback">Please provide an author name.</div>
                    </div>
                </div>

                {/* Second Row */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="year">Publication Year</label>
                        <input type="number" id="year" placeholder="Year" required />
                        <div className="invalid-feedback">Please provide a publication year.</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="genre">Genre</label>
                        <input type="text" id="genre" placeholder="Genre" required />
                        <div className="invalid-feedback">Please provide a genre.</div>
                    </div>
                </div>

                {/* Third Row */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="price">Price ($)</label>
                        <input type="number" step="0.01" id="price" placeholder="Price" required />
                        <div className="invalid-feedback">Please provide a price.</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="img">Image URL</label>
                        <input type="url" id="img" placeholder="Image URL" required />
                        <div className="invalid-feedback">Please provide a valid image URL.</div>
                    </div>
                </div>

               {/* Fourth Row */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="bookSale">Sale ($)</label>
                        <input type="number" step="1" id="bookSale" placeholder="Sale" min="0" required />
                        <div className="invalid-feedback">Sale must be at least 1.</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="copiesInStock">Copies In Stock</label>
                        <input type="number" step="1" id="copiesInStock" placeholder="Copies in Stock" min="0" required />
                    </div>
                </div>

                {/* Publisher and Language */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="publisher">Publisher</label>
                        <input type="text" id="publisher" placeholder="Publisher" required />
                        <div className="invalid-feedback">Please provide a publisher.</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="language">Language</label>
                        <input type="text" id="language" placeholder="Language" required />
                        <div className="invalid-feedback">Please provide a language.</div>
                    </div>
                </div>

                {/* Description */}
                <div className="form-row">
                    <div className="form-group full-width">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" placeholder="Book Description" required></textarea>
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
                <button type="submit" className="upload-book-btn">Upload Book</button>
            </form>
        </div>
    );
}
