import { useState } from 'react';
import { Modal, Button } from '../../globals';

export const LinkCard = ({ data }) => {
  const {
    name = '---',
    urlCode = '...',
    createdAt,
    visitCount = 0,
    originalLink,
    description = 'No description',
  } = data;

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const getFormattedDate = (dateString) => {
    if (!dateString || !isValidDate(dateString)) return 'No date';

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

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
              <p className='text-nowrap'>{getFormattedDate(createdAt)}</p>
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
