import { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import { PrimarySidebar, SecondarySidebar } from './components/Sidebar';
import TicketList, { tickets } from './components/TicketList';
import ConversationPanel from './components/ConversationPanel';
import ResizableLayout from './components/ResizableLayout';
import AdminCenterPage from './components/AdminCenterPage';
import WFMPage from './components/WFMPage';
import TicketDetailPage from './components/TicketDetailPage';
import PageTransition from './components/PageTransition';
import TopBar from './components/TopBar/TopBar';
import Widgets from './components/Widgets/Widgets';
import { AdminCenterProductIcon, SupportProductIcon, WFMProductIcon } from './components/Icons';
import { useTheme } from './contexts';
import { QueueNotification, QueueNotificationsContainer } from './components/QueueNotifications/QueueNotifications';
import { VoiceCallWidget } from './components/VoiceCallWidget/VoiceCallWidget';
import './App.css';

const products = [
  { id: 'workforce', name: 'Workforce management', icon: WFMProductIcon },
  { id: 'support', name: 'Support', icon: SupportProductIcon },
  { id: 'admin', name: 'Admin center', icon: AdminCenterProductIcon, current: true },
];

const getTicketKey = (ticket) => `${ticket.id}__${ticket.title}`;

function NavPanel({ onToggleNav, isNavCollapsed }) {
  return (
    <div className="nav-panel">
      <div className="nav-panel__content">
        <PrimarySidebar isNavCollapsed={isNavCollapsed} onToggleNav={onToggleNav} />
        {!isNavCollapsed && <SecondarySidebar onToggle={onToggleNav} />}
      </div>
    </div>
  );
}

function MainContent({ selectedTicket, onSelectTicket, onCloseConversation, onStatusChange, currentTicketIndex, onPrevTicket, onNextTicket }) {
  return (
    <div className={`main-content ${selectedTicket ? 'main-content--with-conversation' : ''}`}>
      <div className={`main-content__ticket-list ${selectedTicket ? 'main-content__ticket-list--narrow' : ''}`}>
        <TicketList selectedTicket={selectedTicket} onSelectTicket={onSelectTicket} />
      </div>
      {selectedTicket ? (
        <div className="main-content__conversation">
          <ConversationPanel 
            ticket={selectedTicket} 
            onClose={onCloseConversation}
            onStatusChange={onStatusChange}
            currentIndex={currentTicketIndex}
            totalTickets={tickets.length}
            onPrevTicket={onPrevTicket}
            onNextTicket={onNextTicket}
          />
        </div>
      ) : (
        <div className="main-content__widgets">
          <Widgets />
        </div>
      )}
    </div>
  );
}

function App() {
  const [selectedProductId, setSelectedProductId] = useState(products.find(p => p.current)?.id ?? 'admin');
  const selectedProduct = products.find(p => p.id === selectedProductId) ?? products.find(p => p.current);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [openTicketTabs, setOpenTicketTabs] = useState([]);
  const { setCurrentProduct, setAgentStatus } = useTheme();

  // ── Demo sequence state ──────────────────────────────────
  // Sequence: 15s → notif1 → 15s → notif2 + status update → exit → voice widget
  const [notif1Visible, setNotif1Visible] = useState(false);
  const [notif2Visible, setNotif2Visible] = useState(false);
  const [voiceWidgetVisible, setVoiceWidgetVisible] = useState(false);
  const sequenceStartedRef = useRef(false);

  // Initialize current product on mount and sync when selectedProduct changes
  useEffect(() => {
    setCurrentProduct(selectedProduct?.id || 'support');
  }, [selectedProduct, setCurrentProduct]);

  // Demo sequence — runs once when the support main view is visible (no ticket open)
  useEffect(() => {
    const isMainSupportView = selectedProductId === 'support' && !selectedTicket;
    if (!isMainSupportView || sequenceStartedRef.current) return;

    sequenceStartedRef.current = true;

    // t=15s: first notification
    const t1 = setTimeout(() => {
      setNotif1Visible(true);
    }, 15_000);

    // t=30s: dismiss first, show second, update agent status
    const t2 = setTimeout(() => {
      setNotif1Visible(false);
      setNotif2Visible(true);
      setAgentStatus('available');
    }, 30_000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [selectedProductId, selectedTicket, setAgentStatus]);

  const handleProductChange = (product) => {
    setSelectedProductId(product.id);
    setCurrentProduct(product.id);
    setSelectedTicket(null);
  };

  const handleSelectTicket = useCallback((ticket) => {
    setOpenTicketTabs(prev => {
      const alreadyOpen = prev.some(t => getTicketKey(t) === getTicketKey(ticket));
      return alreadyOpen ? prev : [...prev, ticket];
    });
    setSelectedTicket(ticket);
  }, []);

  const handleCloseActionPanel = useCallback(() => {
    setSelectedTicket(null);
  }, []);

  const handleTicketTabClick = useCallback((ticket) => {
    setSelectedTicket(ticket);
  }, []);

  const handleTicketTabClose = useCallback((ticket) => {
    setOpenTicketTabs(prev => prev.filter(t => getTicketKey(t) !== getTicketKey(ticket)));
    setSelectedTicket(prev => prev && getTicketKey(prev) === getTicketKey(ticket) ? null : prev);
  }, []);

  const handleStatusChange = useCallback((newStatus) => {
    if (selectedTicket) {
      setSelectedTicket({ ...selectedTicket, status: newStatus });
    }
  }, [selectedTicket]);

  const handleVoiceCallAccept = useCallback(() => {
    setVoiceWidgetVisible(false);
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    const voiceTicket = {
      id: '1237',
      type: 'call',
      title: 'Rachel Adams | Incoming call',
      status: 'open',
      timestamp: `Today at ${hour12}:${minutes} ${ampm}`,
      preview: 'Incoming voice call',
      lastMessage: { name: 'Rachel Adams' },
      phoneNumber: '+1 415 555 0182',
    };
    setSelectedProductId('support');
    handleSelectTicket(voiceTicket);
  }, [handleSelectTicket]);

  // Calculate current ticket index
  const currentTicketIndex = selectedTicket 
    ? tickets.findIndex(t => t.id === selectedTicket.id && t.title === selectedTicket.title)
    : -1;

  const handlePrevTicket = useCallback(() => {
    if (currentTicketIndex > 0) {
      setSelectedTicket(tickets[currentTicketIndex - 1]);
    }
  }, [currentTicketIndex]);

  const handleNextTicket = useCallback(() => {
    if (currentTicketIndex < tickets.length - 1) {
      setSelectedTicket(tickets[currentTicketIndex + 1]);
    }
  }, [currentTicketIndex]);

  // Determine which page to render
  const isAdminPage = selectedProduct?.id === 'admin';
  const isWFMPage = selectedProduct?.id === 'workforce';
  const pageKey = selectedProduct?.id || 'support';

  const renderPageContent = () => {
    if (isAdminPage) {
      return (
        <AdminCenterPage 
          onProductChange={handleProductChange} 
          selectedProduct={selectedProduct} 
          products={products}
        />
      );
    }

    if (isWFMPage) {
      return (
        <WFMPage 
          onProductChange={handleProductChange} 
          selectedProduct={selectedProduct} 
          products={products}
        />
      );
    }

    if (selectedTicket) {
      return (
        <TicketDetailPage
          ticket={selectedTicket}
          onBack={handleCloseActionPanel}
          onNavigateHome={handleCloseActionPanel}
          onProductChange={handleProductChange}
          selectedProduct={selectedProduct}
          products={products}
          onStatusChange={handleStatusChange}
          currentTicketIndex={currentTicketIndex}
          totalTickets={tickets.length}
          onPrevTicket={handlePrevTicket}
          onNextTicket={handleNextTicket}
          openTicketTabs={openTicketTabs}
          onTicketTabClick={handleTicketTabClick}
          onTicketTabClose={handleTicketTabClose}
        />
      );
    }

    return (
      <div className="support-page">
        <TopBar
          selectedProduct={selectedProduct}
          products={products}
          onProductChange={handleProductChange}
          openTicketTabs={openTicketTabs}
          selectedTicket={selectedTicket}
          onTicketTabClick={handleTicketTabClick}
          onTicketTabClose={handleTicketTabClose}
        />
        <ResizableLayout
          navPanel={<NavPanel />}
          mainContent={
            <MainContent 
              selectedTicket={selectedTicket} 
              onSelectTicket={handleSelectTicket} 
              onCloseConversation={handleCloseActionPanel} 
              onStatusChange={handleStatusChange}
              currentTicketIndex={currentTicketIndex}
              onPrevTicket={handlePrevTicket}
              onNextTicket={handleNextTicket}
            />
          }
        />
      </div>
    );
  };

  return (
    <div className="app">
      <PageTransition pageKey={pageKey}>
        {renderPageContent()}
      </PageTransition>

      {/* Demo sequence overlays — rendered outside PageTransition so they float above everything */}
      <QueueNotificationsContainer>
        {notif1Visible && (
          <QueueNotification
            type="warning"
            title="You've been reassigned to Contact Center queue"
            body="Your schedule changed at 2:00 PM. Incoming tickets will now be from the Billing Support queue."
            autoDismissMs={6000}
            onDismiss={() => setNotif1Visible(false)}
          />
        )}
        {notif2Visible && (
          <QueueNotification
            type="success"
            title="Status updated to Online – Voice calls"
            body="Changed automatically based on your schedule"
            autoDismissMs={4000}
            onDismiss={() => setNotif2Visible(false)}
            onExited={() => setVoiceWidgetVisible(true)}
          />
        )}
      </QueueNotificationsContainer>

      {voiceWidgetVisible && (
        <VoiceCallWidget
          onAccept={handleVoiceCallAccept}
          onDecline={() => setVoiceWidgetVisible(false)}
        />
      )}
    </div>
  );
}

export default App;
