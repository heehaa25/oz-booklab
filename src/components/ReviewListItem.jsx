import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import ReviewForm from './ReviewForm';
import Rating from './Rating';

export default function ReviewListItem({ review, onUpdate, onDelete }) {
  const { title, rating, content } = review;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const dateString = new Date(review.createdAt).toLocaleDateString();

  const handleEditFormSubmit = (data) => {
    onUpdate(review.id, data);
    setIsEditModalOpen(false);
  };

  const handleDeleteRequest = () => setIsConfirmOpen(true);
  const confirmDelete = () => {
    setIsConfirmOpen(false);
    setIsSuccessOpen(true);
  };

  const finalizeDelete = () => {
    onDelete(review);
    setIsSuccessOpen(false);
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
        <Button variant='danger' onClick={handleDeleteRequest}>
          삭제
        </Button>

        <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
          <h2 className='text-xl font-semibold'>리뷰 삭제</h2>
          <p className='mt-2 text-lg text-zinc-600'>
            <b>"{title}"</b> 리뷰를 <span className='text-red-600'>삭제</span>
            하시겠습니까?
            <br />
            <span className='text-red-600'>이 작업은 되돌릴 수 없습니다.</span>
          </p>
          <div className='mt-4 flex justify-end gap-2'>
            <Button variant='ghost' onClick={() => setIsConfirmOpen(false)}>
              취소
            </Button>
            <Button variant='danger' onClick={confirmDelete}>
              삭제
            </Button>
          </div>
        </Modal>

        <Modal isOpen={isSuccessOpen} onClose={finalizeDelete}>
          <h2 className='text-lg font-semibold'>삭제 완료</h2>
          <p className='mt-2 text-sm text-zinc-600'>
            <b>{title}</b> 리뷰가 삭제되었습니다.
          </p>
          <div className='mt-4 flex justify-end'>
            <Button onClick={finalizeDelete}>확인</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
