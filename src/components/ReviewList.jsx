import ReviewListItem from './ReviewListItem';

export default function ReviewList({ reviews, onUpdate, onDelete }) {
  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 '>
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
