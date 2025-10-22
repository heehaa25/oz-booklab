import ReviewListItem from './ReviewListItem';

export default function ReviewList({ reviews, onUpdate, onDelete }) {
  return (
    <ul className='flex'>
      {reviews.map((review) => (
        <ReviewListItem
          key={review.id}
          review={review}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
