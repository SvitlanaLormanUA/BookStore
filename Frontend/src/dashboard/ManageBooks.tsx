import { useEffect, useState } from "react";
import { Book } from "../interfaces/Book";
import '../styles/mediaQueries.css';

export default function ManageBooks() {
    const [allBooks, setAllBooks] = useState<Book[]>([]);
    useEffect(() => {
        // Fetch books from the server when the component mounts
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:3000/books');
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const books = await response.json();
                // Sort books by title before setting state
                const sortedBooks = books.sort((a: Book, b: Book) => a.title.localeCompare(b.title));
                setAllBooks(sortedBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

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
