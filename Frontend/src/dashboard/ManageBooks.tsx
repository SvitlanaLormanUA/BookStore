import { useEffect, useState, useContext } from 'react';
import { Book } from '../interfaces/Book';
import { Link } from 'react-router-dom';
import '../styles/mediaQueries.css';
import { BooksContext } from '../context/BooksContext';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Import icons

export default function ManageBooks() {
    const [allBooks, setAllBooks] = useState<Book[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [bookToDelete, setBookToDelete] = useState<string | null>(null);
    const booksContext = useContext(BooksContext);

    useEffect(() => {
        setAllBooks(booksContext);
    }, [booksContext]);

    const handleOpenPopup = (id: string) => {
        setBookToDelete(id);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setBookToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (bookToDelete) {
            fetch(`http://localhost:3000/book/${bookToDelete}`, {
                method: 'DELETE',
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    handleClosePopup();
                    window.location.reload();
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                    handleClosePopup();
                });
        }
    };

    return (
        <div className="manage-books-container">
            <h2 className="title">Manage Books</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Book Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBooks.map((book: Book, index: number) => (
                            <tr key={book._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>{book.price}</td>
                                <td className="book-description">{book.description.slice(0, 50)}{book.description.length > 50 ? '...' : ''}</td>
                                <td className="manage-books-btn">
                                    <Link to={`/admin/dashboard/edit-book/${book._id}`} className="edit-link" title="Edit">
                                        <FaEdit />
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => handleOpenPopup(book._id)} title="Delete">
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Popup */}
            {showPopup && (
                <div className="popup-overlay" onClick={handleClosePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Are you sure you want to delete this book?</h3>
                        <div className="popup-buttons">
                            <button onClick={handleConfirmDelete} className="btn btn-primary">Yes</button>
                            <button onClick={handleClosePopup} className="btn btn-danger">No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
