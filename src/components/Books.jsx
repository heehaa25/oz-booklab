import BookList from './BookList';
import mockData from '../data/popular.json';
import { useNavigate } from 'react-router';

export default function Books() {
  const popularBooks = mockData.response.docs;
  const navigate = useNavigate();

  return (
    <BookList
      items={popularBooks}
      onClick={(book) => navigate(`/books/${book.isbn13}`, { state: { book } })}
    />
  );
}
