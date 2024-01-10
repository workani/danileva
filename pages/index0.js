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
  

        // CSS for smooth image transitions
  const imageTransitionStyle = {
    transition: 'opacity 0.5s ease-in-out',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  };


    // Image data array
    const images = [
      { src: '/image1.jpg', alt: 'Image 1' },
      { src: '/image2.jpg', alt: 'Image 2' },
      { src: '/image3.jpg', alt: 'Image 3' },
      { src: '/image4.jpg', alt: 'Image 4' },
      // Add more images as needed
    ];
  
    // State to track the current image index
    const [currentIndex, setCurrentIndex] = useState(0);
  
    // State to track if auto slide is enabled
    const [autoSlide, setAutoSlide] = useState(true);
  
    // Function to go to next image
    const nextImage = () => {
      setAutoSlide(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    // Function to go to previous image
    const prevImage = () => {
      setAutoSlide(false);
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
  
    // Automatic slide show effect
    useEffect(() => {
      if (autoSlide) {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000); // Change every 3 seconds
        return () => clearInterval(interval);
      }
    }, [autoSlide]);


  return (
  <>
    <div className="countdown-text-container flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white"
         style={{ 
           backgroundImage: `url('/background1.jpg')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}>
      <header className="text-center py-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">Countdown to Our Special Day</h1>
        <p className="text-xl sm:text-2xl text-gray-300">The day we've been waiting for is almost here!</p>
      </header>
      <main className="flex flex-col items-center justify-center space-y-5 sm:space-y-10">
          <div className="countdown-container grid grid-cols-2 sm:grid-cols-4 text-center gap-4">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4">
            <p className="text-5xl sm:text-7xl font-bold ">{timeLeft.days}</p>
            <p className="text-xl sm:text-2xl text-gray-300">Days</p>
          </div>
          <div  className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4">
            <p className="text-5xl sm:text-7xl font-bold text-white mb-2">{timeLeft.hours}</p>
            <p className="text-xl sm:text-2xl text-gray-300">Hours</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4">
            <p className="text-5xl sm:text-7xl font-bold text-white mb-2">{timeLeft.minutes}</p>
            <p className="text-xl sm:text-2xl text-gray-300">Minutes</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4">
            <p className="text-5xl sm:text-7xl font-bold text-white mb-2">{timeLeft.seconds}</p>
            <p className="text-xl sm:text-2xl text-gray-300">Seconds</p>
          </div>
        </div>
      </main>
      <footer className="text-center py-10">
        
        <p className="text-xl sm:text-2xl text-gray-300">Can't wait to see you on 17th February!</p>
        
      </footer>
    </div>
    