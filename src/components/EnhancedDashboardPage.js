import React, { useState } from 'react';
import EnhancedKPICard from './dashboard/EnhancedKPICard';
import ChartTabs from './dashboard/ChartTabs';
import ExecutiveInsights from './dashboard/ExecutiveInsights';
import FloatingChatbot from './chatbot/FloatingChatbot';
import { executiveKPIs, executiveInsights, strategicActions } from '../data/executiveDashboardData';

const EnhancedDashboardPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Q4 2024');
  const [alertsVisible, setAlertsVisible] = useState(true);

  const criticalAlerts = [
    {
      id: 1,
      type: 'urgent',
      message: 'Price variance crisis in Electronics: $8.5M savings at risk',
      action: 'Review Now'
    },
    {
      id: 2,
      type: 'warning',
      message: '3 suppliers showing financial stress indicators',
      action: 'Assess Risk'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Critical Alerts Banner */}
      {alertsVisible && (
        <div className="bg-red-600 text-white p-3">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="font-semibold animate-pulse">🚨 CRITICAL ALERTS</span>
              <span>2 issues require immediate executive attention</span>
            </div>
            <button
              onClick={() => setAlertsVisible(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto py-6 px-4 space-y-8">
        {/* Executive Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-600">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Executive Procurement Command Center
              </h1>
              <p className="text-gray-600 text-lg">
                Real-time strategic insights for C-suite decision making
              </p>
              <div className="flex items-center mt-4 space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">AI Analysis Active</span>
                </div>
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1 text-sm"
                >
                  <option>Q4 2024</option>
                  <option>Q3 2024</option>
                  <option>YTD 2024</option>
                </select>
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-green-600 mb-1">$25.2M</div>
              <div className="text-lg text-gray-700 font-semibold">Total Opportunity Identified</div>
              <div className="text-sm text-gray-600 mt-1">95% confidence level</div>
            </div>
          </div>
        </div>

        {/* Critical Actions Strip */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">⚡ Immediate Actions Required</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {strategicActions.filter(action => action.priority === 'Critical').map(action => (
              <div key={action.id} className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="font-semibold text-lg">{action.category}</div>
                <div className="text-sm opacity-90">{action.impact} • {action.timeframe}</div>
                <button className="mt-2 bg-white text-red-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-100">
                  Execute Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(executiveKPIs).map(([key, kpi]) => (
            <EnhancedKPICard
              key={key}
              title={kpi.label}
              value={kpi.value}
              unit={kpi.unit}
              change={kpi.change}
              trend={kpi.trend}
              priority={kpi.priority}
              actionRequired={kpi.actionRequired}
              businessImpact={kpi.businessImpact}
            />
          ))}
        </div>

        {/* Executive Insights & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Strategic Analytics</h2>
                <div className="flex space-x-2">
                  <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                    Spend Analysis
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                    Risk Matrix
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                    Performance
                  </button>
                </div>
              </div>
              <ChartTabs />
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Executive Insights */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Strategic Insights</h3>
              <div className="space-y-4">
                {executiveInsights.slice(0, 3).map(insight => (
                  <div key={insight.id} className={`p-4 rounded-lg border-l-4 ${
                    insight.type === 'critical' ? 'border-red-500 bg-red-50' :
                    insight.type === 'opportunity' ? 'border-green-500 bg-green-50' :
                    insight.type === 'risk' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{insight.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{insight.title}</h4>
                        <p className="text-gray-700 text-xs mt-1">{insight.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm font-bold text-green-600">{insight.impact}</span>
                          <span className="text-xs text-gray-600">{insight.confidence}% confidence</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">⚡ Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left bg-red-50 hover:bg-red-100 p-3 rounded-lg border border-red-200 transition-colors">
                  <div className="font-semibold text-red-800">Execute Price Standardization</div>
                  <div className="text-sm text-red-600">$8.5M • 30 days</div>
                </button>
                <button className="w-full text-left bg-blue-50 hover:bg-blue-100 p-3 rounded-lg border border-blue-200 transition-colors">
                  <div className="font-semibold text-blue-800">Review Supplier Risks</div>
                  <div className="text-sm text-blue-600">23 high-risk suppliers</div>
                </button>
                <button className="w-full text-left bg-green-50 hover:bg-green-100 p-3 rounded-lg border border-green-200 transition-colors">
                  <div className="font-semibold text-green-800">Vendor Consolidation Plan</div>
                  <div className="text-sm text-green-600">$12M opportunity</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Action Plan */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">📋 Strategic Action Plan</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
              Export to Board Report
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
              <div className="text-3xl font-bold text-red-600 mb-2">$8.5M</div>
              <div className="font-semibold text-red-800">Price Standardization</div>
              <div className="text-sm text-red-600 mt-1">30 days • 95% confidence</div>
              <div className="mt-3">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  CRITICAL
                </span>
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <div className="text-3xl font-bold text-orange-600 mb-2">$12M</div>
              <div className="font-semibold text-orange-800">Vendor Consolidation</div>
              <div className="text-sm text-orange-600 mt-1">90 days • 87% confidence</div>
              <div className="mt-3">
                <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  HIGH
                </span>
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">$3.5M</div>
              <div className="font-semibold text-blue-800">Unit Standardization</div>
              <div className="text-sm text-blue-600 mt-1">60 days • 78% confidence</div>
              <div className="mt-3">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  MEDIUM
                </span>
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">285%</div>
              <div className="font-semibold text-green-800">Projected ROI</div>
              <div className="text-sm text-green-600 mt-1">Year 1 • All actions</div>
              <div className="mt-3">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  TARGET
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
};

export default EnhancedDashboardPage;