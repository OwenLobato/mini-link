import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export const Input = ({
  id,
  type = 'text',
  label,
  onChange = () => {},
  placeholder,
  startAdornment,
  finishAdornment,
  className,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(
    !(restProps?.value || restProps?.defaultValue)
  );

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (!e.target.value) {
      setIsEmpty(true);
    }
  };

  const handleChange = (e) => {
    if (e.target.value) {
      setIsEmpty(false);
    }
    onChange(e);
  };

  useEffect(() => {
    setIsEmpty(!(restProps?.value || restProps?.defaultValue));
  }, [restProps?.value, restProps?.defaultValue]);

  return (
    <div className={`relative ${className} `}>
      <label
        htmlFor={id}
        className={`absolute left-${
          startAdornment ? '10' : '3'
        } transition-all duration-300 z-10
        ${
          isFocused || !isEmpty
            ? `-top-2 text-xs bg-white px-1 ${
                startAdornment && '-translate-x-7'
              }`
            : 'top-1/2 -translate-y-1/2'
        }
        ${isFocused ? 'text-light-text-main' : 'text-light-text-third'}
          `}
      >
        {label}
      </label>
      <div className='relative w-full'>
        {startAdornment && (
          <div
            className={`absolute inset-y-0 left-0 pl-3 flex items-center ${
              isFocused ? 'text-light-text-main' : 'text-light-text-third'
            }`}
          >
            {startAdornment}
          </div>
        )}
        <input
          id={id}
          type={type}
          className={`w-full border rounded-md py-2 px-3 pl-${
            startAdornment ? '10' : '3'
          } pr-${
            finishAdornment ? '10' : '3'
          } focus:outline-none focus:border-light-text-main text-black ${
            isFocused && 'border-light-text-main'
          }`}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={isFocused ? placeholder : ''}
          {...restProps}
        />
        {finishAdornment && (
          <div
            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
              isFocused ? 'text-light-text-main' : 'text-light-text-third'
            }`}
          >
            {finishAdornment}
          </div>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  startAdornment: PropTypes.node,
  finishAdornment: PropTypes.node,
};
