import React from 'react';
import { cn } from '../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

const variantClasses = {
  primary: 'bg-indigo-100 text-indigo-800',
  secondary: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  info: 'bg-blue-100 text-blue-800',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

const dotSizeClasses = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  rounded = 'full',
  className = '',
  ...props
}) => {
  const variantClass = variantClasses[variant];
  const sizeClass = sizeClasses[size];
  const roundedClass = roundedClasses[rounded];
  const dotSizeClass = dotSizeClasses[size];

  if (dot) {
    return (
      <span
        className={cn(
          'inline-block',
          variantClass,
          dotSizeClass,
          roundedClass,
          className
        )}
        {...props}
      />
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium',
        variantClass,
        sizeClass,
        roundedClass,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge; 