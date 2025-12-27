import { InfoIcon, ChevronDownIcon } from '../Icons';
import './KnowledgeGaps.css';

const bubbleData = [
  { id: 1, label: 'Order Status', size: 116, x: 34, y: 102, primary: true },
  { id: 2, label: 'How do I update my card status?', size: 126, x: 150, y: 138 },
  { id: 3, label: 'Postpone payments', size: 97, x: 115, y: 0 },
  { id: 4, label: 'When will I receive my funds?', size: 99, x: 94, y: 262 },
  { id: 5, label: 'Please call me', size: 81, x: 0, y: 230 },
  { id: 6, label: 'Technical issues', size: 71, x: 216, y: 275 },
  { id: 7, label: 'Card payment', size: 60, x: 275, y: 228 },
  { id: 8, label: 'My status...', size: 65, x: 271, y: 107 },
  { id: 9, label: 'Do you offer...', size: 75, x: 220, y: 30 },
  { id: 10, label: 'Close my ac...', size: 97, x: 10, y: 4 },
];

const tableData = [
  { id: 1, message: "Hello, I placed an order last week, and I'm wondering about the current status. Can you provide an update?" },
  { id: 2, message: "I received a notification that my order has shipped. Can you give me the tracking information, please?" },
  { id: 3, message: "I'm excited about my recent purchase but haven't received any order status updates. Can you help me out?" },
  { id: 4, message: "My order was marked as 'Out for Delivery' a day ago, but I still haven't received it. What's going on?" },
  { id: 5, message: "I accidentally placed my order with the wrong shipping address. Can I change it before the order ships?" },
  { id: 6, message: "I ordered a product a while ago, and the order status still shows 'Processing.' Can you tell me when it will ship?" },
  { id: 7, message: "I need to return an item from my recent order. Can you guide me on how to do that?" },
  { id: 8, message: "I received an email that my order is delayed. Can you provide more information on the delay and when I can expect it?" },
  { id: 9, message: "My order arrived, but it's missing an item. What should I do to get the missing item?" },
  { id: 10, message: "I want to cancel my order, but I'm not sure how to do it. Can you assist me with the cancellation process?" },
];

export default function KnowledgeGaps() {
  return (
    <div className="knowledge-gaps">
      <div className="knowledge-gaps__header">
        <div className="knowledge-gaps__title-group">
          <h3 className="knowledge-gaps__title">Knowledge Gaps</h3>
          <InfoIcon className="knowledge-gaps__info-icon" />
        </div>
      </div>
      
      <div className="knowledge-gaps__content">
        <div className="knowledge-gaps__bubbles">
          <div className="knowledge-gaps__bubble-container">
            {bubbleData.map((bubble) => (
              <div
                key={bubble.id}
                className={`knowledge-gaps__bubble ${bubble.primary ? 'knowledge-gaps__bubble--primary' : ''}`}
                style={{
                  width: bubble.size,
                  height: bubble.size,
                  left: bubble.x,
                  top: bubble.y,
                }}
              >
                <span className="knowledge-gaps__bubble-label">{bubble.label}</span>
              </div>
            ))}
          </div>
          <p className="knowledge-gaps__sync-text">Based on data synced on Sunday at 23:59:59 UTC</p>
        </div>
        
        <div className="knowledge-gaps__table">
          <div className="knowledge-gaps__table-header">
            <div className="knowledge-gaps__table-cell knowledge-gaps__table-cell--header">
              <span>Topic: Order Status (56%)</span>
              <div className="knowledge-gaps__sort-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div className="knowledge-gaps__table-actions">
              <button className="knowledge-gaps__action-btn knowledge-gaps__action-btn--primary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L9.5 5.5L14 7L9.5 8.5L8 13L6.5 8.5L2 7L6.5 5.5L8 1Z" fill="currentColor"/>
                </svg>
                Intent Assistant
              </button>
              <button className="knowledge-gaps__action-btn knowledge-gaps__action-btn--outline">
                Add Expressions
              </button>
            </div>
          </div>
          
          <div className="knowledge-gaps__table-body">
            {tableData.map((row) => (
              <div key={row.id} className="knowledge-gaps__table-row">
                <div className="knowledge-gaps__table-cell">
                  {row.message}
                </div>
              </div>
            ))}
          </div>
          
          <div className="knowledge-gaps__table-footer">
            <span className="knowledge-gaps__results-count">10 Results</span>
            <div className="knowledge-gaps__pagination">
              <span className="knowledge-gaps__page-info">Page</span>
              <div className="knowledge-gaps__page-input">1</div>
              <span className="knowledge-gaps__page-info">of 1</span>
              <div className="knowledge-gaps__page-controls">
                <button className="knowledge-gaps__page-btn" disabled>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M7.5 9L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <button className="knowledge-gaps__page-btn" disabled>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





