import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMockSearch } from '../api/bookInfo';
import useDebounce from '../utils/use-debounce';
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';
import RatingInput from './RatingInput';

export default function ReviewForm({
  mode,
  review = {
    title: '',
    imgUrl: '',
    rating: 1,
    content: '',
  },
  onSubmit,
}) {
  const [title, setTitle] = useState(review?.title ?? '');
  const [selectedBook, setSelectedBook] = useState(null);
  const [rating, setRating] = useState(review.rating || 0);
  const debouncedTitle = useDebounce(title, 400);

  const {
    isLoading,
    error,
    data: searchKeyword,
    refetch,
  } = useQuery({
    queryKey: ['books', debouncedTitle],
    queryFn: async () => getMockSearch(), //getBookData(debouncedTitle),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    enabled: debouncedTitle.length >= 2,
  });

  const uniqueBooks = Array.isArray(searchKeyword)
    ? Array.from(
        new Map(searchKeyword.map((book) => [book.bookname, book])).values()
      )
    : [];

  const norm = (s = '') => s.toLowerCase().trim();
  const filteredBooks = uniqueBooks.filter((book) =>
    norm(book.bookname).includes(norm(title))
  );

  useEffect(() => {
    if (debouncedTitle.length >= 5) {
      refetch();
    }
  }, [debouncedTitle, refetch]);

  const handleChange = (e) => {
    setTitle(e.target.value);
    setSelectedBook(null);
  };

  const handleSelect = (book) => {
    setTitle(book.bookname);
    setSelectedBook(book);
  };

  const handleRatingChange = (value) => setRating(value);

  const submit = (FormData) => {
    const data = Object.fromEntries(FormData.entries());
    onSubmit(data);
  };

  useEffect(() => {
    setTitle(review?.title ?? '');
    setRating(review?.rating ?? 0);
  }, [review?.title, review?.rating]);

  useEffect(() => {
    if (review?.title && Array.isArray(searchKeyword)) {
      const found =
        searchKeyword.find((b) => b.bookname === review.title) || null;
      setSelectedBook(found);
    }
  }, [review?.title, searchKeyword]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>something is wrong</p>;

  return (
    <form className='flex flex-col gap-3 mt-5' action={submit}>
      <h2 className='text-xl mb-2'>
        {mode === 'edit' ? '리뷰 수정' : '리뷰 작성'}
      </h2>
      <div className='flex items-center'>
        <div className='flex flex-col relative w-full'>
          <Input
            className='grow mr-3'
            name='title'
            placeholder='🔍 찾는 도서가 없으면, 입력한 제목이 등록됩니다.'
            value={title}
            onChange={handleChange}
            required
          />

          {title && !selectedBook && filteredBooks.length > 0 && (
            <div className='absolute top-full left-0 right-0 max-h-40 overflow-y-auto bg-white border rounded shadow-md z-10'>
              {filteredBooks.map((book) => (
                <div
                  key={book.isbn13}
                  className='p-2 hover:bg-gray-100 cursor-pointer'
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(book)}
                >
                  {book.bookname}
                </div>
              ))}
            </div>
          )}
        </div>

        <RatingInput
          name='rating'
          value={rating}
          onChange={handleRatingChange}
          required
        />
      </div>
      <Textarea
        className='grow'
        name='content'
        defaultValue={review.content}
        placeholder='내용을 입력해 주세요.'
        required
      />
      <Button>작성 완료</Button>
    </form>
  );
}
