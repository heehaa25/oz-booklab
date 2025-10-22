import { useState } from 'react';
import mockItems from '../data/mock.json';
import ReviewList from './ReviewList';

export default function Reviews() {
  const [items, setItems] = useState(mockItems);
  return (
    <div>
      <ReviewList reviews={items} />
    </div>
  );
}
