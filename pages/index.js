import React, { useState, useRef, useEffect } from 'react';

export default function CombinedComponent() {
  // Countdown Timer logic
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

  // Image data array
  const images = [
    { src: '/image1.jpg', alt: 'Image 1' },
    { src: '/image2.jpg', alt: 'Image 2' },
    { src: '/image3.jpg', alt: 'Image 3' },
    { src: '/image4.jpg', alt: 'Image 4' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const [activeButton, setActiveButton] = useState(null);

  // Modified main container style
const mainContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // Keep the minimum height
};

// Modified countdown text container style
const countdownTextStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Center content vertically
  alignItems: 'center', // Center content horizontally
  backgroundImage: `url('/background1.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  padding: '20px', // Add some padding (adjust as needed)
  boxSizing: 'border-box', // Ensure padding is included in height calculation
};

// ... rest of your React component ...

  const handleButtonClick = (changeImage, buttonId) => {
    setActiveButton(buttonId);
    changeImage();
    setTimeout(() => {
      setActiveButton(null);
    }, 500); // Кнопка будет красной в течение 500 мс
  };


   // useEffect for Countdown Timer
   useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // useEffect for Image Slider Auto-Slide
  useEffect(() => {
    let interval;
    if (autoSlide) {
      interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        setImageLoaded(false); // Reset the image loaded state for fade-in effect
      }, 4000); // Change every 4 seconds
    }

    return () => clearInterval(interval);
  }, [autoSlide, images.length, currentIndex]);



  const nextImage = () => {
    setAutoSlide(false);
    setImageLoaded(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setAutoSlide(false);
    setImageLoaded(false);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };


  // Render Method
  return (
    <div style={mainContainerStyle}>
      {/* Countdown Timer with updated styles */}
      <div className="countdown-text-container" style={countdownTextStyle}>
        {/* ... existing JSX ... */}
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
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4">
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

       {/* Image Gallery */}
       <div className="block md:hidden">
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="max-w-full mx-auto">
            <div className="mb-6">
              <img
                alt={images[currentIndex].alt}
                className={`w-full h-auto rounded-md bg-gray-900 image-transition ${imageLoaded ? "image-visible" : ""}`}
                src={images[currentIndex].src}
                onLoad={() => setImageLoaded(true)}
                style={{
                  aspectRatio: "3 / 4",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="flex justify-center space-x-4 mb-6">
            <button
              aria-label="Previous image"
              className={`p-4 rounded-full bg-blue-700 ${activeButton === 'prev' ? 'bg-red-700' : ''} transition-colors duration-200 ease-in-out shadow-lg`}
              onClick={() => handleButtonClick(prevImage, 'prev')}
            >
              <ChevronLeftIcon className="h-10 w-10 text-gray-300" />
            </button>
            <div className="flex space-x-2">
              {images.map((_, index) => (
                <span key={index} className={`block w-3 h-3 rounded-full ${index === currentIndex ? 'bg-green-400' : 'bg-gray-500'}`} />
              ))}
            </div>
            <button
              aria-label="Next image"
              className={`p-4 rounded-full bg-blue-700 ${activeButton === 'next' ? 'bg-red-600' : ''} transition-colors duration-200 ease-in-out shadow-lg`}
              onClick={() => handleButtonClick(nextImage, 'next')}
            >
              <ChevronRightIcon className="h-10 w-10 text-gray-300" />
            </button>

            </div>
          </div>
        </div>
      </div>

      {/* Hidden preload images */}
      <div style={{ display: "none" }}>
        <img src={images[(currentIndex + 1) % images.length].src} alt="preload next" />
        <img src={images[(currentIndex === 0 ? images.length - 1 : currentIndex - 1)].src} alt="preload previous" />
      </div>
    </div>
  );
}



// Chevron Icons
const ChevronLeftIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
