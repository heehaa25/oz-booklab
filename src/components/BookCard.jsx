export default function BookCard({ book, onClick }) {
  const { doc } = book;
  const { bookname, authors, isbn13, bookImageURL } = doc;

  return (
    <li onClick={() => onClick({ bookname, authors, isbn13, bookImageURL })}>
      <img src={bookImageURL} alt={bookname} />
      <h1>{bookname}</h1>
      <p>{authors}</p>
    </li>
  );
}
