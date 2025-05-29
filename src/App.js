import React, { useState } from 'react';
import ChatbotPage from './components/ChatbotPage';
import DashboardPage from './components/DashboardPage';
import EnhancedDashboardPage from './components/EnhancedDashboardPage';
import Navigation from './components/dashboard/Navigation';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('enhanced-dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'enhanced-dashboard':
        return <EnhancedDashboardPage />;
      case 'chatbot':
        return <ChatbotPage />;
      default:
        return <EnhancedDashboardPage />;
    }
  };

  return (
    <div className="App">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderCurrentPage()}
    </div>
  );
}

export default App;