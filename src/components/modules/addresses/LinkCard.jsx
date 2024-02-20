import { useState } from 'react';
import { Modal, Button } from '../../globals';

export const LinkCard = ({
  name,
  urlCode,
  createdAt = '2024-01-01T06:00:00.000+00:00',
  visitCount = 0,
  originalLink,
  description = 'No description',
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const formattedDate = new Date(createdAt).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  const openOptions = () => {
    setIsOptionsOpen(true);
  };

  const closeOptions = () => {
    setIsOptionsOpen(false);
  };

  return (
    <>
      <div
        onClick={openOptions}
        className='bg-white shadow-md rounded-lg p-2 border border-gray-200 hover:bg-light-hover'
      >
        <div className='flex'>
          <div className='flex flex-col text-sm gap-1 w-3/4'>
            <h2 className='text-2xl font-bold text-light-text-main'>{name}</h2>
            <p className='text-lg  text-light-text-secondary'>/{urlCode}</p>
          </div>

          <div className='flex flex-col items-end text-sm gap-2 w-1/4'>
            <span className='flex justify-center items-center gap-1'>
              <i className='fa-regular fa-calendar text-light-text-main' />
              <p>{formattedDate}</p>
            </span>

            <span className='flex justify-center items-center gap-1'>
              <i className='fa-regular fa-eye text-light-text-main' />
              <p>{visitCount}</p>
            </span>
          </div>
        </div>
        <p className='text-slate-700 mb-2 break-all'>{originalLink}</p>
        <p className='text-sm text-gray-500 mb-2 text-justify'>{description}</p>
      </div>

      <Modal isOpen={isOptionsOpen} onClose={closeOptions}>
        <h2 className='text-2xl text-center font-bold text-light-text-main mb-4'>
          Options
        </h2>
        <div className='flex flex-col justify-center gap-2'>
          <Button
            alwaysShowText
            text={'Copy'}
            icon={<i className='fa-solid fa-copy' />}
            onClick={() => {
              console.log('Copy mini link...');
            }}
          />
          <Button
            alwaysShowText
            text={'QR Code'}
            icon={<i className='fa-solid fa-qrcode' />}
            onClick={() => {
              console.log('Create QR Code...');
            }}
          />
          <Button
            alwaysShowText
            variant='outlined'
            text={'Edit'}
            icon={<i className='fa-solid fa-pen' />}
            onClick={() => {
              console.log('Edit link...');
            }}
          />
          <Button
            alwaysShowText
            variant='outlined'
            text={'Delete'}
            icon={<i className='fa-solid fa-trash' />}
            onClick={() => {
              console.log('Delete link...');
            }}
            className={'border-light-alert text-light-alert hover:bg-red-50'}
          />
        </div>
      </Modal>
    </>
  );
};
