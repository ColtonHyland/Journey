import React, { useState, useEffect, useRef } from 'react';
import { usePopper } from 'react-popper';
import { CSSTransition } from 'react-transition-group';

const Tooltip = ({
  children,
  content,
  placement = 'top',
  error = false,
  showDuration = 2500,
  className = '',
}) => {
  const [visible, setVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const { styles, attributes } = usePopper(triggerRef.current, tooltipRef.current, {
    placement,
  });

  useEffect(() => {
    let timer;
    if (error && !errorVisible) {
      setErrorVisible(true);
      timer = setTimeout(() => {
        setErrorVisible(false);
      }, showDuration);
    }
    return () => clearTimeout(timer);
  }, [error, showDuration]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setVisible(false);
      }
    };
    if (visible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [visible]);

  return (
    <div className="relative inline-block" ref={triggerRef}>
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible((prev) => !prev)}
        aria-describedby="tooltip"
      >
        {children}
      </div>
      <CSSTransition
        in={visible || errorVisible}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <div
          ref={tooltipRef}
          style={styles.popper}
          {...attributes.popper}
          className={`tooltip ${className} bg-gray-800 text-white p-2 rounded ${error ? 'bg-red-600' : ''}`}
        >
          {content}
        </div>
      </CSSTransition>
      <style jsx>{`
        .fade-enter {
          opacity: 0;
        }
        .fade-enter-active {
          opacity: 1;
          transition: opacity 200ms;
        }
        .fade-exit {
          opacity: 1;
        }
        .fade-exit-active {
          opacity: 0;
          transition: opacity 200ms;
        }
      `}</style>
    </div>
  );
};

export default Tooltip;
