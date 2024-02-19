import React, { useState } from 'react';
import { Button, Input } from '../../globals';

export const Login = () => {
  const initialLoginData = {
    email: '',
    password: '',
  };
  const [loginData, setLoginData] = useState(initialLoginData);
  const [passwordType, setPasswordType] = useState('password');

  const handleShowPassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleLoginData = (e) => {
    const { id, value } = e.target;
    setLoginData({ ...loginData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', loginData.email);
    console.log('Password:', loginData.password);
  };

  return (
    <div className='flex flex-col md:flex-row justify-between items-start w-full h-screen'>
      <div className='flex items-center justify-center bg-light-bg-main w-full md:w-1/2 h-1/3 md:h-screen'>
        <img src={'assests/images/Logo.png'} alt='Logo' className='w-11/12' />
      </div>
      <div className='flex flex-col items-center md:justify-center w-full md:w-1/2 h-2/3 md:h-screen'>
        <h1 className='text-5xl md:text-7xl text-light-text-main my-10 md:my-14'>
          Welcome
        </h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center w-11/12 md:w-1/2'
        >
          <Input
            id='email'
            type='text'
            label='Email'
            placeholder={'Type your email address'}
            onChange={handleLoginData}
            value={loginData.email}
            startAdornment={
              <i className='fa-solid fa-envelope text-light-text-third' />
            }
            className='mb-6 w-full'
          />
          <Input
            id='password'
            type={passwordType}
            label='Password'
            placeholder='Type your password'
            onChange={handleLoginData}
            value={loginData.password}
            startAdornment={
              <i className='fa-solid fa-lock text-light-text-third' />
            }
            finishAdornment={
              <i
                className={`fa-solid fa-eye${
                  passwordType === 'text' ? '-slash' : ''
                } text-light-text-third hover:cursor-pointer`}
                onClick={handleShowPassword}
              />
            }
            className='mb-4 w-full'
          />
          <Button text={'Login'} type='submit' className='mb-2 w-1/3' />
        </form>
        <p>
          No account yet?
          <a
            href='register'
            className='text-light-text-main hover:text-light-btn-hover ml-2 font-bold'
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};
