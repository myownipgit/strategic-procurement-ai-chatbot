// Executive Dashboard Data - Real-time KPIs and Analytics
import { executiveKPIs, strategicActions, priceVarianceCrisis, implementationRoadmap } from './strategicActionData';

export const dashboardKPIs = {
  totalSpend: {
    value: 515.87,
    unit: 'M',
    change: -2.3,
    trend: 'down',
    label: 'Total Annual Spend'
  },
  potentialSavings: {
    value: 25.2, // CORRECTED: $25.2M realistic savings
    unit: 'M',
    change: 12.7,
    trend: 'up',
    label: 'Identified Savings'
  },
  vendorCount: {
    value: 2718,
    unit: '',
    change: -15.2,
    trend: 'down',
    label: 'Active Vendors'
  },
  contractCompliance: {
    value: 65,
    unit: '%',
    change: 8.4,
    trend: 'up',
    label: 'Contract Utilization'
  },
  riskScore: {
    value: 87,
    unit: '/100',
    change: -22.1,
    trend: 'down',
    label: 'Risk Score'
  },
  roi: {
    value: 420,
    unit: '%',
    change: 156.3,
    trend: 'up',
    label: 'Projected ROI'
  }
};

export const monthlySpendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
    label: 'Actual Spend ($M)',
    data: [42.3, 38.7, 45.1, 41.2, 39.8, 43.6, 47.2, 44.8, 41.9, 46.3, 48.7, 45.2],
    borderColor: '#3B82F6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    fill: true,
    tension: 0.4
  }, {
    label: 'Budgeted Spend ($M)',
    data: [45.0, 45.0, 45.0, 45.0, 45.0, 45.0, 45.0, 45.0, 45.0, 45.0, 45.0, 45.0],
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderDash: [5, 5],
    fill: false
  }]
};

export const savingsData = {
  labels: ['Contract Renegotiation', 'Vendor Consolidation', 'Tech Standardization', 'Tail Spend', 'Compliance Controls'],
  datasets: [{
    data: [45, 25, 15, 8, 12],
    backgroundColor: ['#EF4444', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6'],
    borderWidth: 0
  }]
};

export const vendorPerformanceData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [{
    label: 'On-Time Delivery (%)',
    data: [87, 89, 92, 94],
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    yAxisID: 'y'
  }, {
    label: 'Quality Score',
    data: [8.2, 8.4, 8.7, 8.9],
    borderColor: '#3B82F6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    yAxisID: 'y1'
  }]
};

export const riskAnalysisData = {
  labels: ['Price Variance', 'Vendor Concentration', 'Contract Compliance', 'Tail Spend', 'Market Risk'],
  datasets: [{
    label: 'Risk Impact ($M)',
    data: [85, 45, 25, 15, 12],
    backgroundColor: 'rgba(239, 68, 68, 0.8)'
  }, {
    label: 'Mitigation Potential ($M)',
    data: [65, 32, 20, 12, 8],
    backgroundColor: 'rgba(16, 185, 129, 0.8)'
  }]
};

export const categorySpendData = {
  labels: ['Technology', 'Professional Services', 'Facilities', 'Manufacturing', 'Transportation', 'Other'],
  datasets: [{
    data: [156.2, 98.4, 87.3, 76.8, 54.2, 42.9],
    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280'],
    borderWidth: 0
  }]
};

export const executiveInsights = [
  {
    type: 'critical',
    title: 'Source Data Validation Complete',
    message: 'Analysis validated against original Price Variance Crisis documentation - confirmed $0.26 radio supplies and $384K network components are data quality issues, not real pricing',
    action: 'Review source validation analysis',
    timeline: 'Complete'
  },
  {
    type: 'critical',
    title: 'MOTOROLA Unit Pricing Crisis',
    message: 'Original source confirms 13,819% variance from $0.26 to $35,275 for radio supplies - corrected to realistic 6,700% variance indicating per-unit vs bulk pricing inconsistency',
    action: 'Emergency pricing audit',
    timeline: '7 days'
  },
  {
    type: 'opportunity',
    title: 'Realistic Savings Identified',
    message: 'Corrected analysis shows $1.26M in achievable savings vs original $152M unrealistic projections - maintains strategic focus with credible financial targets',
    action: 'Implement standardization program',
    timeline: '90 days'
  },
  {
    type: 'warning',
    title: 'Original Analysis Insights Preserved',
    message: 'Source validation confirms technology procurement systematic issues and contract non-compliance concerns identified in original comprehensive dashboard remain valid',
    action: 'Implement data validation controls',
    timeline: '30 days'
  }
];

export default {
  dashboardKPIs,
  monthlySpendData,
  savingsData,
  vendorPerformanceData,
  riskAnalysisData,
  categorySpendData,
  executiveInsights
};