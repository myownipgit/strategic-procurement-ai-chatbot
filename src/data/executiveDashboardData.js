// Enhanced Executive Dashboard Data
export const executiveKPIs = {
  totalSavings: {
    label: "Total Identified Savings",
    value: 25.2,
    unit: "M",
    change: "+$3.2M vs Q3",
    trend: "up",
    priority: "high",
    actionRequired: true,
    businessImpact: "Immediate action can secure $8.5M in Q1 savings through price standardization"
  },
  contractUtilization: {
    label: "Contract Utilization Rate",
    value: 67,
    unit: "%",
    change: "+12% vs last quarter",
    trend: "up",
    priority: "medium",
    actionRequired: false,
    businessImpact: "18% improvement opportunity could save additional $4.2M annually"
  },
  supplierRisk: {
    label: "High-Risk Suppliers",
    value: 23,
    unit: "suppliers",
    change: "+5 new risks identified",
    trend: "down",
    priority: "high",
    actionRequired: true,
    businessImpact: "23 suppliers represent 45% of total spend and need immediate risk mitigation"
  },
  priceVariance: {
    label: "Average Price Variance",
    value: 34,
    unit: "%",
    change: "-8% improvement",
    trend: "up",
    priority: "high",
    actionRequired: true,
    businessImpact: "Price standardization across categories could reduce variance to 12%"
  },
  vendorConsolidation: {
    label: "Consolidation Opportunity",
    value: 156,
    unit: "vendors",
    change: "12M savings potential",
    trend: "up",
    priority: "medium",
    actionRequired: false,
    businessImpact: "Consolidating to preferred vendors could improve negotiation leverage"
  },
  complianceRate: {
    label: "Compliance Rate",
    value: 89,
    unit: "%",
    change: "+4% improvement",
    trend: "up",
    priority: "low",
    actionRequired: false,
    businessImpact: "Strong compliance performance with room for optimization"
  }
};

export const executiveInsights = [
  {
    id: 1,
    type: "critical",
    title: "Immediate Action Required: Price Standardization",
    description: "Electronics category shows 67% price variance. Standardizing with top 3 suppliers can save $8.5M in 30 days.",
    impact: "$8.5M",
    timeframe: "30 days",
    confidence: 95,
    icon: "⚠️"
  },
  {
    id: 2,
    type: "opportunity",
    title: "Vendor Consolidation Strategy",
    description: "Current 156 active vendors can be consolidated to 45 preferred partners for better leverage.",
    impact: "$12M",
    timeframe: "90 days",
    confidence: 87,
    icon: "🎯"
  },
  {
    id: 3,
    type: "risk",
    title: "Supplier Financial Health Alert",
    description: "3 key suppliers showing financial stress indicators. Backup sourcing recommended.",
    impact: "Business Continuity",
    timeframe: "14 days",
    confidence: 92,
    icon: "🚨"
  },
  {
    id: 4,
    type: "performance",
    title: "Contract Utilization Improvement",
    description: "67% utilization rate improved from 55%. Target 85% for additional $4.2M savings.",
    impact: "$4.2M",
    timeframe: "120 days",
    confidence: 78,
    icon: "📈"
  }
];

export const strategicActions = [
  {
    id: 1,
    category: "Price Standardization",
    priority: "Critical",
    impact: "$8.5M",
    timeframe: "30 days",
    status: "Ready to Execute",
    description: "Standardize pricing across electronics category with top suppliers",
    steps: [
      "Finalize supplier negotiations",
      "Implement new pricing structure",
      "Monitor compliance"
    ],
    roi: "285%",
    riskLevel: "Low"
  },
  {
    id: 2,
    category: "Vendor Consolidation",
    priority: "High",
    impact: "$12M",
    timeframe: "90 days",
    status: "In Planning",
    description: "Consolidate vendor base from 156 to 45 preferred partners",
    steps: [
      "Complete vendor assessment",
      "Negotiate master agreements",
      "Transition volumes"
    ],
    roi: "320%",
    riskLevel: "Medium"
  },
  {
    id: 3,
    category: "Unit Standardization",
    priority: "Medium",
    impact: "$3.5M",
    timeframe: "60 days",
    status: "Analysis Phase",
    description: "Standardize units of measure across all categories",
    steps: [
      "Complete category analysis",
      "Define standard units",
      "System implementation"
    ],
    roi: "180%",
    riskLevel: "Low"
  }
];

export const spendAnalytics = {
  monthlyTrend: [
    { month: 'Jan', spend: 45.2, savings: 2.1 },
    { month: 'Feb', spend: 48.7, savings: 3.2 },
    { month: 'Mar', spend: 52.1, savings: 4.1 },
    { month: 'Apr', spend: 49.8, savings: 5.2 },
    { month: 'May', spend: 53.4, savings: 6.8 },
    { month: 'Jun', spend: 51.2, savings: 7.9 }
  ],
  categoryBreakdown: [
    { category: 'IT Hardware', spend: 24.5, variance: 67, opportunity: 8.5 },
    { category: 'Office Supplies', spend: 12.3, variance: 23, opportunity: 2.8 },
    { category: 'Professional Services', spend: 18.7, variance: 45, opportunity: 6.2 },
    { category: 'Facilities', spend: 15.2, variance: 34, opportunity: 3.7 },
    { category: 'Marketing', spend: 8.9, variance: 56, opportunity: 4.0 }
  ],
  supplierPerformance: [
    { supplier: 'TechCorp Solutions', spend: 15.2, performance: 94, risk: 'Low' },
    { supplier: 'Global Office Supply', spend: 8.7, performance: 87, risk: 'Medium' },
    { supplier: 'Professional Partners', spend: 12.3, performance: 91, risk: 'Low' },
    { supplier: 'Facility Management Co', spend: 6.8, performance: 82, risk: 'High' },
    { supplier: 'Creative Agency', spend: 4.2, performance: 89, risk: 'Medium' }
  ]
};

export const riskMetrics = {
  supplierFinancialHealth: [
    { supplier: 'TechCorp Solutions', score: 85, trend: 'stable', risk: 'Low' },
    { supplier: 'Global Office Supply', score: 67, trend: 'declining', risk: 'Medium' },
    { supplier: 'Professional Partners', score: 78, trend: 'improving', risk: 'Low' },
    { supplier: 'Facility Management Co', score: 45, trend: 'declining', risk: 'High' },
    { supplier: 'Creative Agency', score: 72, trend: 'stable', risk: 'Medium' }
  ],
  complianceMetrics: {
    contractCompliance: 89,
    policyAdherence: 92,
    auditFindings: 12,
    correctiveActions: 8
  },
  marketRisks: [
    { category: 'IT Hardware', risk: 'Supply Chain Disruption', probability: 23, impact: 'High' },
    { category: 'Professional Services', risk: 'Talent Shortage', probability: 45, impact: 'Medium' },
    { category: 'Facilities', risk: 'Cost Inflation', probability: 67, impact: 'Medium' }
  ]
};