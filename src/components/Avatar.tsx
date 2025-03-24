import React from 'react';
import { cn } from '../lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  status?: 'online' | 'offline' | 'away';
  ring?: boolean;
}

const sizeClasses = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-14 w-14 text-xl',
};

const statusClasses = {
  online: 'bg-green-400',
  offline: 'bg-gray-400',
  away: 'bg-yellow-400',
};

const ringClasses = {
  xs: 'ring-1',
  sm: 'ring-1',
  md: 'ring-2',
  lg: 'ring-2',
  xl: 'ring-2',
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  size = 'md',
  fallback,
  status,
  ring = false,
  className = '',
  ...props
}) => {
  const sizeClass = sizeClasses[size];
  const ringClass = ring ? ringClasses[size] : '';

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full bg-gray-100',
        sizeClass,
        ringClass,
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full rounded-full object-cover"
        />
      ) : fallback ? (
        <span className="font-medium text-gray-600">
          {getInitials(fallback)}
        </span>
      ) : (
        <svg
          className="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white',
            statusClasses[status]
          )}
        />
      )}
    </div>
  );
};

export default Avatar; 