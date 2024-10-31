import { useLoaderData, useParams } from "react-router-dom";
import { BlogPost } from "../interfaces/BlogPost";

export default function BlogPostItem() {
    
    const { id } = useParams();
    const blogPostData = useLoaderData() as BlogPost;

    // Розділяємо content на абзаци з 3 речень у кожному
    const paragraphs = blogPostData.content
        .match(/([^.!?]+[.!?]{1,3}){1,3}/g) || []; // Регулярний вираз для розбиття на абзаци

    return (
        <div className="blog-post-item-read">
            <img src={blogPostData.image} alt={blogPostData.title} />
            <h1>{blogPostData.title}</h1>
            {paragraphs.map((paragraph, index) => (
                <p key={index} className="blog-paragraph">{paragraph.trim()}</p>
            ))}
        </div>
    );
}
