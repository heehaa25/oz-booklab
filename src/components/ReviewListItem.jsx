import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import ReviewForm from './ReviewForm';

export default function ReviewListItem({ review, onUpdate, onDelete }) {
  const { title, rating, content } = review;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dateString = new Date(review.createdAt).toLocaleDateString();

  const handleEditFormSubmit = (data) => {
    onUpdate(review.id, data);
    setIsEditModalOpen(false);
  };

  return (
    <div className='w-75 h-70 ml-5 my-5 border border-zinc-200 p-4 rounded-2xl flex flex-col shadow-xl duration-300 hover:scale-105'>
      <h1 className='text-xl font-semibold line-clamp-1 mt-3'>{title}</h1>
      <p>{rating}</p>
      <p>{dateString}</p>
      <p className='mt-1 flex-1 min-h-0 overflow-auto pr-1 [scrollbar-gutter:stable]'>
        {content}
      </p>
      <div className='flex justify-end'>
        <Button variant='ghost' onClick={() => setIsEditModalOpen(true)}>
          수정
        </Button>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <ReviewForm review={review} onSubmit={handleEditFormSubmit} />
        </Modal>
        <Button variant='danger' onClick={() => onDelete(review.id)}>
          삭제
        </Button>
      </div>
    </div>
  );
}
