import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getBookData } from '../api/bookInfo';
import BookList from './BookList';

export default function Books() {
  const navigate = useNavigate();

  const {
    isPending,
    error,
    data: books,
  } = useQuery({
    queryKey: ['books'],
    queryFn: async () => getBookData(),
    staleTime: 1000 * 60 * 5,
  });

  if (error) return <p>something is wrong</p>;

  const popularBooks = books ?? [];

  return (
    <>
      {isPending && <div className='spinner mx-auto max-w-6xl' />}
      <BookList
        items={popularBooks}
        onClick={(book) => {
          navigate(`/books/${book.isbn13}`, { state: { book } });
        }}
      />
    </>
  );
}
