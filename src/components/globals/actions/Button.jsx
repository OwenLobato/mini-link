import PropTypes from 'prop-types';

export const Button = ({
  type = 'button',
  icon,
  text,
  onClick = () => {},
  className,
  disabled = false,
  ...restProps
}) => {
  const buttonClass = `${className} flex items-center py-2 px-4 rounded transition duration-300 ease-in-out`;

  const defaultStyle = 'bg-light-text-main hover:bg-light-btn-hover text-white';
  const disabledStyle = 'bg-light-text-third text-white cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonClass} ${disabled ? disabledStyle : defaultStyle}`}
      disabled={disabled}
      {...restProps}
    >
      {icon ? (
        <span className='flex gap-2'>
          <span>{icon}</span>
          {text && <span className='hidden md:inline'>{text}</span>}
        </span>
      ) : (
        text && <span>{text}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  icon: PropTypes.node,
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
