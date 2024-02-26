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

export const MessageOnModal = ({ type, title, message }) => {
  const messageStyles = {
    error: {
      bgColor: 'bg-red-100',
      icon: 'fa-solid fa-circle-xmark',
      iconColor: 'text-red-600',
      border: 'border-red-500',
    },
    success: {
      bgColor: 'bg-green-100',
      icon: 'fa-solid fa-check-circle',
      iconColor: 'text-green-600',
      border: 'border-green-500',
    },
    warning: {
      bgColor: 'bg-yellow-100',
      icon: 'fa-solid fa-exclamation-triangle',
      iconColor: 'text-yellow-600',
      border: 'border-yellow-500',
    },
    info: {
      bgColor: 'bg-blue-100',
      icon: 'fa-solid fa-info-circle',
      iconColor: 'text-blue-600',
      border: 'border-blue-500',
    },
    default: {
      bgColor: 'bg-gray-100',
      icon: 'fa-solid fa-bell',
      iconColor: 'text-gray-600',
      border: 'border-gray-500',
    },
  };

  const { bgColor, icon, iconColor, border } =
    messageStyles[type] || messageStyles.default;

  return (
    <div
      className={`p-4 mt-6 rounded-lg border-l-4 border-solid  text-center ${bgColor} ${border}`}
    >
      <i
        className={`text-6xl relative -mt-16 p-3 ${icon} ${iconColor} rounded-full ${bgColor}`}
      />
      <div className='flex flex-col justify-between items-center '>
        <div className='flex flex-col gap-2'>
          <h3 className='text-xl font-semibold text-gray-800'>{title}</h3>
          <p className='text-lg text-gray-600'>{message}</p>
        </div>
      </div>
    </div>
  );
};
