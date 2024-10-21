import {  createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage';
import Header from './components/Header';
import NotFound from './components/NotFound';
import './styles/mediaQueries.css'
import Footer from './components/Footer';
import GenrePage from './components/GenrePage';
import Books from './components/Books';
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
                errorElement: <NotFound />
            },
            {
                path: '/jobs',
                element: <div>Jobs Page</div>,
                errorElement: <NotFound />
            }

        ]

    }
]);

function App() {
    return (
    <RouterProvider router={router} />
    );
}

export default App;
