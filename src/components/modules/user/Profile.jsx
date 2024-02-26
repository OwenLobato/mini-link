import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/userContext';
import useUsers from '../../../hooks/useUsers';
import { validateForm } from '../../../helpers/formActions';
import { Button, Input, Modal, MessageOnModal } from '../../globals';

export const Profile = () => {
  const navigate = useNavigate();
  const { setUserData } = useUserContext();
  const { editUser, getUser } = useUsers({
    Authorization: `Bearer ${window.localStorage.getItem('authToken')}`,
  });

  const initialProfileData = {
    name: '',
    email: '',
  };
  const [profileData, setProfileData] = useState(initialProfileData);
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

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
    if (id === 'password') {
      setPassword(value);
    } else {
      setProfileData({ ...profileData, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      validateForm(profileData, ['name', 'email'], () => {
        openModal(
          <MessageOnModal
            type={'warning'}
            title={'Form validation'}
            message={'Please fill all required fields'}
          />
        );
      })
    ) {
      editUser({ ...profileData, password })
        .then((res) => {
          openModal(
            <MessageOnModal type={'success'} title={res.data.message} />
          );
        })
        .catch((err) => {
          openModal(
            <MessageOnModal
              type={'error'}
              title={err.response.data.message}
              message={'Please, try again later'}
            />
          );
        });
    }
  };

  useEffect(() => {
    getUser()
      .then((res) => {
        setProfileData(res.data.data);
      })
      .catch((err) => {
        openModal(
          <MessageOnModal
            type={'error'}
            title={err.response.data.message}
            message={'Please, try again later'}
          />
        );
      });
  }, []);

  return (
    <>
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
              value={profileData?.name}
              startAdornment={<i className='fa-solid fa-user' />}
              className='w-full'
            />
            <Input
              id='email'
              type='text'
              label='Email'
              placeholder={'Type your email address'}
              onChange={handleProfileData}
              value={profileData?.email}
              startAdornment={<i className='fa-solid fa-envelope' />}
              className='w-full'
            />
            <Input
              id='password'
              type={passwordType}
              label='Password'
              placeholder='Type your password'
              onChange={handleProfileData}
              value={profileData?.password}
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

      <Modal isOpen={modalContent !== null} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
};
