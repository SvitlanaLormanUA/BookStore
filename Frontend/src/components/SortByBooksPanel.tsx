import { SortByBooksPanelProps } from "../interfaces/SortByBooksPanelProps";


export default function SortByBooksPanel({ message, items }: SortByBooksPanelProps) {
    return (
        <>
        <div className="sorting-prop">
            <p>{message}:</p>
            <p>{items.length}</p>
        </div>
        </>
    );
}