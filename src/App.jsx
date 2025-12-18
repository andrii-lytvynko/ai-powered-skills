import { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import { PrimarySidebar, SecondarySidebar } from './components/Sidebar';
import TicketList from './components/TicketList';
import Widgets from './components/Widgets';
import { ActionPanel } from './components/Panel';
import ResizableLayout from './components/ResizableLayout';
import QAPage from './components/QAPage';
import AdminCenterPage from './components/AdminCenterPage';
import KnowledgePage from './components/KnowledgePage';
import AIAgentsPage from './components/AIAgentsPage';
import WFMPage from './components/WFMPage';
import PageTransition from './components/PageTransition';
import { CommandPalette } from './components/CommandPalette';
import { ZendeskLogo, ChevronDownIcon, CheckIcon, SparkleIcon, ChartIcon, GearIcon, InboxIcon, ShapesIcon, ContactsIcon, QALogoIcon, AIAgentsLogoIcon, WFMLogoIcon } from './components/Icons';
import './App.css';

const products = [
  { id: 'quality', name: 'Quality assurance', icon: QALogoIcon },
  { id: 'workforce', name: 'Workforce management', icon: WFMLogoIcon },
  { id: 'support', name: 'Support', icon: InboxIcon, current: true },
  { id: 'admin', name: 'Admin center', icon: GearIcon },
  { id: 'ai-agents', name: 'AI agents', icon: AIAgentsLogoIcon },
  { id: 'knowledge', name: 'Knowledge', icon: ShapesIcon },
  { id: 'analytics', name: 'Analytics', icon: ChartIcon },
];

function NavTopBar({ onProductChange, selectedProduct }) {
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
    onProductChange(product);
    setIsOpen(false);
  };

  return (
    <div className="nav-top-bar" ref={dropdownRef}>
      <div className="nav-top-bar__logo">
        <ZendeskLogo className="nav-top-bar__logo-icon" />
      </div>
      <button 
        className={`nav-top-bar__product-selector ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="nav-top-bar__product-name">{selectedProduct?.name}</span>
        <ChevronDownIcon className={`nav-top-bar__chevron ${isOpen ? 'rotated' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="nav-top-bar__dropdown">
          <div className="nav-top-bar__dropdown-list">
            {products.map((product) => {
              const Icon = product.icon;
              const isSelected = selectedProduct?.id === product.id;
              return (
                <button
                  key={product.id}
                  className={`nav-top-bar__dropdown-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleProductSelect(product)}
                >
                  <Icon className="nav-top-bar__dropdown-icon" />
                  <span className="nav-top-bar__dropdown-name">{product.name}</span>
                  {isSelected && <CheckIcon className="nav-top-bar__dropdown-check" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function NavPanel({ onToggleNav, isNavCollapsed, onProductChange, selectedProduct }) {
  return (
    <div className="nav-panel">
      <NavTopBar onProductChange={onProductChange} selectedProduct={selectedProduct} />
      <div className="nav-panel__content">
        <PrimarySidebar isNavCollapsed={isNavCollapsed} onToggleNav={onToggleNav} />
        {!isNavCollapsed && <SecondarySidebar onToggle={onToggleNav} />}
      </div>
    </div>
  );
}

function MainContent({ selectedTicket, onSelectTicket }) {
  return (
    <div className="main-content">
      <TicketList selectedTicket={selectedTicket} onSelectTicket={onSelectTicket} />
    </div>
  );
}

function WidgetsPanel() {
  return (
    <div className="widgets-panel">
      <Widgets />
    </div>
  );
}

function ActionPanelWrapper({ selectedTicket, onClose, onStatusChange }) {
  return (
    <div className="action-panel-wrapper">
      <ActionPanel 
        ticket={selectedTicket} 
        onClose={onClose}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState(products.find(p => p.current));
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleProductChange = (product) => {
    setSelectedProduct(product);
    // Clear selected ticket when changing pages
    setSelectedTicket(null);
  };

  const handleSelectTicket = useCallback((ticket) => {
    setSelectedTicket(ticket);
  }, []);

  const handleCloseActionPanel = useCallback(() => {
    setSelectedTicket(null);
  }, []);

  const handleStatusChange = useCallback((newStatus) => {
    if (selectedTicket) {
      setSelectedTicket({ ...selectedTicket, status: newStatus });
    }
  }, [selectedTicket]);

  // Global keyboard shortcut for Command Palette (⌘+K / Ctrl+K)
  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommandSelect = useCallback((command) => {
    console.log('Command selected:', command);
    // Handle navigation or action based on command
    // You can add logic here to navigate to different pages or trigger actions
  }, []);

  const handleAIQuery = useCallback((query) => {
    console.log('AI Query:', query);
    // Handle AI query - could open a chat or process the request
  }, []);

  const handleNavigate = useCallback((targetPage) => {
    const targetProduct = products.find(p => p.id === targetPage);
    if (targetProduct) {
      setSelectedProduct(targetProduct);
    }
  }, []);

  const openCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(true);
  }, []);

  // Determine which page to render
  const isQAPage = selectedProduct?.id === 'quality';
  const isAdminPage = selectedProduct?.id === 'admin';
  const isKnowledgePage = selectedProduct?.id === 'knowledge';
  const isAIAgentsPage = selectedProduct?.id === 'ai-agents';
  const isWFMPage = selectedProduct?.id === 'workforce';
  const pageKey = selectedProduct?.id || 'support';

  const renderPageContent = () => {
    if (isQAPage) {
      return (
        <QAPage 
          onProductChange={handleProductChange} 
          selectedProduct={selectedProduct} 
          products={products}
          onOpenCommandPalette={openCommandPalette}
        />
      );
    }

    if (isAdminPage) {
      return (
        <AdminCenterPage 
          onProductChange={handleProductChange} 
          selectedProduct={selectedProduct} 
          products={products}
          onOpenCommandPalette={openCommandPalette}
        />
      );
    }

    if (isKnowledgePage) {
      return (
        <KnowledgePage 
          onProductChange={handleProductChange} 
          selectedProduct={selectedProduct} 
          products={products}
          onOpenCommandPalette={openCommandPalette}
        />
      );
    }

    if (isAIAgentsPage) {
      return (
        <AIAgentsPage 
          onProductChange={handleProductChange} 
          selectedProduct={selectedProduct} 
          products={products}
          onOpenCommandPalette={openCommandPalette}
        />
      );
    }

    if (isWFMPage) {
      return (
        <WFMPage 
          onProductChange={handleProductChange} 
          selectedProduct={selectedProduct} 
          products={products}
          onOpenCommandPalette={openCommandPalette}
        />
      );
    }

    return (
      <ResizableLayout
        navPanel={<NavPanel onProductChange={handleProductChange} selectedProduct={selectedProduct} />}
        topBar={<Header onOpenCommandPalette={openCommandPalette} />}
        mainContent={<MainContent selectedTicket={selectedTicket} onSelectTicket={handleSelectTicket} />}
        actionPanel={selectedTicket ? <ActionPanelWrapper selectedTicket={selectedTicket} onClose={handleCloseActionPanel} onStatusChange={handleStatusChange} /> : null}
        widgetsPanel={<WidgetsPanel />}
      />
    );
  };

  return (
    <div className="app">
      <PageTransition pageKey={pageKey}>
        {renderPageContent()}
      </PageTransition>
      
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        currentPage={selectedProduct?.id || 'support'}
        onCommandSelect={handleCommandSelect}
        onAIQuery={handleAIQuery}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
