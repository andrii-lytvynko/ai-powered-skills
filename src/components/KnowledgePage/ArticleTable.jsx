import { useState } from 'react';
import './ArticleTable.css';

// Article status icons
function PublishedIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="5" fill="#d0d33f"/>
    </svg>
  );
}

function DraftIcon({ className }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="4.5" stroke="#68737d" strokeWidth="1"/>
    </svg>
  );
}

function SortIcon({ className, direction }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: direction === 'desc' ? 'rotate(180deg)' : 'none' }}>
      <path d="M8 4V12M8 4L5 7M8 4L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ColumnsIcon({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="5" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="10" y="5" width="5" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="17" y="5" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

const articles = [
  {
    id: 1,
    title: 'What is your refund policy?',
    status: 'draft',
    edited: '2d ago',
    placement: 'Refunds & returns',
    reviewStatus: 'in-progress'
  },
  {
    id: 2,
    title: 'How to Order Coffee Online',
    status: 'published',
    edited: '2h ago',
    placement: 'Placing an Order',
    reviewStatus: 'ready-to-publish'
  },
  {
    id: 3,
    title: 'What Payment Methods Do You Accept?',
    status: 'published',
    edited: '45 min ago',
    placement: 'Payment & Billing',
    reviewStatus: 'ready-to-publish'
  },
  {
    id: 4,
    title: 'How Do I Track My Online Order?',
    status: 'published',
    edited: '32 min ago',
    placement: 'Tracking Orders',
    reviewStatus: 'ready-to-publish'
  },
  {
    id: 5,
    title: 'How Do I Check My Gift Card Balance?',
    status: 'draft',
    edited: '51 min ago',
    placement: 'Gift Cards & Loy...',
    reviewStatus: 'in-progress'
  },
  {
    id: 6,
    title: 'Do You Offer Dairy-Free or Vegan Options?',
    status: 'draft',
    edited: '1h ago',
    placement: 'Menu & Ingredie...',
    reviewStatus: 'in-progress'
  },
  {
    id: 7,
    title: 'Where Do You Source Your Coffee Beans...',
    status: 'published',
    edited: '21 min ago',
    placement: 'Menu & Ingredi...',
    reviewStatus: null
  },
  {
    id: 8,
    title: 'How Does the Loyalty Program Work?',
    status: 'draft',
    edited: '16 min ago',
    placement: 'Gift Cards & Loy...',
    reviewStatus: 'in-progress'
  },
  {
    id: 9,
    title: 'Can I Cancel My Order After Placing It?',
    status: 'draft',
    edited: '12 min ago',
    placement: 'Refunds & returns',
    reviewStatus: 'in-progress'
  },
  {
    id: 10,
    title: 'What Are Your Delivery Fees?',
    status: 'draft',
    edited: '8 min ago',
    placement: 'Pickup & Delive...',
    reviewStatus: 'in-progress'
  },
  {
    id: 11,
    title: 'My Order Didn\'t Arrive—What Should I Do?',
    status: 'draft',
    edited: '5 min ago',
    placement: 'Tracking Orders',
    reviewStatus: 'in-progress'
  },
  {
    id: 12,
    title: 'Why Was My Payment Declined?',
    status: 'draft',
    edited: '4h ago',
    placement: 'Payment & Billing',
    reviewStatus: 'awaiting-review'
  },
  {
    id: 13,
    title: 'Can I Customize My Coffee Order?',
    status: 'published',
    edited: '1d ago',
    placement: 'Placing an Order',
    reviewStatus: 'ready-to-publish'
  },
];

function ReviewStatusBadge({ status }) {
  if (!status) return null;
  
  const statusConfig = {
    'in-progress': { label: 'In progress', className: 'in-progress' },
    'awaiting-review': { label: 'Awaiting review', className: 'awaiting-review' },
    'ready-to-publish': { label: 'Ready to publish', className: 'ready-to-publish' },
  };
  
  const config = statusConfig[status];
  if (!config) return null;
  
  return (
    <span className={`article-table__badge article-table__badge--${config.className}`}>
      {config.label}
    </span>
  );
}

