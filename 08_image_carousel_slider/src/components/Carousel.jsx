import { useState, useRef, useEffect } from 'react';
import '../styles/Carousel.css';

const Carousel = ({ images = [], interval = 3000 }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  function goPrev() {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }

  function goNext() {
    setCurrent((prev) => (prev + 1) % images.length);
  }

  // const startAutoSlide = () => {
  //   stopAutoSlide();
  //   timerRef.current = setTimeout(goNext, interval);
  // };

  // const stopAutoSlide = () => {
  //   if (timerRef.current) clearTimeout(timerRef.current);
  // };

  //Auto-slide

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timerRef.current);
  }, [images.length, interval]);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
  };

  function handleKeyDown(e) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
  }

  return (
    <div
      className='carousel'
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause} // pause when a child gets focus
      onBlur={resume}
      tabIndex={0}
      onKeyDown={handleKeyDown}>
      <button className='nav-btn left' onClick={goPrev}>
        ◀
      </button>
      <div className='carousel-inner'>
        {images.map((img, index) => (
          <img
            src={img}
            alt='image'
            key={index}
            className={index === current ? 'active slide' : 'slide'}
          />
        ))}
      </div>
      <button className='nav-btn right' onClick={goNext}>
        ▶
      </button>

      <div className='dots'>
        {images.map((_, index) => (
          <span
            key={index}
            className={index === current ? 'dot active' : 'dot'}
            onClick={() => setCurrent(index)}></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
