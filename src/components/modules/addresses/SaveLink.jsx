import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../globals';

export const SaveLink = () => {
  const navigate = useNavigate();

  const initialLinkData = {
    name: '',
    urlCode: '',
    originalLink: '',
    description: '',
  };
  const [linkData, setLinkData] = useState(initialLinkData);

  const handleLinkData = (e) => {
    const { id, value } = e.target;
    setLinkData({ ...linkData, [id]: value });
  };

  const validateForm = () => {
    const isEmpty = Object.values(linkData).some((value) => value === '');
    if (isEmpty) {
      // TODO: Add modal
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
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
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
              className={'border-light-alert text-light-alert hover:bg-red-50'}
              onClick={handleCancel}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
