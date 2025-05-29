import React from 'react';
import KPICard from './dashboard/KPICard';
import ChartTabs from './dashboard/ChartTabs';
import ExecutiveInsights from './dashboard/ExecutiveInsights';
import PriceVarianceAnalysis from './dashboard/PriceVarianceAnalysis';
import SourceDataValidation from './dashboard/SourceDataValidation';
import { dashboardKPIs } from '../data/dashboardData';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Executive Procurement Dashboard</h1>
              <p className="text-gray-600 mt-1">Real-time insights for strategic decision making</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">$25.2M</div>
              <div className="text-sm text-gray-600">Realistic Savings Identified</div>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(dashboardKPIs).map(([key, kpi]) => (
            <KPICard
              key={key}
              title={kpi.label}
              value={kpi.value}
              unit={kpi.unit}
              change={kpi.change}
              trend={kpi.trend}
            />
          ))}
        </div>

        {/* Charts and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartTabs />
          </div>
          <div>
            <ExecutiveInsights />
          </div>
        </div>

        {/* Price Variance Crisis Analysis */}
        <div>
          <PriceVarianceAnalysis />
        </div>

        {/* Source Data Validation */}
        <div>
          <SourceDataValidation />
        </div>

        {/* Strategic Actions Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Strategic Action Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">$8.5M</div>
              <div className="text-sm text-red-800">Price Standardization</div>
              <div className="text-xs text-red-600">30 days</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">$12M</div>
              <div className="text-sm text-orange-800">Vendor Consolidation</div>
              <div className="text-xs text-orange-600">90 days</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">$3.5M</div>
              <div className="text-sm text-blue-800">Unit Standardization</div>
              <div className="text-xs text-blue-600">60 days</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">185%</div>
              <div className="text-sm text-green-800">Projected ROI</div>
              <div className="text-xs text-green-600">Year 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;