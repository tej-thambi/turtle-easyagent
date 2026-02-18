import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient' | 'dark';
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  elevated = true,
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white border border-gray-200',
    gradient: 'bg-gradient-bold',
    dark: 'bg-dark-900 border border-dark-700',
  };

  const elevatedStyles = elevated
    ? 'shadow-bold-lg hover:shadow-bold-lg transition-shadow duration-300'
    : '';

  const textColor = variant === 'gradient' ? 'text-white' : 'text-dark-900';

  return (
    <div
      className={clsx(
        'rounded-2xl p-6 transition-all duration-300',
        variantStyles[variant],
        elevatedStyles,
        textColor,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader: React.FC<CardHeaderProps> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={clsx('mb-4 border-b border-gray-200 pb-4', className)}
    {...props}
  >
    {children}
  </div>
);

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle: React.FC<CardTitleProps> = ({
  className,
  children,
  ...props
}) => (
  <h2
    className={clsx('text-2xl font-extrabold', className)}
    {...props}
  >
    {children}
  </h2>
);

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent: React.FC<CardContentProps> = ({
  className,
  children,
  ...props
}) => (
  <div className={clsx('', className)} {...props}>
    {children}
  </div>
);
