import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const Input = ({
  id,
  type = 'text',
  label,
  onChange = () => {},
  placeholder,
  startAdornment,
  finishAdornment,
  className,
  multiline,
  maxRows,
  rows,
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
    if (multiline) {
      e.target.style.height = 'auto';
      if (maxRows) {
        const getMaxHeight = (maxRows) => {
          const rowHeight = 24;
          const initialHeight = 40;
          const maxScrollHeight = 40 + rowHeight * (maxRows - 1);
          if (maxScrollHeight < initialHeight) {
            return 40;
          } else {
            return maxScrollHeight;
          }
        };

        if (e.target.scrollHeight <= getMaxHeight(maxRows)) {
          e.target.style.height = `${e.target.scrollHeight}px`;
        } else {
          e.target.style.height = `${getMaxHeight(maxRows)}px`;
          e.target.style.overflowY = 'auto';
        }
      } else {
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
    }
    onChange(e);
  };

  useEffect(() => {
    setIsEmpty(!(restProps?.value || restProps?.defaultValue));
  }, [restProps?.value, restProps?.defaultValue]);

  const inputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className={`relative ${className} `}>
      <label
        htmlFor={id}
        className={`absolute ${
          Boolean(startAdornment) ? 'left-10' : 'left-3'
        } transition-all duration-300 z-10
        ${
          isFocused || !isEmpty
            ? `-top-2 text-xs bg-white px-1 ${
                Boolean(startAdornment) && '-translate-x-7'
              }`
            : 'top-5 -translate-y-1/2'
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
        {React.createElement(inputComponent, {
          id,
          type,
          className: `w-full border rounded-md py-2 px-3 
          ${Boolean(startAdornment) ? 'pl-10' : 'pl-3'}
          ${Boolean(finishAdornment) ? 'pr-10' : 'pr-3'}
          focus:outline-none focus:border-light-text-main text-black ${
            isFocused && 'border-light-text-main'
          }`,
          onChange: handleChange,
          onFocus: handleFocus,
          onBlur: handleBlur,
          placeholder: isFocused ? placeholder : '',
          style: {
            resize: 'none',
            overflowY: 'hidden',
            maxHeight: 'none',
          },
          ...(rows && { rows }),
          ...restProps,
        })}
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
  multiline: PropTypes.bool,
  maxRows: PropTypes.number,
  rows: PropTypes.number,
};
