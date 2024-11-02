import { useEffect, useState } from 'react';
import { BlogPost } from '../interfaces/BlogPost';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

export default function BlogPage() {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/blog-posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                setBlogPosts(data);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };
        fetchBlogPosts();
    }, []);

    return (
        <>
            <div className="manage-blog-container">
                {loading ? ( // Conditional rendering based on loading state
                    <div className="loading-indicator">Loading blog posts...</div> // Loading message or spinner
                ) : (
                    <ul className="blog-post-list">
                        {blogPosts.map((post) => (
                            <li key={post._id} className="blog-post-item">
                                <div className="post-details">
                                    <img src={post.image} alt="" />
                                    <h3 className="post-title">{post.title}</h3>
                                    <p className="description">{post.content.slice(0, 200)}...</p>
                                    <p className="date-para-blog">{post.date.slice(0, 10)}</p>
                                    <Link to={`/blog-post/${post._id}`} target="_blank" rel="noopener noreferrer">
                                        <button className="btn btn-primary">
                                            Read More
                                        </button>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
