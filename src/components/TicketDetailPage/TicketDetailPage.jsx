import { PrimarySidebar } from '../Sidebar';
import ConversationPanel from '../ConversationPanel';
import TopBar from '../TopBar/TopBar';
import './TicketDetailPage.css';

export default function TicketDetailPage({
  ticket,
  onBack,
  onNavigateHome,
  onProductChange,
  selectedProduct,
  products,
  onStatusChange,
  currentTicketIndex,
  totalTickets,
  onPrevTicket,
  onNextTicket,
  openTicketTabs = [],
  onTicketTabClick,
  onTicketTabClose,
}) {
  return (
    <div className="ticket-detail-page">
      <TopBar
        selectedProduct={selectedProduct}
        products={products}
        onProductChange={onProductChange}
        openTicketTabs={openTicketTabs}
        selectedTicket={ticket}
        onTicketTabClick={onTicketTabClick}
        onTicketTabClose={onTicketTabClose}
      />
      <div className="ticket-detail-page__body">
        <PrimarySidebar onNavigateHome={onNavigateHome || onBack} />
        <div className="ticket-detail-page__content">
          <ConversationPanel
            ticket={ticket}
            onClose={onBack}
            onStatusChange={onStatusChange}
            currentIndex={currentTicketIndex}
            totalTickets={totalTickets}
            onPrevTicket={onPrevTicket}
            onNextTicket={onNextTicket}
          />
        </div>
      </div>
    </div>
  );
}
