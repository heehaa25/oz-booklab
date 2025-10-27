import { useEffect, useState } from 'react';
import ReviewList from './ReviewList';
import Modal from './Modal';
import Button from './Button';
import Input from './Input';
import ReviewForm from './ReviewForm';
import useDebounce from '../utils/use-debounce';

export default function Reviews() {
  const [items, setItems] = useState(readLocalStorage);
  const [order, setOrder] = useState('createdAt');
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const debouncedKeyword = useDebounce(keyword, 500);

  const resultItems = items //
    .sort((a, b) => b[order] - a[order])
    .filter(
      (item) =>
        item.title.includes(debouncedKeyword) ||
        item.content.includes(debouncedKeyword)
    );

  const handleKeywordChange = (e) => setKeyword(e.target.value);

  const handleCreate = (data) => {
    const now = new Date();
    const newItem = {
      id: items.length + 1,
      ...data,
      createdAt: now.valueOf(),
      updatedAt: now.valueOf(),
    };
    setItems([newItem, ...items]);
    setIsOpen(false);
  };
  const handleDelete = (deleted) => {
    const nextItems = items.filter((item) => item.id !== deleted.id);
    localStorage.removeItem(deleted);
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

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  return (
    <div className='w-full mx-auto max-w-6xl'>
      <Input
        type='text'
        className='w-4/12 ml-5 mt-3'
        placeholder='🔍  도서 검색'
        onChange={handleKeywordChange}
      />

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
        <ReviewForm mode='create' onSubmit={handleCreate} />
      </Modal>
      <ReviewList
        reviews={resultItems}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

function readLocalStorage() {
  const reviews = localStorage.getItem('items');
  return reviews ? JSON.parse(reviews) : [];
}
