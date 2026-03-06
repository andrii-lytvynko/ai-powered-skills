import { useState, useRef, useCallback, useEffect, cloneElement } from 'react';
import './ResizableLayout.css';

const MIN_NAV_WIDTH = 56;
const MAX_NAV_WIDTH = 400;
const DEFAULT_NAV_WIDTH = 288;

const MIN_ACTION_PANEL_WIDTH = 280;
const MAX_ACTION_PANEL_WIDTH = 400;
const DEFAULT_ACTION_PANEL_WIDTH = 320;

export default function ResizableLayout({ navPanel, topBar, mainContent, actionPanel }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [navWidth, setNavWidth] = useState(DEFAULT_NAV_WIDTH);
  const [actionPanelWidth, setActionPanelWidth] = useState(DEFAULT_ACTION_PANEL_WIDTH);
  const [isDragging, setIsDragging] = useState(null); // 'nav' | 'action' | null
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  // Handle mouse/touch drag
  const handleDrag = useCallback((clientX) => {
    if (!containerRef.current || !isDragging) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    if (isDragging === 'nav') {
      const newWidth = clientX - containerRect.left;
      const clampedWidth = Math.max(MIN_NAV_WIDTH, Math.min(newWidth, MAX_NAV_WIDTH));
      setNavWidth(clampedWidth);
      setIsNavCollapsed(clampedWidth <= MIN_NAV_WIDTH + 20);
    } else if (isDragging === 'action' && contentRef.current) {
      const mainEl = contentRef.current.querySelector('.resizable-layout__main');
      if (mainEl) {
        const mainRect = mainEl.getBoundingClientRect();
        const newWidth = mainRect.right - clientX;
        const clampedWidth = Math.max(MIN_ACTION_PANEL_WIDTH, Math.min(newWidth, MAX_ACTION_PANEL_WIDTH));
        setActionPanelWidth(clampedWidth);
      }
    }
  }, [isDragging]);

  // Mouse event handlers
  const handleMouseDown = (resizer) => (e) => {
    e.preventDefault();
    setIsDragging(resizer);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = useCallback((e) => {
    handleDrag(e.clientX);
  }, [handleDrag]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  // Touch event handlers
  const handleTouchStart = (resizer) => (e) => {
    setIsDragging(resizer);
  };

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length > 0) {
      handleDrag(e.touches[0].clientX);
    }
  }, [handleDrag]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(null);
  }, []);

  // Attach global mouse/touch listeners when dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Double-click to reset/toggle
  const handleNavDoubleClick = () => {
    if (navWidth <= MIN_NAV_WIDTH + 20) {
      setNavWidth(DEFAULT_NAV_WIDTH);
      setIsNavCollapsed(false);
    } else {
      setNavWidth(MIN_NAV_WIDTH);
      setIsNavCollapsed(true);
    }
  };

  const handleActionPanelDoubleClick = () => {
    setActionPanelWidth(DEFAULT_ACTION_PANEL_WIDTH);
  };

  const toggleNav = () => {
    if (isNavCollapsed) {
      setNavWidth(DEFAULT_NAV_WIDTH);
      setIsNavCollapsed(false);
    } else {
      setNavWidth(MIN_NAV_WIDTH);
      setIsNavCollapsed(true);
    }
  };

  return (
    <div 
      className={`resizable-layout ${isDragging ? 'dragging' : ''}`} 
      ref={containerRef}
    >
      {/* Navigation Panel */}
      <div 
        className={`resizable-layout__nav ${isNavCollapsed ? 'collapsed' : ''}`}
        style={{ width: navWidth }}
      >
        {cloneElement(navPanel, { onToggleNav: toggleNav, isNavCollapsed })}
      </div>

      {/* Nav Resizer */}
      <div
        className={`resizable-layout__resizer ${isDragging === 'nav' ? 'active' : ''}`}
        onMouseDown={handleMouseDown('nav')}
        onTouchStart={handleTouchStart('nav')}
        onDoubleClick={handleNavDoubleClick}
      >
        <div className="resizable-layout__resizer-line" />
      </div>

      {/* Right Content Area (Top Bar + Main + Widgets) */}
      <div className="resizable-layout__right" ref={contentRef}>
        {/* Top Bar - spans full width */}
        {topBar && (
          <div className="resizable-layout__topbar">
            {topBar}
          </div>
        )}

        {/* Content Area (Main + Action Panel + Widgets) */}
        <div className="resizable-layout__content">
          {/* Main Content */}
          <div className="resizable-layout__main">
            {mainContent}
          </div>

          {/* Action Panel Resizer */}
          {actionPanel && (
            <div
              className={`resizable-layout__resizer ${isDragging === 'action' ? 'active' : ''}`}
              onMouseDown={handleMouseDown('action')}
              onTouchStart={handleTouchStart('action')}
              onDoubleClick={handleActionPanelDoubleClick}
            >
              <div className="resizable-layout__resizer-line" />
            </div>
          )}

          {/* Action Panel */}
          {actionPanel && (
            <div 
              className="resizable-layout__action-panel"
              style={{ width: actionPanelWidth }}
            >
              {actionPanel}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
