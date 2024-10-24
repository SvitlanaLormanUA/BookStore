import { AmountOfFoundBooksProps } from "../interfaces/AmountOfFoundBooksProps";


export default function AmountOfFoundBooks({ message, items }: AmountOfFoundBooksProps) {
    return (
        <>
        <div className="sorting-prop">
            <p>{message}:</p>
            <p>{items.length}</p>
        </div>
        </>
    );
}