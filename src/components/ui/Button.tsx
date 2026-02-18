import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  bold?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  bold = true,
  className,
  children,
  ...props
}) => {
  const baseStyles = 'font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2';

  const variantStyles = {
    primary: 'bg-pink text-white hover:shadow-bold-lg focus:ring-pink/40',
    secondary: 'bg-purple text-white hover:shadow-bold-md focus:ring-purple/40',
    outline: 'border-2 border-pink text-pink hover:bg-pink/10 focus:ring-pink/40',
    ghost: 'text-pink hover:bg-pink/10 focus:ring-pink/40',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-2.5 text-base rounded-xl',
    lg: 'px-6 py-3 text-lg rounded-2xl',
  };

  const boldStyles = bold ? 'font-extrabold shadow-bold-sm hover:shadow-bold-md' : '';

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        boldStyles,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
