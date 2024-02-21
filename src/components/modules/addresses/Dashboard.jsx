import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/userContext';
import { Button, Input } from '../../globals';
import { LinkCard } from '../../modules';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = useUserContext();

  const initialSearchData = '';
  const [searchData, setSearchData] = useState(initialSearchData);

  const [allLinks, setAllLinks] = useState([]);

  const handleAddLink = (e) => {
    navigate('/link');
  };

  const handleSearchData = (e) => {
    const { value } = e.target;
    setSearchData(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('profileData:', searchData);
  };

  useEffect(() => {
    setAllLinks(userData?.links);
  }, [userData]);

  return (
    <div className='relative w-full flex flex-col justify-start items-center'>
      <div className='w-full flex justify-between mt-6 mb-10'>
        <span className='w-1/3'></span>
        <h1 className='w-1/3 text-center text-3xl font-bold text-light-text-main'>
          Dashboard
        </h1>
        <div className='w-1/3 flex items-center justify-end'>
          <Button
            icon={<i className='fa-solid fa-plus' />}
            text='Add link'
            onClick={handleAddLink}
          />
        </div>
      </div>

      <div className='w-full mb-5'>
        <form onSubmit={handleSubmit}>
          <Input
            id='search'
            type='text'
            label='Search link'
            placeholder={'Type your link to search'}
            onChange={handleSearchData}
            value={searchData}
            startAdornment={<i className='fa-solid fa-magnifying-glass' />}
          />
        </form>
      </div>

      <div className='flex justify-center items-start overflow-x-auto scroll-premium w-full absolute top-40 bottom-0 p-2 md:p-4 '>
        {allLinks.length ? (
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
            {allLinks.map((link, index) => (
              <LinkCard key={index} data={link} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center mt-10'>
            <img
              src='assests/svgs/emptyData.svg'
              alt='Empty data'
              className='w-72 mb-6'
            />
            <p className='text-light-text-third'>
              You don't have any links added yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
