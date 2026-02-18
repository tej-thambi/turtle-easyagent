'use client';

import React from 'react';
import clsx from 'clsx';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'badge-primary',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  info: 'bg-bold-info-100 text-bold-info-700',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-md py-xs text-xs',
  md: 'px-lg py-sm text-sm',
  lg: 'px-xl py-md text-base',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center gap-xs font-semibold rounded-full',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {icon && icon}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
