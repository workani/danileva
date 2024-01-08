import React, { useState, useEffect } from 'react';

export default function Component() {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`${year}-02-17`) - +new Date();
    let timeLeft = {};

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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
   
  if (!timeLeft) {
    return null; // or return a loading spinner or some placeholder
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white"
         style={{ 
           backgroundImage: `url('/background.jpg')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}>
      <header className="text-center py-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">Countdown to Our Special Day</h1>
        <p className="text-xl sm:text-2xl text-gray-300">The day we've been waiting for is almost here!</p>
      </header>
      <main className="flex flex-col items-center justify-center space-y-5 sm:space-y-10">
        <div className="flex flex-wrap justify-center space-x-2 sm:space-x-10 text-center">
          <div>
            <p className="text-5xl sm:text-7xl font-bold text-white mb-2">{timeLeft.days}</p>
            <p className="text-xl sm:text-2xl text-gray-300">Days</p>
          </div>
          <div>
            <p className="text-5xl sm:text-7xl font-bold text-white mb-2">{timeLeft.hours}</p>
            <p className="text-xl sm:text-2xl text-gray-300">Hours</p>
          </div>
          <div>
            <p className="text-5xl sm:text-7xl font-bold text-white mb-2">{timeLeft.minutes}</p>
            <p className="text-xl sm:text-2xl text-gray-300">Minutes</p>
          </div>
          <div>
            <p className="text-5xl sm:text-7xl font-bold text-white mb-2">{timeLeft.seconds}</p>
            <p className="text-xl sm:text-2xl text-gray-300">Seconds</p>
          </div>
        </div>
      </main>
      <footer className="text-center py-10">
        <p className="text-xl sm:text-2xl text-gray-300">Can't wait to see you on 17th February!</p>
      </footer>
    </div>
  );
}
