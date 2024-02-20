import { useState } from 'react';
import { useUserContext } from '../../../contexts/userContext';
import { Button, Input } from '../../globals';

export const Profile = () => {
  const { userData, setUserData } = useUserContext();

  const initialProfileData = {
    name: userData?.name || '',
    email: userData?.email || '',
    password: '',
  };
  const [profileData, setProfileData] = useState(initialProfileData);
  const [passwordType, setPasswordType] = useState('password');

  const handleShowPassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleLogout = () => {
    window.localStorage.removeItem('authToken');
    window.location.reload();
    setUserData({
      _id: '',
      name: '',
      email: '',
    });
  };

  const handleProfileData = (e) => {
    const { id, value } = e.target;
    setProfileData({ ...profileData, [id]: value });
  };

  const validateForm = () => {
    const isEmpty = Object.values(profileData).some((value) => value === '');
    if (isEmpty) {
      // TODO: Add modal
      alert('Please fill all fields');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('profileData:', profileData);
      // TODO: Make API request
    }
  };

  return (
    <div className='w-full flex flex-col justify-start items-center '>
      <div className='w-full flex justify-between mt-6 mb-10'>
        <span className='w-1/3'></span>
        <h1 className='w-1/3 text-center text-3xl font-bold text-light-text-main'>
          Profile
        </h1>
        <div className='w-1/3 flex items-center justify-end'>
          <Button
            variant='outlined'
            icon={<i className='fa-solid fa-arrow-right-from-bracket' />}
            text='Log out'
            onClick={handleLogout}
            className={'border-light-alert text-light-alert hover:bg-red-50'}
          />
        </div>
      </div>

      <div className='w-11/12 flex justify-center items-center'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-6 w-full md:w-1/2 items-center'
        >
          <Input
            id='name'
            type='text'
            label='Name'
            placeholder={'Type your name'}
            onChange={handleProfileData}
            value={profileData.name}
            startAdornment={<i className='fa-solid fa-user' />}
            className='w-full'
          />
          <Input
            id='email'
            type='text'
            label='Email'
            placeholder={'Type your email address'}
            onChange={handleProfileData}
            value={profileData.email}
            startAdornment={<i className='fa-solid fa-envelope' />}
            className='w-full'
          />
          <Input
            id='password'
            type={passwordType}
            label='Password'
            placeholder='Type your password'
            onChange={handleProfileData}
            value={profileData.password}
            startAdornment={<i className='fa-solid fa-lock' />}
            finishAdornment={
              <i
                className={`fa-solid fa-eye${
                  passwordType === 'text' ? '-slash' : ''
                } hover:cursor-pointer`}
                onClick={handleShowPassword}
              />
            }
            className='w-full'
          />

          <Button
            type='submit'
            icon={<i className='fa-solid fa-pen' />}
            text='Edit'
            alwaysShowText
          />
        </form>
      </div>
    </div>
  );
};
