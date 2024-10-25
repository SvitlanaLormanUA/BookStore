import { Path } from "react-router-dom";
import { Book } from "../type/Book";

export interface SearchInputProps {
    searchIn: Book[];
    navigateTo: string;
}