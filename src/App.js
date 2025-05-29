import React, { useState } from 'react';
import ChatbotPage from './components/ChatbotPage';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('chatbot');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'chatbot':
      default:
        return <ChatbotPage />;
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  );
}

export default App;