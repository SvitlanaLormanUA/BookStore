import { useState } from "react";

export default function UploadBook() {
    const [rating, setRating] = useState(0); // State to manage the selected rating

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        form.classList.add('was-validated');

        // Handle the form submission logic here
        console.log('Selected Rating:', rating); // Log the rating on submit
    };

    const handleStarClick = (index) => {
        setRating(index + 1); // Update the rating based on clicked star index
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
                        <input type="number" step="1" id="bookSale" placeholder="Sale" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="copiesInStock">Copies In Stock</label>
                        <input type="number" step="1" id="copiesInStock" placeholder="Copies in Stock" required />
                        <div className="invalid-feedback">Please provide a valid number</div>
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
                        <div className="star-rating">
                            {[...Array(5)].map((_, index) => (
                                <span
                                    key={index}
                                    className="star"
                                    role="img"
                                    aria-label="star"
                                    onClick={() => handleStarClick(index)}
                                    style={{ color: index < rating ? 'gold' : 'gray' }} // Change color based on rating
                                >
                                    {index < rating ? '⭐' : '☆'}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit">Upload Book</button>
            </form>
        </div>
    );
}
