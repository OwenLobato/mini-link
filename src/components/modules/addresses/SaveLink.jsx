import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Modal } from '../../globals';

export const SaveLink = () => {
  const navigate = useNavigate();

  const initialLinkData = {
    name: '',
    urlCode: '',
    originalLink: '',
    description: '',
  };
  const [linkData, setLinkData] = useState(initialLinkData);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const openOptions = () => {
    setIsOptionsOpen(true);
  };

  const closeOptions = () => {
    setIsOptionsOpen(false);
    navigate('/dashboard');
  };

  const handleLinkData = (e) => {
    const { id, value } = e.target;
    setLinkData({ ...linkData, [id]: value });
  };

  const validateForm = () => {
    const requiredFields = ['name', 'urlCode', 'originalLink'];
    const isEmpty = requiredFields.some((field) => !linkData[field]);
    if (isEmpty) {
      alert('Please fill all required fields');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('linkData:', linkData);
      // TODO: Make API request
      if (true /* All fine*/) {
        openOptions();
      }
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <div className='w-full flex flex-col justify-start items-center '>
        <h1 className='text-3xl font-bold text-light-text-main mt-6 mb-10'>
          Create mini link
        </h1>

        <div className='w-11/12 flex justify-center items-center'>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-6 w-full md:w-1/2 items-center'
          >
            <Input
              id='name'
              label='Link name'
              placeholder={'Example name'}
              onChange={handleLinkData}
              value={linkData.name}
              className='w-full'
            />
            <Input
              id='urlCode'
              label='Short URL code'
              placeholder={'t3sTC0d3'}
              onChange={handleLinkData}
              value={linkData.urlCode}
              className='w-full'
            />
            <Input
              id='originalLink'
              label='Original URL'
              placeholder={'https://domain/original-url.com'}
              onChange={handleLinkData}
              value={linkData.originalLink}
              className='w-full'
            />
            <Input
              id='description'
              label='Description'
              placeholder={'Type your description'}
              onChange={handleLinkData}
              value={linkData.description}
              className='w-full'
            />

            <div className='flex flex-col gap-2'>
              <Button
                variant='outlined'
                type='submit'
                text='Generate short link'
              />
              <Button
                variant='outlined'
                text='Cancel'
                className={
                  'border-light-alert text-light-alert hover:bg-red-50'
                }
                onClick={handleCancel}
              />
            </div>
          </form>
        </div>
      </div>

      <Modal isOpen={isOptionsOpen} onClose={closeOptions}>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-xl text-center font-bold text-light-text-main mb-4'>
            Your mini link has been generated correctly
          </h2>

          {/* TODO: Generate real QR code */}
          <img
            src='assests/svgs/qrCode.svg'
            alt='Empty data'
            className='w-72 mb-6'
          />

          <p className='text-center font-bold text-light-text-main mb-4'>
            http://domain/short/{linkData?.urlCode}
          </p>

          <Button
            alwaysShowText
            text={'Copy'}
            icon={<i className='fa-solid fa-copy' />}
            onClick={() => {
              window.navigator.clipboard.writeText(
                `http://domain/short/${linkData?.urlCode}`
              );
            }}
          />
        </div>
      </Modal>
    </>
  );
};