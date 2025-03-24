import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

export interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
}

const alignClasses = {
  left: 'left-0',
  right: 'right-0',
};

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'left',
  className = '',
  triggerClassName = '',
  menuClassName = '',
  itemClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (item: DropdownItem) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={cn('relative inline-block text-left', className)}>
      <div
        className={cn('cursor-pointer', triggerClassName)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
            alignClasses[align],
            menuClassName
          )}
        >
          <div className="py-1" role="menu">
            {items.map((item) => (
              <button
                key={item.value}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={cn(
                  'flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none',
                  item.disabled && 'opacity-50 cursor-not-allowed',
                  itemClassName
                )}
                role="menuitem"
              >
                {item.icon && (
                  <span className="mr-3">{item.icon}</span>
                )}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown; 