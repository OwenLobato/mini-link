import React, { useEffect, useRef } from 'react';

export const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  const handleCloseOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleCloseOutside);
    } else {
      document.removeEventListener('mousedown', handleCloseOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleCloseOutside);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-50 overflow-auto flex justify-center items-center'>
          <div className='fixed inset-0 bg-black opacity-50' />
          <div
            ref={modalRef}
            className='relative bg-white m-4 p-6 rounded-lg shadow-xl max-w-lg'
          >
            <button
              onClick={onClose}
              className='absolute top-0 right-0 w-7 h-7 m-1 text-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:outline-none rounded-full'
            >
              <i className='fa-solid fa-times' />
            </button>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
