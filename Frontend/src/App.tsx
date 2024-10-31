import {  RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Book } from './interfaces/Book';
import { BooksContext } from './context/BooksContext';
import { LikedBooksProvider } from './context/LikedBooksContext';
import { BooksInCartContextProvider } from './context/BooksInCartContext';
import { AuthProvider } from './contects/AuthProvider';
import router from './Router';


function App() {
    const [arrangedBooks, setArrangedBooks] = useState<Book[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/books")
          .then((response) => response.json())
          .then((data) => {
             setArrangedBooks(arrangeBooks(data));
          });
    }, []);

    function arrangeBooks(books: Book[]): Book[] {
        const bookMap: { [key: string]: number } = {};
    
        const detectLanguage = (title: string): string => {
          const cyrillicRegex = /[а-яА-ЯіІїЇєЄґҐ]/;
          if (cyrillicRegex.test(title)) {
            const crimeanTatarRegex = /[қğışүңә]/;
            return crimeanTatarRegex.test(title) ? "Crimean Tatar" : "Ukrainian";
          }
    
          const latinRegex = /[a-zA-Z]/;
          if (latinRegex.test(title)) {
            const frenchRegex = /[éèêëàâçù]/;
            const germanRegex = /[äöüß]/;
            const chineseRegex = /[\u4e00-\u9fa5]/;
            const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u31F0-\u31FF\u4E00-\u9FFF]/;
    
            if (chineseRegex.test(title)) return "Chinese";
            if (japaneseRegex.test(title)) return "Japanese";
            if (frenchRegex.test(title)) return "French";
            if (germanRegex.test(title)) return "German";
            return "English";
          }
    
          return "Unknown";
        };
    
        // Create a new array to hold unique books
        const uniqueBooks: Book[] = [];
    
        for (let i = 0; i < books.length; i++) {
            const book = books[i];
    
            book.soldCopies = Math.abs(book.soldCopies);
            book.copiesInStock = Math.abs(book.copiesInStock);
            book.price = Math.abs(book.price);
            book.year = Math.abs(book.year);
            book.stars = Math.min(Math.abs(book.stars), 5);
    
            if (!book.language) {
                book.language = detectLanguage(book.title);
            }
    
            const bookKey = `${book.title}|${book.author}|${book.publisher}`;
    
            if (bookMap[bookKey] !== undefined) {
                // If the book exists, increase stock count
                uniqueBooks[bookMap[bookKey]].copiesInStock += book.copiesInStock;
            } else {
                // Otherwise, add to the unique books and update the map
                bookMap[bookKey] = uniqueBooks.length;
                uniqueBooks.push(book);
            }
        }
    
        return uniqueBooks.sort((a, b) => a.title.localeCompare(b.title));
    }

    return (
        <BooksInCartContextProvider>
        <LikedBooksProvider>
        <BooksContext.Provider value={arrangedBooks}>
            <AuthProvider>
                 <RouterProvider router={router} />
          </AuthProvider>
        </BooksContext.Provider>
        </LikedBooksProvider>
        </BooksInCartContextProvider>
    );
}



export default App;
