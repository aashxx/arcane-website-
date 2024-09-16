import React, { useEffect, useState } from 'react';

const Timer = () => {

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2024-09-24T00:00:00'); 

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 items-center justify-center text-white px-4">
      <div className="flex flex-col items-center justify-center h-[130px] w-[130px] rounded-lg bg-arcane-primary">
        <span className="text-4xl md:text-5xl font-valorax">{timeLeft.days}</span>
        <span className="text-md font-medium">Days</span>
      </div>
      <div className="flex flex-col items-center justify-center h-[130px] w-[130px] rounded-lg bg-arcane-primary">
        <span className="text-4xl md:text-5xl font-valorax">{timeLeft.hours}</span>
        <span className="text-md font-medium">Hours</span>
      </div>
      <div className="flex flex-col items-center justify-center h-[130px] w-[130px] rounded-lg bg-arcane-primary">
        <span className="text-4xl md:text-5xl font-valorax">{timeLeft.minutes}</span>
        <span className="text-md font-medium">Minutes</span>
      </div>
      <div className="flex flex-col items-center justify-center h-[130px] w-[130px] rounded-lg bg-arcane-primary">
        <span className="text-4xl md:text-5xl font-valorax">{timeLeft.seconds}</span>
        <span className="text-md font-medium">Seconds</span>
      </div>
    </div>
  );
};

export default Timer;
