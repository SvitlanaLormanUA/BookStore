import { Book } from "../type/Book";

export type LikedBooksContextType  = {
    likedBooks: Book[];
    toggleLikedBook: (book: Book) => void;
    isBookLiked: (book: Book) => boolean;
    removeLikedBook: (bookId: string) => void;
}