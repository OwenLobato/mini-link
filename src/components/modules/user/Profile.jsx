import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/userContext';
import { validateForm } from '../../../helpers/formActions';
import { Button, Input } from '../../globals';

export const Profile = () => {
  const navigate = useNavigate();
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
    setUserData({
      _id: '',
      name: '',
      email: '',
      links: [],
    });
    navigate('/');
  };

  const handleProfileData = (e) => {
    const { id, value } = e.target;
    setProfileData({ ...profileData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(profileData, ['name', 'email'])) {
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
