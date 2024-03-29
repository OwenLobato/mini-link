import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/userContext';
import useAddresses from '../../../hooks/useAddresses';
import { LinkCard } from '../../modules';
import { Button, Input, Modal, MessageOnModal, Loader } from '../../globals';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Dashboard = () => {
  const navigate = useNavigate();

  const { getAuthToken } = useUserContext();
  const authToken = getAuthToken();

  const { getAddressByKey } = useAddresses({
    Authorization: `Bearer ${authToken}`,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [allLinks, setAllLinks] = useState([]);
  // Filter
  const initialSearchData = '';
  const [searchData, setSearchData] = useState(initialSearchData);
  const [filterParam, setFilterParam] = useState('name');
  const [filteredLinks, setFilteredLinks] = useState(allLinks);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // Sort
  const [sortParam, setSortParam] = useState('name');
  const [sortDirection, setSortDirection] = useState('default');

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const handleAddLink = (e) => {
    navigate('/link');
  };

  const handleSearchData = (e) => {
    const { value } = e.target;
    setSearchData(value);

    if (value.length >= 1) handleSubmit(e);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    let filteredList = allLinks;

    if (filterParam === 'createdAt' && startDate && endDate) {
      filteredList = allLinks.filter((link) => {
        const linkDate = new Date(link.createdAt);

        const startOfDay = new Date(startDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);

        return linkDate >= startOfDay && linkDate <= endOfDay;
      });
    } else {
      filteredList = allLinks.filter((link) =>
        link[filterParam].toLowerCase().includes(searchData.toLowerCase())
      );
    }

    setFilteredLinks(filteredList);
  };

  const handleFilter = () => {
    openModal(
      <FilterOptions
        setSearchData={setSearchData}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        filterParam={filterParam}
        setFilterParam={setFilterParam}
        closeModal={closeModal}
      />
    );
  };

  const handleSort = () => {
    openModal(
      <SortOptions
        sortParam={sortParam}
        setSortParam={setSortParam}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    );
  };

  useEffect(() => {
    if (startDate && endDate) {
      handleSubmit();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setIsLoading(true);

    getAddressByKey()
      .then((res) => {
        setAllLinks(res.data.data);
      })
      .catch((err) => {
        openModal(
          <MessageOnModal
            type={'error'}
            title={err.response.data.message}
            message={'Please, try again later'}
          />
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  let linksToShow = [];
  if (searchData.length >= 1 || (startDate && endDate)) {
    linksToShow = filteredLinks.length ? filteredLinks : [];
  } else {
    linksToShow = allLinks.length ? allLinks : [];
  }

  linksToShow = [...linksToShow].sort((a, b) => {
    if (sortDirection === 'asc') {
      if (sortParam === 'visitCount') return a[sortParam] - b[sortParam];
      return a[sortParam].localeCompare(b[sortParam]);
    }
    if (sortDirection === 'desc') {
      if (sortParam === 'visitCount') return b[sortParam] - a[sortParam];
      return b[sortParam].localeCompare(a[sortParam]);
    } else {
      return [...linksToShow];
    }
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
            <form
              onSubmit={handleSubmit}
              className='flex flex-col md:flex-row w-full justify-between items-center gap-1 md:gap-2'
            >
              {filterParam === 'createdAt' ? (
                <div className='w-full md:w-10/12 flex flex-row justify-center md:justify-end items-center space-x-4'>
                  <DatePicker
                    placeholderText='Start date'
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                    }}
                    className='border border-light-text-third w-40 text-light-text-third rounded-md px-3 py-2'
                  />
                  <DatePicker
                    placeholderText='End date'
                    selected={endDate}
                    onChange={(date) => {
                      setEndDate(date);
                    }}
                    className='border border-light-text-third w-40 text-light-text-third rounded-md px-3 py-2'
                  />
                </div>
              ) : (
                <Input
                  id='search'
                  type='text'
                  label={`Search link by ${filterParam}`}
                  placeholder={'Type to search'}
                  onChange={handleSearchData}
                  value={searchData}
                  startAdornment={
                    <i className='fa-solid fa-magnifying-glass' />
                  }
                  className={'w-full md:w-10/12'}
                />
              )}
              <div className='flex justify-center items-center gap-1 w-full md:w-2/12'>
                <Button
                  variant='outlined'
                  icon={<i className='fa-solid fa-filter' />}
                  text='Filter'
                  onClick={handleFilter}
                />
                <Button
                  variant='outlined'
                  icon={<i className='fa-solid fa-sort' />}
                  text='Sort'
                  onClick={handleSort}
                />
              </div>
            </form>
          </div>

          <div className='flex justify-center items-start overflow-x-auto scroll-premium w-full absolute top-40 bottom-0 p-2 md:p-4 mt-8 md:mt-0'>
            {linksToShow.length ? (
              <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
                {linksToShow.map((link, index) => (
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
      )}

      <Modal isOpen={modalContent !== null} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
};

const FilterOptions = ({
  setSearchData,
  setStartDate,
  setEndDate,
  filterParam,
  setFilterParam,
  closeModal,
}) => {
  const options = [
    { value: 'name', label: 'Name' },
    { value: 'urlCode', label: 'URL Code' },
    { value: 'originalLink', label: 'Original Link' },
    { value: 'createdAt', label: 'Date' },
  ];

  const handleSelect = (value) => {
    setFilterParam(value);
    setSearchData('');
    setStartDate(null);
    setEndDate(null);
    closeModal();
  };

  return (
    <div className='text-center'>
      <h1 className='text-2xl font-semibold text-gray-800'>Filter by</h1>
      <p className='text-gray-600 mb-4'>Select the filter parameter</p>
      <ul className='border rounded-lg p-2 space-y-1'>
        {options.map((option) => (
          <li
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`cursor-pointer transition-colors duration-300 ease-in-out ${
              filterParam === option.value
                ? 'font-semibold text-blue-600'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

const SortOptions = ({
  sortParam,
  setSortParam,
  sortDirection,
  setSortDirection,
}) => {
  const [sortDirectionLocal, setSortDirectionLocal] = useState(sortDirection);
  const [sortParamLocal, setSortParamLocal] = useState(sortParam);

  const options = [
    { value: 'name', label: 'Name' },
    { value: 'urlCode', label: 'URL Code' },
    { value: 'originalLink', label: 'Original Link' },
    { value: 'visitCount', label: 'Views' },
    { value: 'createdAt', label: 'Date' },
  ];

  const handleSelect = (value) => {
    setSortParam(value);
    setSortParamLocal(value);
  };

  const handleSortDirection = () => {
    const nextDirection =
      sortDirectionLocal === 'default'
        ? 'asc'
        : sortDirectionLocal === 'asc'
        ? 'desc'
        : 'default';
    setSortDirectionLocal(nextDirection);
    setSortDirection(nextDirection);
  };

  return (
    <div className='text-center flex flex-col justify-center'>
      <h1 className='text-2xl font-semibold text-gray-800'>Order by</h1>
      <p className='text-gray-600 mb-2'>Select the order direction</p>
      <Button
        text={sortDirectionLocal.toUpperCase()}
        icon={
          <i
            className={`fa-solid fa-sort${
              sortDirectionLocal === 'asc'
                ? '-up'
                : sortDirectionLocal === 'desc'
                ? '-down'
                : ''
            }`}
          />
        }
        onClick={handleSortDirection}
        className={`border rounded-lg p-2 flex justify-center items-center`}
      />

      <p className='text-gray-600 my-2'>Select the order parameter</p>
      <ul className='border rounded-lg p-2 space-y-1'>
        {options.map((option) => (
          <li
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`cursor-pointer transition-colors duration-300 ease-in-out ${
              sortParamLocal === option.value
                ? 'font-semibold text-blue-600'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
