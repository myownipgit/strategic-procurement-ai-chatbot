import React, { useState } from 'react';

const MessageBubble = ({ message }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const isUser = message.type === 'user';
  const isAI = message.type === 'ai';

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatContent = (content) => {
    // Handle markdown-style formatting for AI responses
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/•/g, '•') // Bullet points
      .replace(/\n/g, '<br>'); // Line breaks
  };

  const renderDataInsights = (databaseResults) => {
    if (!databaseResults?.success || !databaseResults?.data) return null;

    const data = databaseResults.data;
    
    if (Array.isArray(data) && data.length > 0) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800">📊 Data Insights</h4>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-3 rounded border card-shadow">
              <div className="text-2xl font-bold text-blue-600">{data.length}</div>
              <div className="text-sm text-gray-600">Records</div>
            </div>
            
            {data[0]?.total_savings_opportunity && (
              <div className="bg-white p-3 rounded border card-shadow">
                <div className="text-2xl font-bold text-green-600">
                  ${Math.round(data.reduce((sum, item) => sum + (item.total_savings_opportunity || 0), 0) / 1000000)}M
                </div>
                <div className="text-sm text-gray-600">Savings</div>
              </div>
            )}
            
            {data[0]?.case_count && (
              <div className="bg-white p-3 rounded border card-shadow">
                <div className="text-2xl font-bold text-red-600">
                  {data.reduce((sum, item) => sum + (item.case_count || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Cases</div>
              </div>
            )}
            
            {data[0]?.strategic_priority && (
              <div className="bg-white p-3 rounded border card-shadow">
                <div className="text-2xl font-bold text-purple-600">
                  {data.filter(item => item.strategic_priority === 'CRITICAL').length}
                </div>
                <div className="text-sm text-gray-600">Critical</div>
              </div>
            )}
          </div>

          {/* Detailed Data Table */}
          {showDetails && (
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th key={key}>
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 5).map((row, index) => (
                    <tr key={index}>
                      {Object.entries(row).map(([key, value]) => (
                        <td key={key}>
                          {typeof value === 'number' && key.includes('savings') 
                            ? `$${(value / 1000000).toFixed(1)}M`
                            : typeof value === 'number' && value > 1000
                            ? value.toLocaleString()
                            : value
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.length > 5 && (
                <div className="text-center text-sm text-gray-500 mt-2">
                  Showing first 5 of {data.length} records
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };

  const renderQueryInfo = (queryPlan) => {
    if (!queryPlan) return null;

    return (
      <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 font-medium">🔍 Query Type:</span>
          <span className="capitalize">{queryPlan.type?.replace('_', ' ')}</span>
        </div>
        {queryPlan.matched_pattern && (
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-blue-600 font-medium">🎯 Pattern:</span>
            <span className="italic">{queryPlan.matched_pattern}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div className={`max-w-4xl w-full ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Message Header */}
        <div className={`flex items-center space-x-2 mb-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
            isUser ? 'bg-blue-600' : 'bg-purple-600'
          }`}>
            {isUser ? 'U' : '🤖'}
          </div>
          <span className="text-sm text-gray-500">
            {isUser ? 'You' : 'AI Assistant'} • {formatTimestamp(message.timestamp)}
          </span>
        </div>

        {/* Message Content */}
        <div className={`p-4 rounded-lg shadow-sm ${
          isUser 
            ? 'bg-blue-600 text-white ml-12' 
            : message.success === false
            ? 'bg-red-50 border border-red-200 mr-12'
            : 'bg-white border border-gray-200 mr-12 card-shadow'
        }`}>
          {/* Main Content */}
          <div 
            className={`prose prose-sm max-w-none ${
              isUser ? 'text-white' : 'text-gray-800'
            }`}
            dangerouslySetInnerHTML={{ 
              __html: formatContent(message.content) 
            }}
          />

          {/* Error Indicator */}
          {message.success === false && !isUser && (
            <div className="mt-3 p-2 bg-red-100 border border-red-200 rounded text-red-700 text-sm">
              ⚠️ This response may be incomplete due to a processing error.
            </div>
          )}

          {/* Query Information */}
          {isAI && message.queryPlan && renderQueryInfo(message.queryPlan)}

          {/* Database Results */}
          {isAI && message.databaseResults && renderDataInsights(message.databaseResults)}
        </div>

        {/* Success Indicator for AI responses */}
        {isAI && message.success !== false && (
          <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500 ml-12">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Response generated successfully</span>
            {message.databaseResults?.data && (
              <span>• Database analysis complete</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;