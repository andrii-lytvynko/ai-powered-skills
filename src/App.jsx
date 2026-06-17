import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import QueuesPage from './components/QueuesPage';
import RoutingConfigPage from './components/RoutingConfigPage';
import SkillsPage from './components/SkillsPage';
import { ShapesIcon, InboxIcon, GearIcon } from './components/Icons';
import { useTheme } from './contexts';
import './App.css';

const products = [
  { id: 'skills', name: 'Skills', icon: ShapesIcon, current: true },
  { id: 'queues', name: 'Queues', icon: InboxIcon },
  { id: 'routing-config', name: 'Routing configuration', icon: GearIcon },
];

function App() {
  const [selectedProductId, setSelectedProductId] = useState(
    products.find((p) => p.current)?.id ?? 'skills'
  );
  const selectedProduct =
    products.find((p) => p.id === selectedProductId) ?? products[0];

  // Copilot flow carried across inter-page navigation (e.g. queues → routing).
  const [copilotFlow, setCopilotFlow] = useState(null);

  // Shared set of recommendation IDs applied across the routing and queues pages.
  // Serialized as an array in localStorage; reconstructed as a Set at runtime.
  const [appliedIdsArray, setAppliedIdsArray] = useLocalStorage(
    'zenbox:admin:appliedRecommendationIds',
    []
  );
  const appliedRecommendationIds = new Set(appliedIdsArray);

  const { setCurrentProduct } = useTheme();

  useEffect(() => {
    setCurrentProduct(selectedProduct?.id || 'skills');
  }, [selectedProduct, setCurrentProduct]);

  const handleRecommendationApplied = useCallback(
    (id) => {
      setAppliedIdsArray((prev) => (prev.includes(id) ? prev : [...prev, id]));
    },
    [setAppliedIdsArray]
  );

  const handleProductChange = (product) => {
    setSelectedProductId(product.id);
    setCopilotFlow(null);
  };

  const handleSubPageChange = (itemId, options = {}) => {
    const target = products.find((p) => p.id === itemId);
    if (!target) return;
    setSelectedProductId(target.id);
    setCopilotFlow(options.copilotFlow ?? null);
  };

  const renderPage = () => {
    switch (selectedProduct?.id) {
      case 'queues':
        return (
          <QueuesPage
            onProductChange={handleProductChange}
            selectedProduct={selectedProduct}
            products={products}
            onSubPageChange={handleSubPageChange}
            appliedRecommendationIds={appliedRecommendationIds}
            onRecommendationApplied={handleRecommendationApplied}
          />
        );
      case 'routing-config':
        return (
          <RoutingConfigPage
            onProductChange={handleProductChange}
            selectedProduct={selectedProduct}
            products={products}
            onSubPageChange={handleSubPageChange}
            initialCopilotFlow={copilotFlow}
            appliedRecommendationIds={appliedRecommendationIds}
            onRecommendationApplied={handleRecommendationApplied}
          />
        );
      case 'skills':
      default:
        return (
          <SkillsPage
            onProductChange={handleProductChange}
            selectedProduct={selectedProduct}
            products={products}
            onSubPageChange={handleSubPageChange}
            initialCopilotFlow={copilotFlow}
          />
        );
    }
  };

  return <div className="app">{renderPage()}</div>;
}

export default App;
