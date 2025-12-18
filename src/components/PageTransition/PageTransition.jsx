import { useState, useEffect, useRef } from 'react';
import './PageTransition.css';

// Synthesized Severance-style elevator ding using Web Audio API
const playSynthesizedDing = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create a pleasant bell-like ding sound
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Bell frequencies (similar to elevator ding)
    oscillator1.frequency.setValueAtTime(830, audioContext.currentTime); // High bell tone
    oscillator2.frequency.setValueAtTime(1245, audioContext.currentTime); // Harmonic
    
    oscillator1.type = 'sine';
    oscillator2.type = 'sine';
    
    // Envelope for the ding
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator1.start(audioContext.currentTime);
    oscillator2.start(audioContext.currentTime);
    oscillator1.stop(audioContext.currentTime + 0.8);
    oscillator2.stop(audioContext.currentTime + 0.8);
  } catch {
    // Audio not supported
  }
};

// Severance elevator ding sound effect
const playTransitionSound = () => {
  const audio = new Audio('/sounds/elevator-ding.mp3');
  audio.volume = 0.4;
  
  // Try to play the audio file, fallback to synthesized sound
  audio.play().catch(() => {
    playSynthesizedDing();
  });
  
  // Also handle if the file doesn't exist
  audio.onerror = () => {
    playSynthesizedDing();
  };
};

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
      // Play the Severance elevator ding sound
      playTransitionSound();
      
      // Start exit animation
      setTransitionState('exiting');

      // Timing aligned with elevator ding sound (0.8s total)
      // Exit: 350ms, Enter: 500ms = 850ms total (slight overlap with sound fade)
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

