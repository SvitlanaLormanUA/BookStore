import { useEffect, useState, useContext } from "react";
import { Book } from "../interfaces/Book";
import { Link } from "react-router-dom";
import '../styles/mediaQueries.css';
import { BooksContext } from "../context/BooksContext";

export default function ManageBooks() {
    const [allBooks, setAllBooks] = useState<Book[]>([]);
    const booksContext = useContext(BooksContext);
    useEffect(() => {
        setAllBooks(booksContext);
    }, [booksContext]);

    const handleDelete = (id: string | number) => {
        fetch(`http://localhost:3000/book/${id}`, {
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
            window.location.reload();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
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
                                <td className="manage-books-btn">
                                    <Link to={`/admin/dashboard/edit-book/${book._id}`} className="edit-link">Edit</Link>
                                    <button className="btn btn-danger" onClick={() => handleDelete(book._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
