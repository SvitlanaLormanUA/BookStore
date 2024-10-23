import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage';
import Header from './components/Header';
import NotFound from './components/NotFound';
import './styles/mediaQueries.css'
import Footer from './components/Footer';
import GenrePage from './components/GenrePage';
import Books from './components/Books';
import { useEffect, useState } from 'react';
import { Book } from './type/Book';
import { BooksContext } from './components/BooksContext';
import  DashboardLayout  from './dashboard/DashboardLayout';
import Dashboard from './dashboard/Dashboard';
import  UploadBook  from './dashboard/UploadBook';
import  ManageBooks  from './dashboard/ManageBooks';
import  EditBooks from './dashboard/ManageBooks';



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
        <BooksContext.Provider value={arrangedBooks}>
            <RouterProvider router={router} />
        </BooksContext.Provider>
    );
}

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <Header />
                <Footer />
            </>
        ),
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <MainPage />,
                errorElement: <NotFound />
            },
            {
                path: '/blog',
                element: <div>Blog Page</div>,
                errorElement: <NotFound />
            },
            {
                path: '/about',
                element: <div>About Us Page</div>,
                errorElement: <NotFound />
            },
            {
                path: '/books',
                element: <Books />,
                errorElement: <NotFound />
            },
            {
                path: '/cart',
                element: <div>Cart Page</div>,
                errorElement: <NotFound />
            },
            {
                path: '/favorite',
                element: <div>Favorite</div>,
                errorElement: <NotFound />
            },
            {
                path: '/books/:genre',
                element: <GenrePage />,
                errorElement: <NotFound />
            },
            {
                path: '/books/:genre/:id',
                element: <div>Book Page</div>,
                errorElement: <NotFound />,
                loader: ({params}) => fetch(`http://localhost:3000/books/${params.id}`)
            },
            {
                path: '/jobs',
                element: <div>Jobs Page</div>,
                errorElement: <NotFound />
            },
            {
                path: "/admin/",
                element: <DashboardLayout />,
                errorElement: <NotFound />,
                children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />,
                    },
                    {
                        path: "upload",
                        element: <UploadBook />,
                    },
                    {
                        path: "manage",
                        element: <ManageBooks />,
                    },
                    {
                        path: "edit-book/:id",
                        element: <EditBooks />,
                        loader: ({params}) => fetch(`http://localhost:3000/books/${params.id}`)
                    }
                ]
            }
        ]
    }
]);

export default App;
