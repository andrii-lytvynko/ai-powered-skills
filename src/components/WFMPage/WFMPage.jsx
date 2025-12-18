import { useState, useRef, useEffect } from 'react';
import WFMNav from './WFMNav';
import AgentTimeline from './AgentTimeline';
import WFMSummary from './WFMSummary';
import ProfileMenu from '../ProfileMenu';
import { ChevronDownIcon, CheckIcon, SearchIcon, BellIcon, WFMLogoIcon, FilterIcon, Icon } from '../Icons';
import './WFMPage.css';

// Navigation Header Component (in nav column)
function NavHeader({ onProductChange, selectedProduct, products = [], isCollapsed }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleProductSelect = (product) => {
    if (onProductChange) {
      onProductChange(product);
    }
    setIsOpen(false);
  };

  return (
    <div className={`wfm-nav-header ${isCollapsed ? 'wfm-nav-header--collapsed' : ''}`} ref={dropdownRef}>
      <div className="wfm-nav-header__logo">
        <WFMLogoIcon className="wfm-nav-header__logo-icon" />
      </div>
      {!isCollapsed && (
        <>
          <button 
            className={`wfm-nav-header__product-selector ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="wfm-nav-header__product-name">{selectedProduct?.name || 'Workforce management'}</span>
            <ChevronDownIcon className={`wfm-nav-header__chevron ${isOpen ? 'rotated' : ''}`} />
          </button>
          
          {isOpen && products.length > 0 && (
            <div className="wfm-nav-header__dropdown">
              <div className="wfm-nav-header__dropdown-list">
                {products.map((product) => {
                  const ProductIcon = product.icon;
                  const isSelected = selectedProduct?.id === product.id;
                  return (
                    <button
                      key={product.id}
                      className={`wfm-nav-header__dropdown-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleProductSelect(product)}
                    >
                      <ProductIcon className="wfm-nav-header__dropdown-icon" />
                      <span className="wfm-nav-header__dropdown-name">{product.name}</span>
                      {isSelected && <CheckIcon className="wfm-nav-header__dropdown-check" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Content Header Component (in content column)
function ContentHeader({ onOpenCommandPalette }) {
  return (
    <div className="wfm-content-header">
      <button 
        className="wfm-content-header__search"
        onClick={onOpenCommandPalette}
        type="button"
      >
        <SearchIcon className="wfm-content-header__search-icon" />
        <span className="wfm-content-header__search-text">Search for apps and commands or ask AI...</span>
        <span className="wfm-content-header__search-shortcut">⌘ + K</span>
      </button>
      
      <div className="wfm-content-header__right">
        <button className="wfm-content-header__icon-btn" title="Notifications">
          <BellIcon className="wfm-content-header__icon" />
        </button>
        <ProfileMenu />
      </div>
    </div>
  );
}

function DateSelector() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="wfm-date-selector">
      <button className="wfm-date-selector__nav wfm-date-selector__nav--prev" title="Previous day">
        <Icon name="chevron_left" className="wfm-date-selector__nav-icon" size="sm" />
      </button>
      <button className="wfm-date-selector__date">
        <span>{formattedDate}</span>
        <ChevronDownIcon className="wfm-date-selector__chevron" />
      </button>
      <button className="wfm-date-selector__nav wfm-date-selector__nav--next" title="Next day">
        <Icon name="chevron_right" className="wfm-date-selector__nav-icon" size="sm" />
      </button>
    </div>
  );
}

export default function WFMPage({ onProductChange, selectedProduct, products, onOpenCommandPalette }) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState({ id: 2, name: 'Anne Hicks', avatar: 'AH' });
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);

  const handleToggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleSelectAgent = (agent) => {
    setSelectedAgent(agent);
    setIsSummaryOpen(true);
  };

  const handleCloseSummary = () => {
    setIsSummaryOpen(false);
  };

  return (
    <div className="wfm-page">
      <div className="wfm-page__body">
        {/* Navigation Column */}
        <div className={`wfm-page__nav-column ${isNavCollapsed ? 'wfm-page__nav-column--collapsed' : ''}`}>
          <NavHeader 
            onProductChange={onProductChange} 
            selectedProduct={selectedProduct} 
            products={products}
            isCollapsed={isNavCollapsed}
          />
          <WFMNav isCollapsed={isNavCollapsed} onToggleCollapse={handleToggleNav} />
        </div>
        
        {/* Content Column */}
        <div className="wfm-page__content-column">
          <ContentHeader onOpenCommandPalette={onOpenCommandPalette} />
        
          <main className="wfm-page__main">
            <div className="wfm-page__app-bar">
              <div className="wfm-page__app-bar-left">
                <h1 className="wfm-page__title">Agent activity</h1>
                <button className="wfm-page__filter-btn" title="Filter">
                  <FilterIcon className="wfm-page__filter-icon" />
                </button>
              </div>
              <DateSelector />
            </div>

            <div className="wfm-page__content">
              <AgentTimeline 
                onSelectAgent={handleSelectAgent}
                selectedAgent={selectedAgent}
              />
            </div>
          </main>
        </div>

        {/* Summary Panel */}
        {isSummaryOpen && (
          <WFMSummary 
            agent={selectedAgent}
            onClose={handleCloseSummary}
          />
        )}
      </div>
    </div>
  );
}

