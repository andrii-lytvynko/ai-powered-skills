import { useState, useEffect, useRef } from 'react';
import './PageTransition.css';

export default function PageTransition({ children, pageKey, className = '' }) {
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [transitionState, setTransitionState] = useState('idle'); // 'idle' | 'exiting' | 'entering'
  const previousKeyRef = useRef(pageKey);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clean up any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // If page key changed, start transition
    if (pageKey !== previousKeyRef.current) {
      // Start exit animation
      setTransitionState('exiting');
      timeoutRef.current = setTimeout(() => {
        setDisplayedChildren(children);
        setTransitionState('entering');

        // After enter animation completes, go back to idle
        timeoutRef.current = setTimeout(() => {
          setTransitionState('idle');
          previousKeyRef.current = pageKey;
        }, 500);
      }, 350);
    } else {
      // Same page, just update children without animation
      setDisplayedChildren(children);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pageKey, children]);

  return (
    <div className={`page-transition ${className}`}>
      <div 
        className={`page-transition__content page-transition--${transitionState}`}
        key={previousKeyRef.current}
      >
        {displayedChildren}
      </div>
    </div>
  );
}

