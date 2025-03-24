import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function CountdownTimer({ endDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(endDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Limited Time Offer
      </h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{timeLeft.days}</div>
          <div className="text-sm text-gray-500">Days</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{timeLeft.hours}</div>
          <div className="text-sm text-gray-500">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{timeLeft.minutes}</div>
          <div className="text-sm text-gray-500">Minutes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{timeLeft.seconds}</div>
          <div className="text-sm text-gray-500">Seconds</div>
        </div>
      </div>
      <div className="mt-6">
        <Link
          to="/pricing"
          className="block w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Upgrade Now
        </Link>
      </div>
    </div>
  );
} 