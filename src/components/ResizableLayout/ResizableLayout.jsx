import { useState, useRef, useCallback, useEffect, cloneElement } from 'react';
import './ResizableLayout.css';

const MIN_NAV_WIDTH = 56;
const MAX_NAV_WIDTH = 400;
const DEFAULT_NAV_WIDTH = 288;

const MIN_WIDGETS_WIDTH = 260;
const MAX_WIDGETS_WIDTH = 360;
const DEFAULT_WIDGETS_WIDTH = 268;

const MIN_ACTION_PANEL_WIDTH = 280;
const MAX_ACTION_PANEL_WIDTH = 400;
const DEFAULT_ACTION_PANEL_WIDTH = 320;

export default function ResizableLayout({ navPanel, topBar, mainContent, widgetsPanel, actionPanel }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [navWidth, setNavWidth] = useState(DEFAULT_NAV_WIDTH);
  const [widgetsWidth, setWidgetsWidth] = useState(DEFAULT_WIDGETS_WIDTH);
  const [actionPanelWidth, setActionPanelWidth] = useState(DEFAULT_ACTION_PANEL_WIDTH);
  const [isDragging, setIsDragging] = useState(null); // 'nav' | 'widgets' | 'action' | null
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isWidgetsCollapsed, setIsWidgetsCollapsed] = useState(false);

  // Handle mouse/touch drag
  const handleDrag = useCallback((clientX) => {
    if (!containerRef.current || !isDragging) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    if (isDragging === 'nav') {
      const newWidth = clientX - containerRect.left;
      const clampedWidth = Math.max(MIN_NAV_WIDTH, Math.min(newWidth, MAX_NAV_WIDTH));
      setNavWidth(clampedWidth);
      setIsNavCollapsed(clampedWidth <= MIN_NAV_WIDTH + 20);
    } else if (isDragging === 'widgets' && contentRef.current) {
      const contentRect = contentRef.current.getBoundingClientRect();
      const newWidth = contentRect.right - clientX;
      const clampedWidth = Math.max(MIN_WIDGETS_WIDTH, Math.min(newWidth, MAX_WIDGETS_WIDTH));
      setWidgetsWidth(clampedWidth);
      setIsWidgetsCollapsed(false);
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

  const handleWidgetsDoubleClick = () => {
    if (isWidgetsCollapsed) {
      setWidgetsWidth(DEFAULT_WIDGETS_WIDTH);
      setIsWidgetsCollapsed(false);
    } else {
      setWidgetsWidth(0);
      setIsWidgetsCollapsed(true);
    }
  };

  const handleActionPanelDoubleClick = () => {
    setActionPanelWidth(DEFAULT_ACTION_PANEL_WIDTH);
  };

  const toggleWidgets = () => {
    if (isWidgetsCollapsed) {
      setWidgetsWidth(DEFAULT_WIDGETS_WIDTH);
      setIsWidgetsCollapsed(false);
    } else {
      setWidgetsWidth(0);
      setIsWidgetsCollapsed(true);
    }
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
            {cloneElement(topBar, { onToggleWidgets: toggleWidgets, isWidgetsVisible: !isWidgetsCollapsed })}
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

          {/* Widgets Resizer */}
          {!isWidgetsCollapsed && (
            <div
              className={`resizable-layout__resizer ${isDragging === 'widgets' ? 'active' : ''}`}
              onMouseDown={handleMouseDown('widgets')}
              onTouchStart={handleTouchStart('widgets')}
              onDoubleClick={handleWidgetsDoubleClick}
            >
              <div className="resizable-layout__resizer-line" />
            </div>
          )}

          {/* Widgets Panel */}
          {!isWidgetsCollapsed && (
            <div 
              className="resizable-layout__widgets"
              style={{ width: widgetsWidth }}
            >
              {widgetsPanel}
            </div>
          )}

          {/* Collapsed widgets toggle */}
          {isWidgetsCollapsed && (
            <button 
              className="resizable-layout__expand-btn"
              onClick={() => {
                setWidgetsWidth(DEFAULT_WIDGETS_WIDTH);
                setIsWidgetsCollapsed(false);
              }}
              title="Show widgets"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
