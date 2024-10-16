import {  createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage';
import Header from './components/Header';
import NotFound from './components/NotFound';
import './styles/mediaQueries.css'
const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
             <Header />

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
                path: '/shop',
                element: <div>Shop Page</div>,
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
        ]

    }
]);

function App() {
    return (
    <RouterProvider router={router} />
    );
}

export default App;
