import { Book } from "../interfaces/Book";

export type LikedBooksContextType  = {
    likedBooks: Book[];
    toggleLikedBook: (book: Book) => void;
    isBookLiked: (book: Book) => boolean;
    removeLikedBook: (bookId: string) => void;
}