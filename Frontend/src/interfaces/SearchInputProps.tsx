import { Path } from "react-router-dom";
import { Book } from "./Book";

export interface SearchInputProps {
    searchIn: Book[];
    navigateTo: string;
}