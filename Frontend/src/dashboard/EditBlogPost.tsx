import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { BlogPost } from "../interfaces/BlogPost";

export default function EditBlogPost() {
    const { id } = useParams();
    const blogPostData = useLoaderData() as BlogPost;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [link, setLink] = useState('');

    // Заповнюємо поля значеннями з blogPostData після завантаження даних
    useEffect(() => {
        if (blogPostData) {
            setTitle(blogPostData.title || '');
            setContent(blogPostData.content || '');
            setImage(blogPostData.image || '');
        }
    }, [blogPostData]);

    const updateBlogPost = async () => {
        try {
            const response = await fetch(`http://localhost:3000/blog-post/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    image,
                    date: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update blog post');
            }
            else {
              alert('Blog post updated successfully');
            }
        } catch (error) {
            console.error('Error updating blog post:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateBlogPost();
        
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setImagePreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const insertLink = () => {
        if (link) {
            setImage(link);
        }
    };

    return (
        <div className="edit-blog-post">
            <h1>Edit Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        className='input-blog-post'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        className='input-blog-post'
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="link">Insert Link</label>
                    <div className="insert-link-container">
                        <input
                            type="url"
                            id="link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Insert image link"
                        />
                        <button type="button" onClick={insertLink} className="btn btn-success btn-insert-link">
                            Insert Link
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn btn-danger btn-submit">
                    Update
                </button>
            </form>
        </div>
    );
}
