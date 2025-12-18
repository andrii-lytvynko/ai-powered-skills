import { useState, useRef, useEffect } from 'react';
import QANav from './QANav';
import FilterBar from './FilterBar';
import MetricCard from './MetricCard';
import HorizontalBarChart from './HorizontalBarChart';
import LineChart from './LineChart';
import ProfileMenu from '../ProfileMenu';
import { DisplayIcon, ChevronDownIcon, CheckIcon, SearchIcon, BellIcon, HelpIcon, QALogoIcon } from '../Icons';
import './QAPage.css';

const metrics = [
  { 
    title: 'Total auto-reviews', 
    value: '299.3k', 
    trend: 'up', 
    trendValue: '0.12%',
    info: 'Total number of automated reviews processed'
  },
  { 
    title: 'Auto-reviews per reviewee', 
    value: '4.5k', 
    trend: 'up', 
    trendValue: '0.12%',
    info: 'Average auto-reviews per agent'
  },
  { 
    title: 'Acceptance rate', 
    value: '89.2%', 
    trend: 'up', 
    trendValue: '1.1%',
    info: 'Rate of accepted automated reviews'
  },
  { 
    title: 'Total manual reviews', 
    value: '2.1k', 
    trend: 'down', 
    trendValue: '0.2%',
    info: 'Total number of manual reviews'
  },
  { 
    title: 'Manual reviews per reviewee', 
    value: '24.3', 
    trend: 'down', 
    trendValue: '0.1%',
    info: 'Average manual reviews per agent'
  },
  { 
    title: 'Auto vs manual ratio', 
    value: '99.6%', 
    trend: 'up', 
    trendValue: '0.1%',
    info: 'Ratio of auto to manual reviews'
  },
];

const barChartData = [
  { name: 'Closing', value: 100, percentage: 100 },
  { name: 'Empathy', value: 50, percentage: 50 },
  { name: 'Greeting', value: 32, percentage: 32 },
  { name: 'Spelling & Grammar', value: 28, percentage: 28 },
  { name: 'Tone', value: 24, percentage: 24 },
];

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
    <div className={`qa-nav-header ${isCollapsed ? 'qa-nav-header--collapsed' : ''}`} ref={dropdownRef}>
      <div className="qa-nav-header__logo">
        <QALogoIcon className="qa-nav-header__logo-icon" />
      </div>
      {!isCollapsed && (
        <>
          <button 
            className={`qa-nav-header__product-selector ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="qa-nav-header__product-name">{selectedProduct?.name || 'Quality assurance'}</span>
            <ChevronDownIcon className={`qa-nav-header__chevron ${isOpen ? 'rotated' : ''}`} />
          </button>
          
          {isOpen && products.length > 0 && (
            <div className="qa-nav-header__dropdown">
              <div className="qa-nav-header__dropdown-list">
                {products.map((product) => {
                  const Icon = product.icon;
                  const isSelected = selectedProduct?.id === product.id;
                  return (
                    <button
                      key={product.id}
                      className={`qa-nav-header__dropdown-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleProductSelect(product)}
                    >
                      <Icon className="qa-nav-header__dropdown-icon" />
                      <span className="qa-nav-header__dropdown-name">{product.name}</span>
                      {isSelected && <CheckIcon className="qa-nav-header__dropdown-check" />}
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
    <div className="qa-content-header">
      <button 
        className="qa-content-header__search"
        onClick={onOpenCommandPalette}
        type="button"
      >
        <SearchIcon className="qa-content-header__search-icon" />
        <span className="qa-content-header__search-text">Search for apps and commands or ask AI...</span>
        <span className="qa-content-header__search-shortcut">⌘ + K</span>
      </button>
      
      <div className="qa-content-header__right">
        <button className="qa-content-header__icon-btn" title="Notifications">
          <BellIcon className="qa-content-header__icon" />
        </button>
        <ProfileMenu />
      </div>
    </div>
  );
}

export default function QAPage({ onProductChange, selectedProduct, products, onOpenCommandPalette }) {
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const handleToggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <div className="qa-page">
      <div className="qa-page__body">
        {/* Navigation Column */}
        <div className={`qa-page__nav-column ${isNavCollapsed ? 'qa-page__nav-column--collapsed' : ''}`}>
          <NavHeader 
            onProductChange={onProductChange} 
            selectedProduct={selectedProduct} 
            products={products}
            isCollapsed={isNavCollapsed}
          />
          <QANav isCollapsed={isNavCollapsed} onToggleCollapse={handleToggleNav} />
        </div>
        
        {/* Content Column */}
        <div className="qa-page__content-column">
          <ContentHeader onOpenCommandPalette={onOpenCommandPalette} />
      
          <main className="qa-page__main">
        <div className="qa-page__app-bar">
          <div className="qa-page__breadcrumb">
            <span className="qa-page__breadcrumb-text">AutoQA</span>
          </div>
          <button className="qa-page__display-btn">
            <DisplayIcon className="qa-page__display-icon" />
            <span>Display</span>
          </button>
        </div>

        <div className="qa-page__content">
          <FilterBar />

          <div className="qa-page__metrics">
            <div className="qa-page__metrics-row">
              {metrics.slice(0, 3).map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>
            <div className="qa-page__metrics-row">
              {metrics.slice(3, 6).map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>
          </div>

          <section className="qa-page__section">
            <h2 className="qa-page__section-title">Acceptance rate</h2>
            <div className="qa-page__section-hint">
              <span className="qa-page__hint-badge">Drilldown available on this chart</span>
              Click on bar chart items to see more info
            </div>
            <HorizontalBarChart 
              title="Acceptance rate per category" 
              data={barChartData}
              moreCount={1}
            />
          </section>

          <section className="qa-page__section">
            <LineChart title="Quality score over time" />
          </section>
        </div>
          </main>
        </div>
      </div>
    </div>
  );
}

