import { Book } from "./Book";

export type BooksInCardContextType = {
    booksInCart: Book[];
    toggleBookInCart: (book: Book) => void;
    isBookInCart: (book: Book) => boolean;
    removeBookFromCart: (bookId: string) => void;
};