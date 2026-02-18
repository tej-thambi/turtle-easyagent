import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  size = 'md',
  className,
  id,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const inputId = id || `input-${Math.random()}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-dark-900 mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          'w-full border-2 rounded-xl transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          'placeholder-gray-400',
          error
            ? 'border-bold-error-500 focus:border-bold-error-500 focus:ring-bold-error-200'
            : 'border-gray-300 focus:border-pink focus:ring-pink/20',
          sizeStyles[size],
          className
        )}
        {...props}
      />
      {error && <p className="text-bold-error-500 text-sm mt-2">{error}</p>}
      {helperText && !error && (
        <p className="text-gray-500 text-sm mt-2">{helperText}</p>
      )}
    </div>
  );
};
