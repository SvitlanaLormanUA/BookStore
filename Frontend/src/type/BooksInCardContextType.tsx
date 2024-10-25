import { Book } from "./Book";

export type BooksInCardContextType = {
    booksInCart: Book[];
    toggleBooksInCart: (book: Book) => void;
    isBookInCart: (book: Book) => boolean;
    removeBookFromCart: (bookId: string) => void;
};