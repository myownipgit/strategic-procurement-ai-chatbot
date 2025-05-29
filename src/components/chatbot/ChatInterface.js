import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import QueryProcessor from '../../services/queryProcessor';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const queryProcessor = useRef(new QueryProcessor());

  // Initial setup and welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      type: 'ai',
      content: `🎯 **Strategic Procurement AI Assistant**

I'm your AI-powered procurement advisor, ready to help with strategic analysis and decision-making.

**What I can help you with:**
• **"Explain the Strategic Action Priority Matrix"** - Comprehensive analysis framework
• **"Create a Crisis Response project plan"** - Immediate action plans for critical cases  
• **"Show me critical cases"** - Priority interventions requiring immediate attention
• **"What are our savings opportunities?"** - Financial optimization analysis

*Try asking: "Explain the Strategic Action Priority Matrix"*`,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    setIsConnected(true);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Process the query using our AI system
      const result = await queryProcessor.current.processQuery(inputText);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: result.response,
        timestamp: new Date(),
        queryPlan: result.queryPlan,
        databaseResults: result.databaseResults,
        success: result.success
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error processing message:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: `⚠️ I apologize, but I encountered an error processing your request. This might be due to:

• OpenAI API configuration (please check your API key)
• Database connection issues
• Network connectivity problems

**Please try:**
1. Checking your .env file for REACT_APP_OPENAI_API_KEY
2. Refreshing the page
3. Trying a simpler query like "Show me critical cases"

*Error: ${error.message}*`,
        timestamp: new Date(),
        success: false
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action) => {
    setInputText(action);
    // Auto-send the quick action
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">🤖 Strategic Procurement AI Assistant</h1>
            <p className="text-blue-100 text-sm">AI-Powered Executive Decision Support</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <span className="text-sm">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-b p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleQuickAction('Explain the Strategic Action Priority Matrix')}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
            disabled={isLoading}
          >
            📊 Explain Matrix
          </button>
          <button
            onClick={() => handleQuickAction('Create a Crisis Response project plan')}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
            disabled={isLoading}
          >
            🚨 Crisis Response
          </button>
          <button
            onClick={() => handleQuickAction('Show me critical cases')}
            className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium"
            disabled={isLoading}
          >
            ⚠️ Critical Cases
          </button>
          <button
            onClick={() => handleQuickAction('What are our savings opportunities?')}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
            disabled={isLoading}
          >
            💰 Savings Analysis
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scroll">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}
        
        {isLoading && (
          <div className="flex items-center space-x-3 p-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce typing-dot"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce typing-dot"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce typing-dot"></div>
            </div>
            <span className="text-gray-500 text-sm">AI is analyzing your query...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about strategic procurement, crisis response, savings opportunities, or vendor analysis..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="2"
              disabled={isLoading}
            />
            <div className="text-xs text-gray-500 mt-1">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputText.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 text-center text-xs text-gray-500 p-2">
        Strategic Procurement AI Assistant • Powered by GPT-4 • 
        <span className="font-medium"> {messages.length - 1} queries processed</span>
      </div>
    </div>
  );
};

export default ChatInterface;