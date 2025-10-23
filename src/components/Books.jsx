import BookList from './BookList';
import mockData from '../data/popular.json';

export default function Books() {
  const popularBooks = mockData.response.docs;

  const handleClick = (id) => console.log(id);

  return <BookList items={popularBooks} onClick={handleClick} />;
}
