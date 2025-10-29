import { useLocation, useNavigate } from 'react-router';
import { cleanAuthor, cleanTitle } from '../utils/clean';
import Button from './Button';
import { useQuery } from '@tanstack/react-query';
import { getBookDetail } from '../api/bookInfo';

export default function BookDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { bookname, authors, bookImageURL, isbn13 } = state.book;

  const {
    isPending,
    error,
    data: detail,
  } = useQuery({
    queryKey: ['bookId'],
    queryFn: async () => getBookDetail(isbn13),
    staleTime: 1000 * 60 * 5,
  });

  const title = cleanTitle(bookname);
  const author = cleanAuthor(authors);

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>something is wrong</p>;

  return (
    <section className='flex flex-wrap justify-center items-center gap-3 mt-5 px-5 mx-auto max-w-300 select-none'>
      <img className='w-50 h-80 object-cover' src={bookImageURL} alt={title} />
      <section className='flex flex-wrap gap-2 flex-1 min-w-[250px]'>
        <h1 className='text-2xl basis-full'>{title}</h1>
        <p className='text-gray-700 basis-full'>{author}</p>
        <p className='basis-full '>{detail}</p>

        <Button className='mt-5 ml-auto' onClick={() => navigate('/reviews')}>
          리뷰 추가하러 가기
        </Button>
      </section>
    </section>
  );
}
