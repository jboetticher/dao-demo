import React, { useState, useEffect } from 'react';
import '../styles/Background.css';

// Array of images
const images = [
  'backgrounds/background-1.png',
  'backgrounds/background-2.png',
  'backgrounds/background-3.png',
  'backgrounds/background-4.png',
  'backgrounds/background-5.png',
];

const Background = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update to the next image index, or loop back to the start
      setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 10000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);

  return (
    <div className="background">
      <div className='gradient' />
    </div>
  );
};

export default Background;
