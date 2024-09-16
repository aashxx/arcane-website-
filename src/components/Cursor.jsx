import React, { useEffect, useState, useRef } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Cursor = () => {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSwipeContent, setShowSwipeContent] = useState(false);
  const cursorOutlineRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: posX, clientY: posY } = e;
      setMousePosition({
        x: posX,
        y: posY,
      });
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.animate(
          {
            left: `${posX}px`,
            top: `${posY}px`,
          },
          {
            duration: 500,
            fill: 'forwards',
          }
        );
      }

      const container = document.getElementById('executive-board');
      if (container) {
        const rect = container.getBoundingClientRect();
        if (
          posX >= rect.left &&
          posX <= rect.right &&
          posY >= rect.top &&
          posY <= rect.bottom
        ) {
          setShowSwipeContent(true);
        } else {
          setShowSwipeContent(false);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {
        showSwipeContent && (
          <div
            className='absolute bg-transparent hidden md:flex text-white pointer-events-none font-bold font-expletus-sans gap-4 items-center justify-center h-full'
            style={{
              width: '110px',
              height: '110px',
              position: 'fixed',
              top: `${mousePosition.y + 20}px`,
              left: `${mousePosition.x + 20}px`,
              zIndex: 100,
            }}
          >
            <FaArrowLeft />
            Swipe
            <FaArrowRight />
          </div>
        )
      }
    </>
  );
};

export default Cursor;