function Checkbox({ checked, onChange, indeterminate }) {
  return (
    <div 
      className={`article-table__checkbox ${checked ? 'checked' : ''} ${indeterminate ? 'indeterminate' : ''}`}
      onClick={onChange}
    >
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {indeterminate && (
        <svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 1H8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )}
    </div>
  );
}

export default function ArticleTable() {
  const [selectedArticles, setSelectedArticles] = useState(new Set());
  const [sortColumn, setSortColumn] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSelectAll = () => {
    if (selectedArticles.size === articles.length) {
      setSelectedArticles(new Set());
    } else {
      setSelectedArticles(new Set(articles.map(a => a.id)));
    }
  };

  const handleSelectArticle = (id) => {
    const newSelection = new Set(selectedArticles);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedArticles(newSelection);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Sort articles based on current sort column and direction
  const sortedArticles = [...articles].sort((a, b) => {
    let aVal = a[sortColumn];
    let bVal = b[sortColumn];
    
    // Handle null/undefined values
    if (aVal == null) aVal = '';
    if (bVal == null) bVal = '';
    
    // String comparison
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const isAllSelected = selectedArticles.size === articles.length;
  const isSomeSelected = selectedArticles.size > 0 && selectedArticles.size < articles.length;

  return (
    <div className="article-table">
      <div className="article-table__header">
        <div className="article-table__header-cell article-table__header-cell--checkbox">
          <Checkbox 
            checked={isAllSelected} 
            indeterminate={isSomeSelected}
            onChange={handleSelectAll} 
          />
        </div>
        <div 
          className={`article-table__header-cell article-table__header-cell--title ${sortColumn === 'title' ? 'sorted' : ''}`}
          onClick={() => handleSort('title')}
        >
          <span>Title</span>
          <SortIcon className="article-table__sort-icon" direction={sortColumn === 'title' ? sortDirection : null} />
        </div>
        <div 
          className={`article-table__header-cell article-table__header-cell--edited ${sortColumn === 'edited' ? 'sorted' : ''}`}
          onClick={() => handleSort('edited')}
        >
          <span>Edited</span>
          <SortIcon className="article-table__sort-icon" direction={sortColumn === 'edited' ? sortDirection : null} />
        </div>
        <div 
          className={`article-table__header-cell article-table__header-cell--placement ${sortColumn === 'placement' ? 'sorted' : ''}`}
          onClick={() => handleSort('placement')}
        >
          <span>Placement</span>
          <SortIcon className="article-table__sort-icon" direction={sortColumn === 'placement' ? sortDirection : null} />
        </div>
        <div 
          className={`article-table__header-cell article-table__header-cell--status ${sortColumn === 'reviewStatus' ? 'sorted' : ''}`}
          onClick={() => handleSort('reviewStatus')}
        >
          <span>Review status</span>
          <SortIcon className="article-table__sort-icon" direction={sortColumn === 'reviewStatus' ? sortDirection : null} />
        </div>
        <div className="article-table__header-cell article-table__header-cell--actions">
          <button className="article-table__columns-btn" title="Configure columns">
            <ColumnsIcon className="article-table__columns-icon" />
          </button>
        </div>
      </div>
      
      <div className="article-table__body">
        {sortedArticles.map((article) => (
          <div 
            key={article.id} 
            className={`article-table__row ${selectedArticles.has(article.id) ? 'selected' : ''}`}
          >
            <div className="article-table__cell article-table__cell--checkbox">
              <Checkbox 
                checked={selectedArticles.has(article.id)} 
                onChange={() => handleSelectArticle(article.id)} 
              />
            </div>
            <div className="article-table__cell article-table__cell--title">
              {article.status === 'published' ? (
                <PublishedIcon className="article-table__status-icon" />
              ) : (
                <DraftIcon className="article-table__status-icon" />
              )}
              <span className="article-table__article-title">{article.title}</span>
            </div>
            <div className="article-table__cell article-table__cell--edited">
              <span className="article-table__cell-text">{article.edited}</span>
            </div>
            <div className="article-table__cell article-table__cell--placement">
              <span className="article-table__cell-text">{article.placement}</span>
            </div>
            <div className="article-table__cell article-table__cell--status">
              <ReviewStatusBadge status={article.reviewStatus} />
            </div>
            <div className="article-table__cell article-table__cell--actions">
              {/* Overflow menu would go here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

