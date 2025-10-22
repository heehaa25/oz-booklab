import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';
import RatingInput from './RatingInput';

export default function ReviewForm({
  review = {
    title: '',
    imgUrl: '',
    rating: 1,
    content: '',
  },
  onSubmit,
}) {
  const [rating, setRating] = useState(review.rating || 0);
  const inputRef = useRef(null);

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

  return (
    <form className='flex flex-col gap-3 mt-5' action={submit}>
      <div className='flex items-center'>
        <Input
          className='grow mr-3'
          name='title'
          defaultValue={review.title}
          placeholder='도서 제목을 입력해 주세요.'
          ref={inputRef}
          required
        />
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
