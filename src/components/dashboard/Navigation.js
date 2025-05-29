import React from 'react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'enhanced-dashboard', label: 'Executive Command Center', icon: '⚡' },
    { id: 'dashboard', label: 'Standard Dashboard', icon: '📊' },
    { id: 'chatbot', label: 'AI Assistant', icon: '🤖' }
  ];

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold">Strategic Procurement AI Platform</h1>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  currentPage === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <div className="text-sm text-gray-400">
            AI Active • {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;