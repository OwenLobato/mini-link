import PropTypes from 'prop-types';

export const Button = ({
  type = 'button',
  variant = 'contained',
  icon,
  text,
  onClick = () => {},
  className,
  disabled = false,
  alwaysShowText = false,
  ...restProps
}) => {
  const buttonClass = `${className} flex justify-center items-center py-2 px-4 rounded transition duration-300 ease-in-out`;

  const containedStyle =
    'bg-light-text-main text-white hover:bg-light-btn-hover';
  const outlinedStyle =
    'border border-light-text-main text-light-text-main hover:bg-blue-100';

  const containedDisabledStyle =
    'bg-light-text-third text-white cursor-not-allowed';
  const outlinedDisabledStyle =
    'border border-light-text-third text-light-text-third cursor-not-allowed';

  const buttonStyle = variant === 'contained' ? containedStyle : outlinedStyle;
  const disabledStyle =
    variant === 'contained' ? containedDisabledStyle : outlinedDisabledStyle;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonClass} ${disabled ? disabledStyle : buttonStyle}`}
      disabled={disabled}
      {...restProps}
    >
      {icon ? (
        <span className='flex gap-2'>
          <span>{icon}</span>
          {text && (
            <span className={`${alwaysShowText ? '' : 'hidden'} md:inline`}>
              {text}
            </span>
          )}
        </span>
      ) : (
        text && <span>{text}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['contained', 'outlined']),
  icon: PropTypes.node,
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  alwaysShowText: PropTypes.bool,
};
