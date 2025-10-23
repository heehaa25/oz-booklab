import { cleanAuthor, cleanTitle } from '../utils/clean';

export default function BookCard({ book, onClick }) {
  const { doc } = book;
  const { bookname, authors, bookImageURL } = doc;

  const title = cleanTitle(bookname);
  const author = cleanAuthor(authors);

  return (
    <li onClick={() => onClick(doc)}>
      <img
        className='w-full h-80 object-cover'
        src={bookImageURL}
        alt={bookname}
      />
      <h1 className='font-semibold line-clamp-1 '>{title}</h1>
      <p className='text-sm opacity-80'>{author}</p>
    </li>
  );
}
