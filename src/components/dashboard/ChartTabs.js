import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { monthlySpendData, savingsData, vendorPerformanceData, riskAnalysisData, categorySpendData } from '../../data/dashboardData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

const ChartTabs = () => {
  const [activeTab, setActiveTab] = useState('spend');

  const tabs = [
    { id: 'spend', label: 'Spend Analysis', icon: '📈' },
    { id: 'savings', label: 'Savings Breakdown', icon: '💰' },
    { id: 'performance', label: 'Vendor Performance', icon: '⭐' },
    { id: 'risk', label: 'Risk Analysis', icon: '⚠️' },
    { id: 'category', label: 'Category Spend', icon: '📊' }
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const dualAxisOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.label + ': $' + context.parsed + 'M';
          }
        }
      }
    },
  };

  const renderChart = () => {
    switch (activeTab) {
      case 'spend':
        return <Line data={monthlySpendData} options={chartOptions} />;
      case 'savings':
        return <Pie data={savingsData} options={pieOptions} />;
      case 'performance':
        return <Line data={vendorPerformanceData} options={dualAxisOptions} />;
      case 'risk':
        return <Bar data={riskAnalysisData} options={chartOptions} />;
      case 'category':
        return <Pie data={categorySpendData} options={pieOptions} />;
      default:
        return <Line data={monthlySpendData} options={chartOptions} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex-1 justify-center ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div style={{ height: '400px' }}>
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartTabs;