import { useState } from 'react';
import mockItems from '../data/mock.json';
import ReviewList from './ReviewList';
import Modal from './Modal';
import Button from './Button';

export default function Reviews() {
  const [items, setItems] = useState(mockItems);
  const [order, setOrder] = useState('createdAt');
  const [isOpen, setIsOpen] = useState(false);

  const resultItems = items.sort((a, b) => b[order] - a[order]);

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  const handleUpdate = (id, data) => {
    const index = items.findIndex((item) => item.id === id);
    const now = new Date();
    const newItem = {
      ...items[index],
      ...data,
      updatedAt: now.valueOf(),
    };
    const newItems = [
      ...items.slice(0, index),
      newItem,
      ...items.slice(index + 1),
    ];
    setItems(newItems);
  };

  return (
    <div className='w-full mx-auto max-w-6xl'>
      <div className='w-full flex justify-between mt-5'>
        <div className='ml-10 '>
          <Button
            variant={order === 'createdAt' ? 'primary' : 'ghost'}
            onClick={() => setOrder('createdAt')}
          >
            최신순
          </Button>
          <Button
            variant={order === 'rating' ? 'primary' : 'ghost'}
            onClick={() => setOrder('rating')}
          >
            평점순
          </Button>
        </div>
        <Button onClick={() => setIsOpen(true)}>리뷰 추가하기</Button>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className='text-xl'>리뷰 작성</h2>
      </Modal>
      <ReviewList
        reviews={resultItems}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
