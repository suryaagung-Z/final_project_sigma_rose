import { useEffect, useRef } from 'react';
import anime from 'animejs';

// eslint-disable-next-line react/prop-types
const AnimatedButton = ({ children }) => {
    const buttonRef = useRef(null);

  useEffect(() => {
    const buttonEl = buttonRef.current;

    function animateButton(el, scale, duration, elasticity) {
      anime.remove(el);
      anime({
        targets: el,
        scale: scale,
        duration: duration,
        elasticity: elasticity,
      });
    }

    function enterButton() {
      animateButton(buttonEl, 1.05, 800, 400);
    }

    function leaveButton() {
      animateButton(buttonEl, 1.0, 600, 300);
    }

    buttonEl.addEventListener('mouseenter', enterButton);
    buttonEl.addEventListener('mouseleave', leaveButton);

    return () => {
      buttonEl.removeEventListener('mouseenter', enterButton);
      buttonEl.removeEventListener('mouseleave', leaveButton);
    };
  }, []);

  return (
    <div ref={buttonRef} className="button-hover">
      {children}
    </div>
  );
};

export default AnimatedButton ;
