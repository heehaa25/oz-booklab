import { createPortal } from 'react-dom';

export default function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className='fixed z-[--modal-z-index] top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        className='bg-white p-10 rounded-xl w-150'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
