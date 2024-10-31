import React, { useEffect, useState } from 'react';
import { Book } from '../interfaces/Book';

interface Purchase {
    buyer: {
        fullName: string;
        email: string;
        country: string;
        city: string;
        branchNumber: string;
    };
    books: Book[];
}

export default function Dashboard() {
    const [purchases, setPurchases] = useState<Purchase[]>([]);

    useEffect(() => {
        const fetchPurchasedBooks = async () => {
            try {
                const response = await fetch('http://localhost:3000/purchases');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                
                const data = await response.json();
                console.log("Fetched data:", data);

                // Зберігаємо всі покупки в state
                setPurchases(data);
            } catch (error) {
                console.error('Error fetching purchased books:', error);
            }
        };

        fetchPurchasedBooks();
    }, []);

    return (
        <div>
            <h2>Purchased Books</h2>
            {purchases.length > 0 ? (
                purchases.map((purchase, index) => (
                    <div key={index}>
                        <h3>Buyer Information</h3>
                        <p>Full Name: {purchase.buyer?.fullName || 'Unknown'}</p>
                        <p>Email: {purchase.buyer?.email || 'Unknown'}</p>
                        <p>Country: {purchase.buyer?.country || 'Unknown'}</p>
                        <p>City: {purchase.buyer?.city || 'Unknown'}</p>
                        <p>Post: {purchase.buyer?.branchNumber || 'Unknown'}</p>

                        <h4>Books:</h4>
                        {purchase.books && purchase.books.length > 0 ? (
                            purchase.books.map((book: any) => (
                                <div key={book._id}>
                                    <h5>{book.title}</h5>
                                    <p>Author: {book.author}</p>
                                    <p>Amount: {book.amount}</p>
                                </div>
                            ))
                        ) : (
                            <p>No books purchased.</p>
                        )}
                    </div>
                ))
            ) : (
                <p>No purchases yet.</p>
            )}
        </div>
    );
}
