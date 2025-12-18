import { useState, useRef, useEffect } from 'react';
import KnowledgeNav from './KnowledgeNav';
import ArticleTable from './ArticleTable';
import ProfileMenu from '../ProfileMenu';
import { ChevronDownIcon, CheckIcon, SearchIcon, BellIcon, ShapesIcon } from '../Icons';
import './KnowledgePage.css';
import '../AIAgentsPage/ArticleInsights.css';

// Icon components
function FilterIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function SortIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 5L11 11M11 11L8 8M11 11L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 11L5 5M5 5L2 8M5 5L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SearchInputIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function SaveIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 8H11M8 5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

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
    <div className={`knowledge-nav-header ${isCollapsed ? 'knowledge-nav-header--collapsed' : ''}`} ref={dropdownRef}>
      <div className="knowledge-nav-header__logo">
        <ShapesIcon className="knowledge-nav-header__logo-icon" />
      </div>
      {!isCollapsed && (
        <>
          <button 
            className={`knowledge-nav-header__product-selector ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="knowledge-nav-header__product-name">{selectedProduct?.name || 'Knowledge'}</span>
            <ChevronDownIcon className={`knowledge-nav-header__chevron ${isOpen ? 'rotated' : ''}`} />
          </button>
          
          {isOpen && products.length > 0 && (
            <div className="knowledge-nav-header__dropdown">
              <div className="knowledge-nav-header__dropdown-list">
                {products.map((product) => {
                  const Icon = product.icon;
                  const isSelected = selectedProduct?.id === product.id;
                  return (
                    <button
                      key={product.id}
                      className={`knowledge-nav-header__dropdown-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleProductSelect(product)}
                    >
                      <Icon className="knowledge-nav-header__dropdown-icon" />
                      <span className="knowledge-nav-header__dropdown-name">{product.name}</span>
                      {isSelected && <CheckIcon className="knowledge-nav-header__dropdown-check" />}
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
    <div className="knowledge-content-header">
      <button 
        className="knowledge-content-header__search"
        onClick={onOpenCommandPalette}
        type="button"
      >
        <SearchIcon className="knowledge-content-header__search-icon" />
        <span className="knowledge-content-header__search-text">Search for apps and commands or ask AI...</span>
        <span className="knowledge-content-header__search-shortcut">⌘ + K</span>
      </button>
      
      <div className="knowledge-content-header__right">
        <button className="knowledge-content-header__icon-btn" title="Notifications">
          <BellIcon className="knowledge-content-header__icon" />
        </button>
        <ProfileMenu />
      </div>
    </div>
  );
}

