import { createContext } from 'react';
import { Book } from '../interfaces/Book';

export const BooksContext = createContext<Book[]>([]);