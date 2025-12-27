import { useState } from 'react';
import { ChevronDownIcon, CalendarSmallIcon, UserIcon, StarIcon, LayersIcon, PlusIcon } from '../Icons';
import './FilterBar.css';

const defaultFilters = [
  { id: 'date', label: 'Created date', value: 'Last 30 days', icon: CalendarSmallIcon },
  { id: 'category1', label: 'Rating category', icon: LayersIcon },
  { id: 'category2', label: 'Rating category', icon: UserIcon },
  { id: 'category3', label: 'Rating category', icon: StarIcon },
  { id: 'category4', label: 'Rating category', icon: LayersIcon },
];

export default function FilterBar({ filters = defaultFilters }) {
  const [activeFilters, setActiveFilters] = useState({});

  return (
    <div className="filter-bar">
      <div className="filter-bar__filters">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.id}
              className={`filter-bar__filter ${activeFilters[filter.id] ? 'filter-bar__filter--active' : ''}`}
            >
              {Icon && <Icon className="filter-bar__filter-icon" />}
              <span className="filter-bar__filter-label">
                {filter.value || filter.label}
              </span>
              <ChevronDownIcon className="filter-bar__filter-chevron" />
            </button>
          );
        })}
        
        <button className="filter-bar__add">
          <PlusIcon className="filter-bar__add-icon" />
        </button>
      </div>
    </div>
  );
}





