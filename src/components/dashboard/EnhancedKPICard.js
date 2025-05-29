import React from 'react';

const EnhancedKPICard = ({ title, value, unit, change, trend, priority, actionRequired, businessImpact }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-300 bg-white';
    }
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? '↗️' : trend === 'down' ? '↘️' : '→';
  };

  return (
    <div className={`p-6 rounded-xl shadow-lg border-l-4 ${getPriorityColor(priority)} transition-all hover:shadow-xl`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">{title}</h3>
        {actionRequired && (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full animate-pulse">
            Action Required
          </span>
        )}
      </div>
      
      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {typeof value === 'number' ? value.toLocaleString() : value}
          <span className="text-lg text-gray-600 ml-1">{unit}</span>
        </div>
        <div className={`text-sm font-medium ${getTrendColor(trend)}`}>
          {getTrendIcon(trend)} {change}
        </div>
      </div>

      {businessImpact && (
        <div className="border-t pt-3">
          <p className="text-xs text-gray-600 font-medium">Business Impact:</p>
          <p className="text-sm text-gray-800">{businessImpact}</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedKPICard;