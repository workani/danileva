import React, { useState, useEffect } from 'react';

export default function CombinedComponent() {
  // Countdown Timer State and Logic
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
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Image Carousel State and Logic
  const images = [
    { src: '/image1.jpg', alt: 'Image 1' },
    { src: '/image2.jpg', alt: 'Image 2' },
    { src: '/image3.jpg', alt: 'Image 3' },
    { src: '/image4.jpg', alt: 'Image 4' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  const nextImage = () => {
    setAutoSlide(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setAutoSlide(false);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [autoSlide]);

  if (!timeLeft) {
    return null; // Placeholder for loading state
  }

  function ChevronLeftIcon(props) {
    return (
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
    )
  }
  
  
  function ChevronRightIcon(props) {
    return (
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
    )
  }
  
  return(
  <>
  {/* Countdown Timer */}
  <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#111827', 
      color: 'white', 
      backgroundImage: `url('/background1.jpg')`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat'
    }}
  >
    <header style={{ textAlign: 'center', padding: '2.5rem 0' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        Countdown to Our Special Day
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#9CA3AF' }}>
        The day we've been waiting for is almost here!
      </p>
    </header>

    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', textAlign: 'center' }}>
        {/* Time Left Components */}
      </div>
    </main>

    <footer style={{ textAlign: 'center', padding: '2.5rem 0' }}>
      <p style={{ fontSize: '1.25rem', color: '#9CA3AF' }}>
        Can't wait to see you on 17th February!
      </p>
    </footer>
  </div>

  {/* Image Carousel */}
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: '#000000' }}>
    <div style={{ maxWidth: '100%', margin: 'auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        {/* Current Image */}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* Navigation Buttons and Indicators */}
      </div>
    </div>
  </div>
  </>
  );
} 