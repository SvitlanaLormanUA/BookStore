import { useState } from 'react';

export default function CreateBlogPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [link, setLink] = useState('');


    const postBlogPost = async () => {
            fetch('http://localhost:3000/blog-posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    image,
                    date: new Date().toISOString(),
                }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to create blog post');
                }
                alert('Blog post created successfully');
                setTitle('');
                setContent('');
                setImage('');
                setImagePreview('');
                setLink('');
            })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission, e.g., API call to create a blog post
        console.log('Title:', title);
        console.log('Content:', content);
        // Handle the image upload if necessary
        console.log('Image:', image);
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

    const insertImage = () => {
        if (imagePreview) {
            setContent((prevContent) => prevContent + `![Image](${imagePreview})\n`);
            setImagePreview(''); // Clear the preview after inserting
        }
    };

    const insertLink = () => {
        if (link) {
           setImage(link);
        }
    };
  
    return (
        <div className="create-blog-post">
            <h1>Create Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        className='input-blog-post'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the title of the blog post"
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
                        placeholder="Write your blog post content here"
                        rows={10}
                        required
                    />
                </div>
    
                <div className="form-group ">

                    <label htmlFor="link">Insert Link</label>
                    <div className="insert-link-container">
                    <input
                        type="url"
                        id="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Enter a URL"
                    />
                    <button type="button" onClick={insertLink} className="btn btn-success btn-insert-link">
                        Insert Link
                    </button>
                    </div>
                </div>
                <button type="submit" className="btn btn-danger btn-submit" onClick={postBlogPost}>Create</button>
            </form>
        </div>
    );
}
