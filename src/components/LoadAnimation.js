import React, { useState, useEffect } from 'react';
import '../styles/LogoAnimation.css';

const LoadingAnimation = () => {
  const [fade, setFade] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const splitTimer = setTimeout(() => {
      setFade(true); // Begin the fade-out animation
    }, 1000); // Time until the logos split

    const disableTimer = setTimeout(() => {
			setDisabled(true); // Begin the fade-out animation
      }, 2500); // Time until the logos split

    return () => {
      clearTimeout(splitTimer);
    	clearTimeout(disableTimer);
    };
  }, []);

  return (
    <div className={`greenFlush ${fade ? 'fade-out' : ''}`} style={disabled ? { display: 'none' } : {}}>
      <img
        src="logo/left-half.png"
        alt="Logo Part 1"
        className={`logoPart ${fade ? 'split' : ''} logoLeft`}
      />
      <img
        src="logo/right-half.png"
        alt="Logo Part 2"
        className={`logoPart ${fade ? 'split reverse' : ''} logoRight`}
      />
    </div>
  );
};

export default LoadingAnimation;
