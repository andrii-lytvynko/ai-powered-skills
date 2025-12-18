import { useState } from 'react';
import { InfoIcon } from '../Icons';
import './ArticleInsights.css';

const articlesData = [
  { id: 1, title: 'Decision-making and Analysis', percentage: 8, size: 'large' },
  { id: 2, title: 'Beyond Mars: Exploring the Potential of Interstellar Travel', percentage: 8, size: 'large' },
  { id: 3, title: 'The Art of Balancing Work and Personal Life', percentage: 8, size: 'large' },
  { id: 4, title: 'Exploring the Benefits of Meditation for Mental...', percentage: 5, size: 'medium' },
  { id: 5, title: 'Revolutionizing Renewable Energy: Breakthrough', percentage: 5, size: 'medium' },
  { id: 6, title: 'The Power of Positive Thinking:', percentage: 3, size: 'small' },
  { id: 7, title: 'The Power of Positive Thinking:', percentage: 3, size: 'small' },
  { id: 8, title: 'Unraveling the Mysteries of Deep Sea Creatures', percentage: 3, size: 'small' },
];

const moreArticles = [
  { id: 9, title: 'Interactive Data Exploration:', percentage: 15, row: 2 },
  { id: 10, title: 'The Pros and Cons of a Vegan Diet', percentage: 15, row: 2 },
  { id: 11, title: 'The Future of Space Travel: Innovations and Beyond', percentage: 10, row: 2, height: 'half' },
  { id: 12, title: 'The Future of Space Travel: Innovations and Beyond', percentage: 10, row: 2, height: 'half' },
  { id: 13, title: 'The Rise of Sustainable Fashion: Redefining the Industry', percentage: 6, row: 2 },
  { id: 14, title: 'The Future of Robotics in the Workplace', percentage: 6, row: 2 },
  { id: 15, title: 'Exploring the Skies: The Success Story of...', percentage: 5, row: 2 },
  { id: 16, title: 'Exploring the Skies: The Success Story of...', percentage: 5, row: 2 },
  { id: 17, title: 'Exploring the Future of Artificial Intelligence: A Comprehensive Analysis', percentage: 5, row: 2 },
  { id: 18, title: 'Why Investing in Renewable Energy', percentage: 2, row: 2 },
  { id: 19, title: 'The Art of Mindful Eating: Nourishing Your Body and Soul', percentage: 4, row: 2 },
  { id: 20, title: 'The Science Behind ...', percentage: 2, row: 2 },
  { id: 21, title: 'The Science Behind...', percentage: 2, row: 2 },
  { id: 22, title: 'The Science Behind...', percentage: 2, row: 2 },
];

