import React, { useEffect, useState } from 'react';
import { Book } from '../interfaces/Book';
import { Purchase } from '../interfaces/Purchase';
import { FaRegCheckCircle } from 'react-icons/fa'; // імпорт іконки
import { FaCheckCircle } from 'react-icons/fa'; // імпорт заповненої галочки

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

                // Фільтруємо покупки, щоб показати тільки ті, що не були надіслані
                //const unsentPurchases = data.filter((purchase: Purchase) => !purchase.sent);
                setPurchases(data);
            } catch (error) {
                console.error('Error fetching purchased books:', error);
            }
        };

        fetchPurchasedBooks();
    }, []);

    const calculateTotalAmount = (books: Book[]) => {
        return books.reduce((total, book) => total + (book.price * book.amount), 0);
    };

    const handleCheckClick = async (index: number, purchaseId: string, currentSentStatus: boolean) => {
        try {
            // Відправляємо PATCH-запит на оновлення статусу
            const response = await fetch(`http://localhost:3000/purchase/${purchaseId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sent: !currentSentStatus }), // Оновлюємо поле sent на протилежне
            });

            if (!response.ok) {
                throw new Error('Failed to update purchase');
            }

            // Оновлюємо локальний стан
            setPurchases(prevPurchases => {
                const updatedPurchases = [...prevPurchases];
                updatedPurchases[index].sent = !currentSentStatus; // Перемикаємо статус на протилежний
                return updatedPurchases;
            });
        } catch (error) {
            console.error('Error updating purchase:', error);
        }
    };

    return (
        <div className='manage-books-container'>
            <h2 className='title'>Purchased Books</h2>
            {purchases.length > 0 ? (
                <table className="purchases-table table-container">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Order Date</th>
                            <th>Total Amount</th>
                            <th>Books</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((purchase, index) => (
                            <tr key={index} style={{ textDecoration: purchase.sent ? 'line-through' : 'none' }}>
                                <td>{purchase.buyer?.fullName || 'Unknown'}</td>
                                <td>{purchase.buyer?.email || 'Unknown'}</td>
                                <td>{purchase.buyer?.city || 'Unknown'}</td>
                                <td>{purchase.buyer?.country || 'Unknown'}</td>
                                <td>{new Date(purchase.purchaseDate).toLocaleDateString() || 'Unknown'}</td>
                                <td>{calculateTotalAmount(purchase.books).toFixed(2)} $</td>
                                <td>
                                    <ul>
                                        {purchase.books.map((book: Book) => (
                                            <li key={book._id}>
                                                {book.title} (x{book.amount})
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                  
                                    <span 
                                        onClick={() => handleCheckClick(index, purchase._id, purchase.sent)} // Передаємо id замовлення і статус
                                        className='check-icon-dashboard'
                                        style={{ color: purchase.sent ? 'green' : 'black' }} // Змінюємо колір іконки
                                    >
                                        {purchase.sent ? <FaCheckCircle /> : <FaRegCheckCircle />}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No purchases yet.</p>
            )}
        </div>
    );
}
