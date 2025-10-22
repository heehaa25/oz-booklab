import ReviewListItem from './ReviewListItem';

export default function ReviewList({ reviews }) {
  return (
    <ul>
      {reviews.map((review) => (
        <ReviewListItem key={review.id} review={review} />
      ))}
    </ul>
  );
}