// Close icon for filter tags
function CloseIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function KnowledgePage({ onProductChange, selectedProduct, products, onOpenCommandPalette }) {
  const [selectedView, setSelectedView] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([
    { id: 1, type: 'Status', value: 'Published', color: 'green' },
    { id: 2, type: 'Author', value: 'Sarah Chen', color: 'blue' },
    { id: 3, type: 'Category', value: 'Getting Started', color: 'purple' },
  ]);
  const filterRef = useRef(null);

  const handleToggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  // Handle click outside for filter dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isFilterOpen]);

  const handleRemoveFilter = (filterId) => {
    setActiveFilters(activeFilters.filter(f => f.id !== filterId));
  };

  const handleClearAllFilters = () => {
    setActiveFilters([]);
    setIsFilterOpen(false);
  };

  // Get view title based on selected view
  const getViewTitle = () => {
    const viewTitles = {
      'all': 'All articles',
      'published': 'Published articles',
      'drafts': 'Draft articles',
      'in-progress': 'In progress',
      'awaiting-review': 'Awaiting review',
      'ready-to-publish': 'Ready to publish',
      'procedures': 'Procedures',
      'content-blocks': 'Content blocks',
      'components': 'Components',
      'rules': 'Rules',
      'styles': 'Styles',
      'templates': 'Templates',
      'flows': 'Flows',
      'assigned-to-me': 'Assigned to me',
      'scheduled': 'Scheduled',
    };
    return viewTitles[selectedView] || 'All articles';
  };

  const getViewDescription = () => {
    const descriptions = {
      'all': 'View and manage all articles in your knowledge base',
      'published': 'Articles that are live and visible to users',
      'drafts': 'Articles that are being worked on but not yet published',
      'in-progress': 'Articles currently being reviewed or edited',
      'awaiting-review': 'Articles waiting for approval before publishing',
      'ready-to-publish': 'Articles that have been approved and are ready to go live',
    };
    return descriptions[selectedView] || 'Browse and manage your content';
  };

  return (
    <div className="knowledge-page">
      <div className="knowledge-page__body">
        {/* Navigation Column */}
        <div className={`knowledge-page__nav-column ${isNavCollapsed ? 'knowledge-page__nav-column--collapsed' : ''}`}>
          <NavHeader 
            onProductChange={onProductChange} 
            selectedProduct={selectedProduct} 
            products={products}
            isCollapsed={isNavCollapsed}
          />
          <KnowledgeNav 
            selectedView={selectedView} 
            onSelectView={setSelectedView}
            isCollapsed={isNavCollapsed}
            onToggleCollapse={handleToggleNav}
          />
        </div>
        
        {/* Content Column */}
        <div className="knowledge-page__content-column">
          <ContentHeader onOpenCommandPalette={onOpenCommandPalette} />
        
        <main className="knowledge-page__main">
          <div className="knowledge-page__content">
            {/* Page Header */}
            <div className="knowledge-page__header">
              <div className="knowledge-page__header-top">
                <div>
                  <h1 className="knowledge-page__title">{getViewTitle()}</h1>
                  <p className="knowledge-page__description">{getViewDescription()}</p>
                </div>
                <button className="article-insights__btn">
                  <SaveIcon className="knowledge-page__save-icon" />
                  <span>Save search as list</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="knowledge-page__filter-bar">
              <div className="knowledge-page__filter-group" ref={filterRef}>
                <button 
                  className={`knowledge-page__filter-btn ${activeFilters.length > 0 ? 'knowledge-page__filter-btn--active' : ''}`}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <FilterIcon className="knowledge-page__filter-icon" />
                  <span>Filters</span>
                  {activeFilters.length > 0 && (
                    <span className="knowledge-page__filter-badge">{activeFilters.length}</span>
                  )}
                  <ChevronDownIcon className={`knowledge-page__filter-icon ${isFilterOpen ? 'knowledge-page__filter-icon--rotated' : ''}`} />
                </button>

                {/* Filter Dropdown */}
                {isFilterOpen && (
                  <div className="knowledge-page__filter-dropdown">
                    <div className="knowledge-page__filter-dropdown-header">
                      <span className="knowledge-page__filter-dropdown-title">Applied filters</span>
                      {activeFilters.length > 0 && (
                        <button 
                          className="knowledge-page__filter-clear-btn"
                          onClick={handleClearAllFilters}
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    
                    {activeFilters.length > 0 ? (
                      <div className="knowledge-page__filter-tags">
                        {activeFilters.map((filter) => (
                          <div 
                            key={filter.id} 
                            className={`knowledge-page__filter-tag knowledge-page__filter-tag--${filter.color}`}
                          >
                            <span className="knowledge-page__filter-tag-type">{filter.type}:</span>
                            <span className="knowledge-page__filter-tag-value">{filter.value}</span>
                            <button 
                              className="knowledge-page__filter-tag-remove"
                              onClick={() => handleRemoveFilter(filter.id)}
                            >
                              <CloseIcon />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="knowledge-page__filter-empty">
                        <span>No filters applied</span>
                      </div>
                    )}

                    <div className="knowledge-page__filter-dropdown-footer">
                      <button className="knowledge-page__filter-add-btn">
                        <span>+ Add filter</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <button className="knowledge-page__sort-btn">
                <SortIcon className="knowledge-page__sort-icon" />
                <span>Sort</span>
                <ChevronDownIcon className="knowledge-page__sort-icon" />
              </button>
            </div>

            {/* Search and Table */}
            <div className="knowledge-page__search-section">
              <div className="knowledge-page__search-bar">
                <div className="knowledge-page__search-input-wrapper">
                  <SearchInputIcon className="knowledge-page__search-icon" />
                  <input
                    type="text"
                    className="knowledge-page__search-input"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="knowledge-page__results-count">
                13 articles
              </div>
              
              <ArticleTable />
            </div>
          </div>
        </main>
        </div>
      </div>
    </div>
  );
}
