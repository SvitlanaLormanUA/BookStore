import { useEffect, useState } from "react";
import { BlogPost } from "../interfaces/BlogPost";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from 'react-icons/fa'; // Importing icons from react-icons
import { marked } from "marked";

export default function ManageBlogPost() {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);

    // Fetch blog posts from the server
    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/blog-posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setBlogPosts(data);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        };
        fetchBlogPosts();
    }, []);

    // Open confirmation popup
    const handleOpenPopup = (id: string) => {
        setPostToDelete(id);
        setShowPopup(true);
    };

    // Close confirmation popup
    const handleClosePopup = () => {
        setShowPopup(false);
        setPostToDelete(null);
    };

    // Confirm deletion of the blog post
    const handleConfirmDelete = async () => {
        if (postToDelete) {
            try {
                const response = await fetch(`http://localhost:3000/blog-post/${postToDelete}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete the blog post');
                }
                const data = await response.json();
                console.log(data);
                setBlogPosts(prevPosts => prevPosts.filter(post => post._id !== postToDelete));
                handleClosePopup();
            } catch (error) {
                console.error('Error deleting blog post:', error);
                handleClosePopup();
            }
        }
    };

    // Edit blog post logic
  

    return (
        <div  className="manage-blog-container">
            <h2>Manage Blog Posts</h2>
            
                <Link to="/admin/dashboard/create-blog-post" className="add-new-blog-post">
                <button className="btn btn-primary new-post-btn">
                     New Post
                    </button>
                </Link>
        
            <ul className="blog-post-list">
                {blogPosts.map((post) => (
                    <li key={post._id} className="blog-post-item">
                        <div className="post-details">
                            <Link to={`/blog-post/${post._id}`} target="_blank" rel="noopener noreferrer">
                            <div className="post-obj-details">
                              
                                <h3  className="post-title">{post.title}</h3>
                                <p className="description">{post.content.slice(0, 50)}...</p>
                                <p className="date-para-blog">{post.date.slice(0, 10)}</p>
                                </div>
                            </Link>
                        </div>
                        <div className="post-actions">
                            <Link to={`/admin/dashboard/edit-blog-post/${post._id}`} >
                            <button  className="action-btn delete-btn">
                                <FaEdit />
                            </button>
                            </Link>
                            <button onClick={() => handleOpenPopup(post._id.toString())} className="action-btn delete-btn">
                                <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Delete Confirmation Popup */}
            {showPopup && (
                <div className="popup-overlay" onClick={handleClosePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Are you sure you want to delete this blog post?</h3>
                        <div className="popup-buttons">
                            <button onClick={handleConfirmDelete} className="btn btn-primary">Yes</button>
                            <button onClick={handleClosePopup} className="btn btn-danger">No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
