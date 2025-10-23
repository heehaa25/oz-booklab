export default function BookCard({ book, onClick }) {
  const { doc } = book;
  const { bookname, authors, isbn13, bookImageURL } = doc;

  return (
    <li onClick={() => onClick({ bookname, authors, isbn13, bookImageURL })}>
      <img
        className='w-full h-80 object-cover'
        src={bookImageURL}
        alt={bookname}
      />
      <h1 className='font-semibold line-clamp-1 '>{bookname}</h1>
      <p className='text-sm opacity-80'>{authors}</p>
    </li>
  );
}
