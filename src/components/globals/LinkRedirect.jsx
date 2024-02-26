import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useAddresses from '../../hooks/useAddresses';
import { NavBar } from './NavBar';

export const LinkRedirect = () => {
  const { urlCode } = useParams();
  const navigate = useNavigate();
  const { goToAddress } = useAddresses();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    goToAddress(urlCode)
      .then((res) => {
        setIsRedirecting(true);
        window.location.href = res.data.data;
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    if (isRedirecting) {
      const redirectTimer = setTimeout(() => {
        setIsRedirecting(false);
      }, 5000);
      return () => clearTimeout(redirectTimer);
    }
  }, [isRedirecting, navigate]);

  return (
    <>
      <NavBar />
      <section className='flex justify-center items-center w-full min-h-screen'>
        <div className='text-center'>
          {isRedirecting ? (
            <>
              <h1 className='text-4xl font-bold mb-4 text-gray-800'>
                Redirecting... 🔄
              </h1>
              <p className='text-lg text-gray-700 mb-2'>
                Please wait while we redirect you.
              </p>
              <p className='text-lg text-gray-700 mb-8'>
                If you are not redirected in a few seconds,{' '}
                <Link to='/' className='text-blue-500 hover:underline'>
                  click here
                </Link>
                .
              </p>
            </>
          ) : (
            <div className='flex flex-col items-center'>
              <img
                src='/assests/svgs/locationNotFound.svg'
                alt='Link not found'
                className='w-80 mb-6'
              />
              <h1 className='text-5xl font-bold mb-4 text-light-text-main'>
                Oh no! 🔎
              </h1>
              <p className='text-lg text-gray-700 mb-2'>
                Sorry, we can't redirect you.
              </p>
              <p className='text-lg text-gray-700 mb-8'>
                Please try again later or check your link
              </p>
              <Link
                to='/dashboard'
                className='inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out'
              >
                Go home
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
