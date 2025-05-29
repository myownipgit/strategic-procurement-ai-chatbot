import React from 'react';
import { executiveInsights } from '../../data/dashboardData';

const ExecutiveInsights = () => {
  const getInsightStyle = (type) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'opportunity':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'opportunity': return '💡';
      case 'success': return '✅';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Executive Insights</h2>
      <div className="space-y-4">
        {executiveInsights.map((insight, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 ${getInsightStyle(insight.type)}`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-xl">{getInsightIcon(insight.type)}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-sm uppercase tracking-wide mb-1">
                  {insight.title}
                </h3>
                <p className="text-sm mb-2">{insight.message}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium">Action: {insight.action}</span>
                  <span className="bg-white bg-opacity-50 px-2 py-1 rounded">
                    Timeline: {insight.timeline}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutiveInsights;