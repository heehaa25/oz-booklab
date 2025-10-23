import BookCard from './BookCard';

export default function BookList({ items, onClick }) {
  return (
    <ul>
      {items.map((item) => (
        <BookCard key={item.doc.isbn13} book={item} onClick={onClick} />
      ))}
    </ul>
  );
}
