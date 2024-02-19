import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const NavBar = () => {
  const location = useLocation();
  const authToken = localStorage.getItem('authToken'); // TODO: Create context for the authToken and get from there

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const getLinkClassName = (path) =>
    `block py-2 text-center md:mt-0 rounded 
    ${
      location.pathname === path
        ? `
          text-light-bg-secondary
          md:text-light-text-main
          bg-white
          md:bg-transparent
        `
        : `
          text-white
          md:text-light-text-secondary
          hover:bg-white
          md:hover:bg-transparent
          hover:text-light-bg-secondary
          md:hover:text-light-text-main
        `
    }`;

  const navBarLinks = [
    { path: '/', label: 'SignIn', private: false },
    { path: '/register', label: 'SignUp', private: false },
    { path: '/dashboard', label: 'Dashboard', private: true },
    { path: '/profile', label: 'Profile', private: true },
  ];

  return (
    <nav className='absolute w-full bg-light-bg-main max-w-screen flex flex-wrap items-center justify-between p-2 mb-7 z-40'>
      <Link to='/dashboard' className='flex items-center'>
        <img src={'assests/images/Logo.png'} className='h-8 mr-3' alt='Logo' />
      </Link>
      <button
        onClick={toggleMobileMenu}
        data-collapse-toggle='navbar-default'
        type='button'
        className='p-2 rounded-lg md:hidden bg-light-bg-secondary hover:bg-blue-300 focus:outline-none focus:shadow-outline'
        aria-controls='navbar-default'
        aria-expanded='false'
      >
        <svg
          className='w-6 h-6'
          aria-hidden='true'
          fill='#ffffff'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <div
        className={`${
          mobileMenuOpen ? '' : 'hidden'
        } w-full md:block md:w-auto focus:outline-none`}
        id='navbar-default'
      >
        <ul className='flex flex-col md:flex-row p-4 md:p-0 md:mr-2 mt-4 md:mt-0 gap-2 md:gap-8 rounded-lg bg-light-bg-secondary md:bg-transparent'>
          {navBarLinks.map(
            (link, index) =>
              ((!authToken && !link.private) ||
                (authToken && link.private)) && (
                <li key={index}>
                  <Link to={link.path} className={getLinkClassName(link.path)}>
                    {link.label}
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>
    </nav>
  );
};
