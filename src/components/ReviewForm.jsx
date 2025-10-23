import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';
import RatingInput from './RatingInput';
import mock from '../data/search.json';

export default function ReviewForm({
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
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const books = mock.response.docs.map((item) => item.doc);

  const uniqueBooks = Array.from(
    new Map(books.map((book) => [book.bookname, book])).values()
  );

  const norm = (s = '') => s.toLowerCase().trim();
  const filteredBooks = uniqueBooks.filter((book) =>
    norm(book.bookname).includes(norm(title))
  );

  const handleSelect = (book) => {
    setTitle(book.bookname);
    setSelectedBook(book);
    setIsFocused(false);
  };

  const handleSearch = (e) => {
    setTitle(e.target.value);
    setSelectedBook(null);
  };

  const handleRatingChange = (value) => setRating(value);

  const submit = (FormData) => {
    const data = Object.fromEntries(FormData.entries());
    onSubmit(data);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setTitle(review?.title ?? '');
    setRating(review?.rating ?? 0);
  }, [review?.title, review?.rating]);

  useEffect(() => {
    if (review?.title) {
      const found =
        books.find((b) => b.bookname === review.title) ??
        (review?.isbn13 ? books.find((b) => b.isbn13 === review.isbn13) : null);
      setSelectedBook(found ?? null);
    }
  }, [review?.title, review?.isbn13, books]);

  return (
    <form className='flex flex-col gap-3 mt-5' action={submit}>
      <div className='flex items-center'>
        <div className='flex flex-col relative w-full'>
          <Input
            className='grow mr-3'
            name='title'
            placeholder='🔍 찾는 도서가 없으면, 입력한 제목이 등록됩니다.'
            value={title}
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            ref={inputRef}
            required
          />

          {isFocused && title && !selectedBook && filteredBooks.length > 0 && (
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
