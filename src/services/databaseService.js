// Database Service for Strategic Procurement Chatbot
// Handles SQLite database connections and queries
// This service simulates database operations for the standalone chatbot

import { databaseInfo } from '../data/strategicActionData';

class DatabaseService {
  constructor() {
    this.isConnected = true; // Simulate connection for standalone version
    this.mockData = this.initializeMockData();
  }

  // Initialize mock data based on real Strategic Action Priority Matrix
  initializeMockData() {
    return {
      strategicActionMatrix: [
        {
          vendor_name: 'POWELL ELECTRICAL SYSTEMS INC',
          commodity_description: 'SWITCHGEARS AND PARTS, METAL CLAD',
          transaction_count: 11,
          price_variance_amount: 568541.0,
          price_variance_percentage: 11508.93,
          total_spend: 6367032.64,
          estimated_savings_opportunity: 1591758.16,
          strategic_priority: 'CRITICAL',
          risk_level: 'EXTREME',
          recommended_timeline: '0-30 days',
          recommended_action: 'Emergency Contract Renegotiation',
          effort_level: 'HIGH'
        },
        {
          vendor_name: 'INSIGHT PUBLIC SECTOR INC',
          commodity_description: 'Network Components: Adapter Cards, Bridges, Connectors',
          transaction_count: 323,
          price_variance_amount: 384451.02,
          price_variance_percentage: 12901040.94,
          total_spend: 2636838.77,
          estimated_savings_opportunity: 659209.69,
          strategic_priority: 'CRITICAL',
          risk_level: 'EXTREME',
          recommended_timeline: '0-30 days',
          recommended_action: 'Emergency Contract Renegotiation',
          effort_level: 'HIGH'
        },
        {
          vendor_name: 'AVAYA INC',
          commodity_description: 'Telephone Systems (2-60 Stations), Electronic Key',
          transaction_count: 75,
          price_variance_amount: 338579.28,
          price_variance_percentage: 18401047.83,
          total_spend: 441843.89,
          estimated_savings_opportunity: 110460.97,
          strategic_priority: 'HIGH',
          risk_level: 'EXTREME',
          recommended_timeline: '30-60 days',
          recommended_action: 'Emergency Contract Renegotiation',
          effort_level: 'MEDIUM'
        },
        {
          vendor_name: 'RDO EQUIPMENT CO',
          commodity_description: 'Backhoe/Loader Combination',
          transaction_count: 8,
          price_variance_amount: 325714.46,
          price_variance_percentage: 818.35,
          total_spend: 892818.35,
          estimated_savings_opportunity: 223204.59,
          strategic_priority: 'HIGH',
          risk_level: 'EXTREME',
          recommended_timeline: '30-60 days',
          recommended_action: 'Emergency Contract Renegotiation',
          effort_level: 'MEDIUM'
        },
        {
          vendor_name: 'FREEIT DATA SOLUTIONS INC',
          commodity_description: 'SERVERS, FILE, MICROCOMPUTER',
          transaction_count: 3,
          price_variance_amount: 258298.81,
          price_variance_percentage: 391.96,
          total_spend: 678944.12,
          estimated_savings_opportunity: 169736.03,
          strategic_priority: 'HIGH',
          risk_level: 'HIGH',
          recommended_timeline: '30-60 days',
          recommended_action: 'Emergency Contract Renegotiation',
          effort_level: 'MEDIUM'
        }
      ],
      prioritySummary: [
        {
          strategic_priority: 'CRITICAL',
          case_count: 2,
          total_savings_opportunity: 2250967.85,
          avg_price_variance: 476496.01,
          total_spend_at_risk: 9003871.41
        },
        {
          strategic_priority: 'HIGH',
          case_count: 30,
          total_savings_opportunity: 7875899.88,
          avg_price_variance: 135063.063,
          total_spend_at_risk: 38680095.88
        },
        {
          strategic_priority: 'MEDIUM',
          case_count: 120,
          total_savings_opportunity: 9639652.14,
          avg_price_variance: 28683.20,
          total_spend_at_risk: 63658332.33
        },
        {
          strategic_priority: 'LOW',
          case_count: 295,
          total_savings_opportunity: 3310986.3,
          avg_price_variance: 3312.44,
          total_spend_at_risk: 33109861.99
        }
      ]
    };
  }

  // Test database connection
  async testConnection() {
    return { success: true, message: 'Database connection successful (simulation mode)' };
  }

  // Execute Strategic Action Priority Matrix queries
  async queryStrategicActionMatrix(filters = {}) {
    try {
      let data = [...this.mockData.strategicActionMatrix];
      
      // Apply filters
      if (filters.priority) {
        data = data.filter(item => item.strategic_priority === filters.priority);
      }
      
      if (filters.timeline) {
        data = data.filter(item => item.recommended_timeline === filters.timeline);
      }
      
      if (filters.riskLevel) {
        data = data.filter(item => item.risk_level === filters.riskLevel);
      }
      
      if (filters.minSavings) {
        data = data.filter(item => item.estimated_savings_opportunity >= filters.minSavings);
      }

      // Sort by price variance (descending)
      data.sort((a, b) => b.price_variance_amount - a.price_variance_amount);
      
      // Apply limit
      if (filters.limit) {
        data = data.slice(0, filters.limit);
      }

      return {
        success: true,
        data: data,
        totalRecords: data.length,
        queryInfo: {
          filters: filters,
          executedAt: new Date().toISOString()
        }
      };

    } catch (error) {
      console.error('Strategic Action Matrix query error:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  // Get crisis response data (0-30 day actions)
  async getCrisisResponseData() {
    return await this.queryStrategicActionMatrix({
      timeline: '0-30 days',
      priority: 'CRITICAL'
    });
  }

  // Get strategic priority summary
  async getStrategicPrioritySummary() {
    try {
      return {
        success: true,
        data: this.mockData.prioritySummary,
        totalRecords: this.mockData.prioritySummary.length,
        summary: {
          totalCases: this.mockData.prioritySummary.reduce((sum, item) => sum + item.case_count, 0),
          totalSavings: this.mockData.prioritySummary.reduce((sum, item) => sum + item.total_savings_opportunity, 0),
          totalSpendAtRisk: this.mockData.prioritySummary.reduce((sum, item) => sum + item.total_spend_at_risk, 0)
        }
      };

    } catch (error) {
      console.error('Strategic priority summary error:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  // Search vendors by name or commodity
  async searchVendors(searchTerm) {
    try {
      const searchLower = searchTerm.toLowerCase();
      const results = this.mockData.strategicActionMatrix.filter(item => 
        item.vendor_name.toLowerCase().includes(searchLower) || 
        item.commodity_description.toLowerCase().includes(searchLower)
      );

      return {
        success: true,
        data: results.slice(0, 10), // Limit to 10 results
        searchTerm: searchTerm,
        totalMatches: results.length
      };

    } catch (error) {
      console.error('Vendor search error:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  // Format currency for display
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  // Format percentage for display
  formatPercentage(percentage) {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(percentage / 100);
  }

  // Get database statistics for AI context
  getStatistics() {
    return {
      ...databaseInfo,
      mockDataMode: true,
      lastUpdated: new Date().toISOString()
    };
  }
}

export default DatabaseService;