import { useState } from 'react';
import { IconButton } from '@zendeskgarden/react-buttons';
import WFMNav from './WFMNav';
import AgentTimeline from './AgentTimeline';
import WFMSummary from './WFMSummary';
import TopBar from '../TopBar/TopBar';
import { ChevronDownIcon, WFMLogoIcon, FilterIcon, Icon } from '../Icons';
import './WFMPage.css';


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

export default function WFMPage({ onProductChange, selectedProduct, products }) {
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
      <TopBar
        selectedProduct={selectedProduct}
        products={products}
        onProductChange={onProductChange}
        isNavCollapsed={isNavCollapsed}
      />
      <div className="wfm-page__body">
        {/* Navigation Column */}
        <WFMNav isCollapsed={isNavCollapsed} onToggleCollapse={handleToggleNav} />
        
        {/* Content Column */}
        <div className="wfm-page__content-column">
        
          <main className="wfm-page__main">
            <div className="wfm-page__app-bar">
              <div className="wfm-page__app-bar-left">
                <h1 className="wfm-page__title">Agent activity</h1>
                <IconButton aria-label="Filter" isBasic className="wfm-page__filter-btn">
                  <FilterIcon className="wfm-page__filter-icon" />
                </IconButton>
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

