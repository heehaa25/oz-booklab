import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import ReviewForm from './ReviewForm';
import Rating from './Rating';

export default function ReviewListItem({ review, onUpdate, onDelete }) {
  const { title, rating, content } = review;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dateString = new Date(review.createdAt).toLocaleDateString();

  const handleEditFormSubmit = (data) => {
    onUpdate(review.id, data);
    setIsEditModalOpen(false);
  };

  return (
    <div className='max-w-85 ml-2 my-5 border border-zinc-200 p-4 rounded-2xl shadow-xl duration-300 hover:scale-105 select-none '>
      <h1 className='text-lg font-semibold line-clamp-1 mt-3'>{title}</h1>
      <Rating value={rating} />
      <p>{dateString}</p>
      <p className='h-30 overflow-scroll'>{content}</p>
      <div className='flex justify-end'>
        <Button variant='ghost' onClick={() => setIsEditModalOpen(true)}>
          수정
        </Button>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <ReviewForm
            mode='edit'
            review={review}
            onSubmit={handleEditFormSubmit}
          />
        </Modal>
        <Button variant='danger' onClick={() => onDelete(review)}>
          삭제
        </Button>
      </div>
    </div>
  );
}
