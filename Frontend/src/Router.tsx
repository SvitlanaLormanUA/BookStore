import { createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookCart from "./components/BookCard";
import Books from "./components/Books";
import BooksCart from "./components/BooksCart";
import FavouritePage from "./components/FavouritePage";
import GenrePage from "./components/GenrePage";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";
import BooksDatabaseManagement from "./dashboard/BooksDatabaseManagement";
import Dashboard from "./dashboard/Dashboard";
import DashboardLayout from "./dashboard/DashboardLayout";
import EditBooks from "./dashboard/EditBooks";
import ManageBooks from "./dashboard/ManageBooks";
import UploadBook from "./dashboard/UploadBook";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import UserProfile from "./components/UserProfile";
import BlogPage from "./components/BlogPage";
import ManageBlogPost from "./dashboard/ManageBlogPost";
import CreateBlogPost from "./dashboard/CreateBlogPost";
import EditBlogPost from "./dashboard/EditBlogPost";
import BlogPostItem from "./components/BlogPostItem";
import AboutUsPage from "./components/AboutUsPage";


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
                element: <BlogPage/>,
                errorElement: <NotFound />
            },
            {
                path: '/about',
                element: <AboutUsPage/>,
                errorElement: <NotFound />
            },
            {
                path: '/books',
                element: <Books />,
                errorElement: <NotFound />
            },
            {
                path: '/cart',
                element: <BooksCart />,
                errorElement: <NotFound />
            },
            {
                path: '/favorite',
                element: <FavouritePage />,
                errorElement: <NotFound />
            },
            {
                path: '/books/:genre',
                element: <GenrePage />,
                errorElement: <NotFound />
            },
            {
                path: '/book/:id',
                element: <BookCart />,
                errorElement: <NotFound />,
                loader: ({params}) => fetch(`http://localhost:3000/books/${params.id}`)
            },   
            {
                path: 'blog-post/:id',
                element: <BlogPostItem />,
                loader: ({params}) => fetch(`http://localhost:3000/blog-post/${params.id}`)
            }
           
        ]
    },
    {
        path: "/admin/dashboard",
        element:<PrivateRoute> <DashboardLayout /> </PrivateRoute>,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element:   <Dashboard />,
            },
            {
                path: "upload",
                element:<UploadBook /> ,
              
            },
            {
                path: "manage",
                element: <ManageBooks />,
            },
            {
                path: 'edit-book/:id',
                element: <EditBooks />,
                loader: ({params}) => fetch(`http://localhost:3000/books/${params.id}`)
              
            },
            {
                path: "book-db",
                element: <BooksDatabaseManagement />
            },
            {
                path: "manage-blog",
                element: <ManageBlogPost/>
            },
            {
                path: 'create-blog-post',
                element: <CreateBlogPost/>
            },
            {
                path: 'edit-blog-post/:id',
                element: <EditBlogPost />,
                loader: ({params}) => fetch(`http://localhost:3000/blog-post/${params.id}`)
            }
        ]
    }, {
        path: 'sign-up',
        element: <SignUp/>,
        errorElement: <NotFound />,
    }, 
    {
        path: 'login',
        element: <Login/>,
        errorElement: <NotFound />,
    }
  
    
]);
export default router;