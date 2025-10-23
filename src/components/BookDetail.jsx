import { useLocation, useNavigate } from 'react-router';
import { cleanAuthor, cleanTitle } from '../utils/clean';
import mockdata from '../data/detail.json';
import Button from './Button';

export default function BookDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { bookname, authors, bookImageURL } = state.book;

  const detailData = mockdata.response.detail;
  const description = detailData.map((b) => b.book.description);

  const title = cleanTitle(bookname);
  const author = cleanAuthor(authors);

  return (
    <section className='flex flex-wrap justify-center items-center gap-3 mt-5 px-5 mx-auto max-w-300 select-none'>
      <img className='w-50 h-80 object-cover' src={bookImageURL} alt={title} />
      <section className='flex flex-wrap gap-2 flex-1 min-w-[250px]'>
        <h1 className='text-2xl basis-full'>{title}</h1>
        <p className='text-gray-700 basis-full'>{author}</p>
        <p className='basis-full '>{description}</p>

        <Button className='mt-5 ml-auto' onClick={() => navigate('/reviews')}>
          리뷰 추가하러 가기
        </Button>
      </section>
    </section>
  );
}
