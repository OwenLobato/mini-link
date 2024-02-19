import React, { useState } from 'react';
import { Button, Input } from '../../globals';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();

  const initialRegisterData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [registerData, setRegisterData] = useState(initialRegisterData);
  const [passwordType, setPasswordType] = useState('password');

  const handleShowPassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleRegisterData = (e) => {
    const { id, value } = e.target;
    setRegisterData({ ...registerData, [id]: value });
  };

  const validateForm = () => {
    const isEmpty = Object.values(registerData).some((value) => value === '');
    if (isEmpty) {
      // TODO: Add modal
      alert('Please fill all fields');
      return false;
    }
    return true;
  };

  const checkPassword = () => {
    if (registerData.password !== registerData.confirmPassword) {
      // TODO: Add modal
      alert('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && checkPassword()) {
      console.log('registerData:', registerData);
      // TODO: Make API request
      navigate('/');
    }
  };

  return (
    <div className='flex flex-col md:flex-row-reverse justify-between items-start w-full h-screen'>
      <div className='flex items-center justify-center bg-light-bg-main w-full md:w-1/2 h-1/3 md:h-screen'>
        <img src={'assests/images/Logo.png'} alt='Logo' className='w-11/12' />
      </div>
      <div className='flex flex-col items-center md:justify-center w-full md:w-1/2 h-2/3 md:h-screen'>
        <h1 className='text-center text-6xl md:text-7xl text-light-text-main my-10 md:my-14'>
          Create an account
        </h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center w-11/12 md:w-1/2'
        >
          <Input
            id='name'
            type='text'
            label='Name'
            placeholder={'Type your name'}
            onChange={handleRegisterData}
            value={registerData.name}
            startAdornment={<i className='fa-solid fa-user' />}
            className='mb-6 w-full'
          />
          <Input
            id='email'
            type='text'
            label='Email'
            placeholder={'Type your email address'}
            onChange={handleRegisterData}
            value={registerData.email}
            startAdornment={<i className='fa-solid fa-envelope' />}
            className='mb-6 w-full'
          />
          <Input
            id='password'
            type={passwordType}
            label='Password'
            placeholder='Type your password'
            onChange={handleRegisterData}
            value={registerData.password}
            startAdornment={<i className='fa-solid fa-lock' />}
            finishAdornment={
              <i
                className={`fa-solid fa-eye${
                  passwordType === 'text' ? '-slash' : ''
                } hover:cursor-pointer`}
                onClick={handleShowPassword}
              />
            }
            className='mb-4 w-full'
          />
          <Input
            id='confirmPassword'
            type={passwordType}
            label='Confirm password'
            placeholder='Type your password'
            onChange={handleRegisterData}
            value={registerData.confirmPassword}
            startAdornment={<i className='fa-solid fa-lock' />}
            className='mb-4 w-full'
          />
          <Button text={'Register'} type='submit' className='mb-2 w-1/3' />
        </form>
        <p>
          Already have an account?
          <a
            href='/'
            className='text-light-text-main hover:text-light-btn-hover ml-2 font-bold'
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};
