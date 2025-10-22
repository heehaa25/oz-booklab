export default function ReviewListItem({ review }) {
  const { title, rating, content } = review;
  return (
    <div>
      <h1>{title}</h1>
      <p>{rating}</p>
      <p>{content}</p>
    </div>
  );
}
