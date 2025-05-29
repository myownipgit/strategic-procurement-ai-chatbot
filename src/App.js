import React, { useState } from 'react';
import ChatbotPage from './components/ChatbotPage';
import DashboardPage from './components/DashboardPage';
import Navigation from './components/dashboard/Navigation';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'chatbot':
        return <ChatbotPage />;
      default:
        return <DashboardPage />;
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