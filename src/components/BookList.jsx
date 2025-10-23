import BookCard from './BookCard';

export default function BookList({ items, onClick }) {
  return (
    <ul className='mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
      {items.map((item) => (
        <BookCard key={item.doc.isbn13} book={item} onClick={onClick} />
      ))}
    </ul>
  );
}
