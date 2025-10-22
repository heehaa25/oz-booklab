import { useEffect, useState } from 'react';
import Rating from './Rating';
import Input from './Input';

export default function RatingInput({ value, onChange }) {
  const [rating, setRating] = useState(value);
  const handPointer = 'cursor-pointer';

  const handleSelect = (nextValue) => {
    setRating(nextValue);
    onChange(nextValue);
  };
  const handleMouseOut = () => setRating(value);

  useEffect(() => {
    setRating(value);
  }, [value]);

  return (
    <>
      <Rating
        className={handPointer}
        value={rating}
        onSelect={handleSelect}
        onHover={setRating}
        onMouseOut={handleMouseOut}
      />
      <Input type='hidden' name='rating' value={rating} />
    </>
  );
}
