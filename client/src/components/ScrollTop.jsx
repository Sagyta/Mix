import React, { useState, useEffect } from 'react';
import '../css/ScrollTop.css'

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {  // Ajusta el valor según lo que desees
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`scroll-to-top ${showButton ? 'show' : ''}`}>
      <a href="#top">
      <i className="fas fa-arrow-alt-circle-up fa-4x scroll-icon"></i>
      </a>
    </div>
  );
};

export default ScrollToTopButton;
