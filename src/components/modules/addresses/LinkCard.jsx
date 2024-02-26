import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { miniLinkPath } from '../../../helpers/originPaths';
import useAddresses from '../../../hooks/useAddresses';
import { Modal, Button } from '../../globals';

export const LinkCard = ({ data }) => {
  const {
    name = '---',
    urlCode = '...',
    createdAt,
    visitCount = 0,
    originalLink,
    description = 'No description',
  } = data;

  const navigate = useNavigate();
  const { deleteAddress } = useAddresses({
    Authorization: `Bearer ${window.localStorage.getItem('authToken')}`,
  });

  const [modalContent, setModalContent] = useState(null);

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const getFormattedDate = (dateString) => {
    if (!dateString || !isValidDate(dateString)) return 'No date';

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const handleCopy = () => {
    window.navigator.clipboard.writeText(miniLinkPath(urlCode));
    closeModal();
  };

  const handleQrCode = () => {
    console.log('Create QR Code...');
    openModal(<QrModal urlCode={urlCode} />);
  };

  const handleEdit = () => {
    navigate(`/link/${data._id}`);
  };

  const handleDeleteLink = () => {
    closeModal();
    deleteAddress(data._id)
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleDelete = () => {
    openModal(
      <DeleteModal
        cancel={() => {
          openModal(
            <OptionsModal
              handleCopy={handleCopy}
              handleQrCode={handleQrCode}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        }}
        deleteLink={handleDeleteLink}
      />
    );
  };

  return (
    <>
      <div
        onClick={() =>
          openModal(
            <OptionsModal
              handleCopy={handleCopy}
              handleQrCode={handleQrCode}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )
        }
        className='bg-white shadow-md rounded-lg p-2 border border-gray-200 hover:bg-light-hover'
      >
        <div className='flex'>
          <div className='flex flex-col text-sm gap-1 w-3/4'>
            <h2 className='text-2xl font-bold text-light-text-main'>{name}</h2>
            <p className='text-lg  text-light-text-secondary'>/{urlCode}</p>
          </div>

          <div className='flex flex-col items-end text-sm gap-2 w-1/4'>
            <span className='flex justify-center items-center gap-1'>
              <i className='fa-regular fa-calendar text-light-text-main' />
              <p className='text-nowrap'>{getFormattedDate(createdAt)}</p>
            </span>

            <span className='flex justify-center items-center gap-1'>
              <i className='fa-regular fa-eye text-light-text-main' />
              <p>{visitCount}</p>
            </span>
          </div>
        </div>
        <p className='text-slate-700 mb-2 break-all'>{originalLink}</p>
        <p className='text-sm text-gray-500 mb-2 text-justify'>{description}</p>
      </div>

      <Modal isOpen={modalContent !== null} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
};

const OptionsModal = ({
  handleCopy,
  handleQrCode,
  handleEdit,
  handleDelete,
}) => {
  return (
    <>
      <h2 className='text-2xl text-center font-bold text-light-text-main mb-4'>
        Options
      </h2>
      <div className='flex flex-col justify-center gap-2'>
        <Button
          alwaysShowText
          text={'Copy'}
          icon={<i className='fa-solid fa-copy' />}
          onClick={handleCopy}
        />
        <Button
          alwaysShowText
          text={'QR Code'}
          icon={<i className='fa-solid fa-qrcode' />}
          onClick={handleQrCode}
        />
        <Button
          alwaysShowText
          variant='outlined'
          text={'Edit'}
          icon={<i className='fa-solid fa-pen' />}
          onClick={handleEdit}
        />
        <Button
          alwaysShowText
          variant='outlined'
          text={'Delete'}
          icon={<i className='fa-solid fa-trash' />}
          onClick={handleDelete}
          className={'border-light-alert text-light-alert hover:bg-red-50'}
        />
      </div>
    </>
  );
};

const DeleteModal = ({ cancel, deleteLink }) => {
  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-2xl text-center font-bold mb-4 w-4/5'>
        Are you sure you want to delete it?
      </h2>
      <p className='mb-5  text-gray-700'>
        This action is irreversible, confirm your decision below
      </p>
      <div className='flex justify-center gap-2'>
        <Button variant='outlined' text={'No, cancel'} onClick={cancel} />
        <Button
          variant='outlined'
          text={'Yes, delete'}
          onClick={deleteLink}
          className={'border-light-alert text-light-alert hover:bg-red-50'}
        />
      </div>
    </div>
  );
};

const QrModal = ({ urlCode }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <QRCode value={`${miniLinkPath(urlCode)}`} className='m-4' />

      <p className='text-center font-bold text-light-text-main mb-4'>
        {`${miniLinkPath(urlCode)}`}
      </p>

      <Button
        alwaysShowText
        text={'Copy mini link'}
        icon={<i className='fa-regular fa-copy' />}
        onClick={() => {
          window.navigator.clipboard.writeText(`${miniLinkPath(urlCode)}`);
        }}
      />
    </div>
  );
};
