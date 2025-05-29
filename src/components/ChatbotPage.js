import React from 'react';
import ChatInterface from './chatbot/ChatInterface';

const ChatbotPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">🤖 Strategic Procurement AI Assistant</h1>
              <p className="text-blue-100 text-lg">
                AI-Powered Executive Decision Support & Strategic Analysis
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
                <div className="text-sm text-blue-100 mb-1">Powered by</div>
                <div className="text-lg font-bold">GPT-4 + Strategic Data</div>
              </div>
            </div>
          </div>
          
          {/* Feature Highlights */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-800 bg-opacity-30 rounded-lg p-3">
              <div className="text-blue-100 text-sm">📊 Matrix Analysis</div>
              <div className="text-white font-semibold">Strategic Insights</div>
            </div>
            <div className="bg-red-800 bg-opacity-30 rounded-lg p-3">
              <div className="text-red-100 text-sm">🚨 Crisis Response</div>
              <div className="text-white font-semibold">Emergency Planning</div>
            </div>
            <div className="bg-green-800 bg-opacity-30 rounded-lg p-3">
              <div className="text-green-100 text-sm">💰 Savings Analysis</div>
              <div className="text-white font-semibold">$23M+ Identified</div>
            </div>
            <div className="bg-purple-800 bg-opacity-30 rounded-lg p-3">
              <div className="text-purple-100 text-sm">🎯 Action Plans</div>
              <div className="text-white font-semibold">Project Generation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: '80vh' }}>
          <ChatInterface />
        </div>

        {/* Information Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 card-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Getting Started</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Ask about the Strategic Action Priority Matrix</li>
              <li>• Request crisis response project plans</li>
              <li>• Analyze savings opportunities</li>
              <li>• Get vendor-specific insights</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6 card-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">🎯 AI Capabilities</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Natural language query processing</li>
              <li>• Executive-level strategic insights</li>
              <li>• Real-time database analysis</li>
              <li>• Automated project plan generation</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6 card-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">⚙️ Technical Details</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Powered by OpenAI GPT-4</li>
              <li>• Connected to Strategic Database</li>
              <li>• Real-time procurement analysis</li>
              <li>• Secure data processing</li>
            </ul>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 System Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">447</div>
              <div className="text-sm text-gray-600">Strategic Cases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$23.1M</div>
              <div className="text-sm text-gray-600">Savings Identified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">2</div>
              <div className="text-sm text-gray-600">Critical Cases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">2,718</div>
              <div className="text-sm text-gray-600">Vendors Analyzed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Strategic Procurement AI Assistant</h3>
            <p className="text-gray-300 text-sm mb-4">
              Empowering C-suite executives with AI-driven procurement insights and strategic decision support
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <span>• OpenAI GPT-4 Integration</span>
              <span>• Real-time Data Analysis</span>
              <span>• Executive Decision Support</span>
              <span>• Crisis Response Framework</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;