export default function ArticleInsights() {
  const [activeTab, setActiveTab] = useState('most');

  const getColorIntensity = (percentage) => {
    if (percentage >= 8) return 'high';
    if (percentage >= 5) return 'medium';
    return 'low';
  };

  return (
    <div className="article-insights">
      <div className="article-insights__header">
        <div className="article-insights__title-row">
          <div className="article-insights__title-group">
            <h3 className="article-insights__title">Knowledge Base Article Insights</h3>
            <InfoIcon className="article-insights__info-icon" />
          </div>
          <button className="article-insights__btn">
            See all articles
          </button>
        </div>
        
        <div className="article-insights__tabs">
          <button 
            className={`article-insights__tab ${activeTab === 'most' ? 'article-insights__tab--active' : ''}`}
            onClick={() => setActiveTab('most')}
          >
            Most used articles
          </button>
          <button 
            className={`article-insights__tab ${activeTab === 'least' ? 'article-insights__tab--active' : ''}`}
            onClick={() => setActiveTab('least')}
          >
            Least used articles
          </button>
        </div>
      </div>
      
      <div className="article-insights__treemap">
        <div className="article-insights__row article-insights__row--first">
          {articlesData.map((article) => (
            <div 
              key={article.id}
              className={`article-insights__tile article-insights__tile--${getColorIntensity(article.percentage)}`}
              title={article.title}
            >
              <span className="article-insights__tile-percentage">{article.percentage}%</span>
              <span className="article-insights__tile-title">{article.title}</span>
            </div>
          ))}
        </div>
        
        <div className="article-insights__row article-insights__row--second">
          <div className="article-insights__tile article-insights__tile--high article-insights__tile--tall" title="Interactive Data Exploration: Unlocking Insights Through Visualization">
            <span className="article-insights__tile-percentage">15%</span>
            <span className="article-insights__tile-title">Interactive Data Exploration:</span>
          </div>
          <div className="article-insights__tile article-insights__tile--high article-insights__tile--tall" title="The Pros and Cons of a Vegan Diet">
            <span className="article-insights__tile-percentage">15%</span>
            <span className="article-insights__tile-title">The Pros and Cons of a Vegan Diet</span>
          </div>
          
          <div className="article-insights__stack">
            <div className="article-insights__tile article-insights__tile--high" title="The Future of Space Travel: Innovations and Beyond">
              <span className="article-insights__tile-percentage">10%</span>
              <span className="article-insights__tile-title">The Future of Space Travel: Innovations and Beyond</span>
            </div>
            <div className="article-insights__tile article-insights__tile--high" title="The Future of Space Travel: Innovations and Beyond">
              <span className="article-insights__tile-percentage">10%</span>
              <span className="article-insights__tile-title">The Future of Space Travel: Innovations and Beyond</span>
            </div>
          </div>
          
          <div className="article-insights__stack">
            <div className="article-insights__tile article-insights__tile--medium" title="The Rise of Sustainable Fashion: Redefining the Industry">
              <span className="article-insights__tile-percentage">6%</span>
              <span className="article-insights__tile-title">The Rise of Sustainable Fashion: Redefining the Industry</span>
            </div>
            <div className="article-insights__tile article-insights__tile--medium" title="The Future of Robotics in the Workplace">
              <span className="article-insights__tile-percentage">6%</span>
              <span className="article-insights__tile-title">The Future of Robotics in the Workplace</span>
            </div>
          </div>
          
          <div className="article-insights__stack article-insights__stack--triple">
            <div className="article-insights__tile article-insights__tile--medium" title="Exploring the Skies: The Success Story of Commercial Aviation">
              <span className="article-insights__tile-percentage">5%</span>
              <span className="article-insights__tile-title">Exploring the Skies: The Success Story of...</span>
            </div>
            <div className="article-insights__tile article-insights__tile--medium" title="Exploring the Skies: The Success Story of Commercial Aviation">
              <span className="article-insights__tile-percentage">5%</span>
              <span className="article-insights__tile-title">Exploring the Skies: The Success Story of...</span>
            </div>
            <div className="article-insights__tile article-insights__tile--medium" title="Exploring the Future of Artificial Intelligence: A Comprehensive Analysis">
              <span className="article-insights__tile-percentage">5%</span>
              <span className="article-insights__tile-title">Exploring the Future of Artificial Intelligence: A Comprehensive Analysis</span>
            </div>
          </div>
          
          <div className="article-insights__stack">
            <div className="article-insights__tile article-insights__tile--low" title="Why Investing in Renewable Energy is the Smart Choice">
              <span className="article-insights__tile-percentage">2%</span>
              <span className="article-insights__tile-title">Why Investing in Renewable Energy</span>
            </div>
            <div className="article-insights__tile article-insights__tile--low" title="The Art of Mindful Eating: Nourishing Your Body and Soul">
              <span className="article-insights__tile-percentage">4%</span>
              <span className="article-insights__tile-title">The Art of Mindful Eating: Nourishing Your Body and Soul</span>
            </div>
          </div>
          
          <div className="article-insights__stack article-insights__stack--triple">
            <div className="article-insights__tile article-insights__tile--low" title="The Science Behind Sleep: Understanding Your Body's Needs">
              <span className="article-insights__tile-percentage">2%</span>
              <span className="article-insights__tile-title">The Science Behind ...</span>
            </div>
            <div className="article-insights__tile article-insights__tile--low" title="The Science Behind Climate Change: Facts and Myths">
              <span className="article-insights__tile-percentage">2%</span>
              <span className="article-insights__tile-title">The Science Behind...</span>
            </div>
            <div className="article-insights__tile article-insights__tile--low" title="The Science Behind Nutrition: Building Healthy Habits">
              <span className="article-insights__tile-percentage">2%</span>
              <span className="article-insights__tile-title">The Science Behind...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

