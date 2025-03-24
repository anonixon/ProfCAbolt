import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  className?: string;
  contentClassName?: string;
}

const positionClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
};

const arrowClasses = {
  top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-gray-900 border-x-transparent border-b-transparent',
  right: 'left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-gray-900 border-t-transparent border-b-transparent',
  bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-gray-900 border-x-transparent border-t-transparent',
  left: 'right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-gray-900 border-t-transparent border-b-transparent',
};

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
  className = '',
  contentClassName = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  let timeoutId: NodeJS.Timeout;

  const showTooltip = () => {
    timeoutId = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({ x: rect.left, y: rect.top });
      }
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutId);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      className={cn('inline-block', className)}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            'fixed z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg',
            positionClasses[position],
            contentClassName
          )}
          style={{
            left: coords.x,
            top: coords.y,
          }}
        >
          <div
            className={cn(
              'absolute w-0 h-0 border-4',
              arrowClasses[position]
            )}
          />
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip; 