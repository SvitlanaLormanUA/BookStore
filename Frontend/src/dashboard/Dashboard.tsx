import React, { useEffect, useState } from 'react';
import { useBooksInCart } from '../context/BooksInCartContext';
import { Book } from '../interfaces/Book';
export default function Dashboard() {


    const [purchasedBooks, setPurchasedBooks] = useState<Book[]>([]);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [post, setPost] = useState('');

    useEffect(() => {
        const storedBooks = localStorage.getItem('purchasedBooks');
        if (storedBooks) {
            const parsedBooks = JSON.parse(storedBooks);

            setPost(parsedBooks.buyerInfo.post);
            setCity(parsedBooks.buyerInfo.city);
            setCountry(parsedBooks.buyerInfo.country);
            setEmail(parsedBooks.buyerInfo.email);
            setFullName(parsedBooks.buyerInfo.fullName);
            setPurchasedBooks(parsedBooks.books); // Припускаючи, що books - це масив
        }
    }, []);

    return (
        <div>
            
            <h2>Purchased Books</h2>
           <p>{fullName}</p> 
              <p>{email}</p>
                <p>{country}</p>
                    <p>{city}</p>
                        <p>{post}</p>

            {purchasedBooks.length > 0 ? (
                purchasedBooks.map((book) => (
                    <div key={book._id}>
                        <h1>{book.title}</h1>
                        <p>{book.author}</p>
                    </div>
                ))
            ) : (
                <p>No purchased books available.</p>
            )}
        </div>
    );
}
