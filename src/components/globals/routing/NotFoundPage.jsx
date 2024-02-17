import { Link } from 'react-router-dom';
import { NavBar } from '../NavBar';

export const NotFoundPage = () => {
  return (
    <>
      <NavBar />
      <section className='flex justify-center items-center w-full min-h-screen'>
        <div className='text-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='w-24 h-24 text-red-600 mb-8 mx-auto'
          >
            <circle cx='12' cy='12' r='10'></circle>
            <line x1='12' y1='8' x2='12' y2='12'></line>
            <line x1='12' y1='16' x2='12' y2='16'></line>
          </svg>
          <h1 className='text-4xl font-bold mb-4 text-gray-800'>Oops! 🙈</h1>
          <p className='text-lg text-gray-700 mb-2'>
            It seems that you've reached a page that doesn't exist.
          </p>
          <p className='text-lg text-gray-700 mb-8'>
            Don't worry, we'll help you find your way back home.
          </p>

          <div>
            <Link
              to='/dashboard'
              className='inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out'
            >
              Go home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
