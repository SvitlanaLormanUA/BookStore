export default function BookCart({ book }: BookCartProps) {
    return (
        <div className="book-cart">
            <img src={book.image} alt={book.title} />
            <div className="book-info">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.genre}</p>
            </div>
        </div>
    );
}