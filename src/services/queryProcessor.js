// Natural Language to SQL Query Processor
// Translates user queries into database operations and response strategies

import OpenAIService from './openaiService';
import DatabaseService from './databaseService';

class QueryProcessor {
  constructor() {
    this.openaiService = new OpenAIService();
    this.databaseService = new DatabaseService();
    
    // Define query patterns and their corresponding database operations
    this.queryPatterns = {
      'strategic action priority matrix': {
        type: 'explanation',
        operation: 'getStrategicPrioritySummary',
        description: 'Explains the Strategic Action Priority Matrix concept and shows summary data'
      },
      'crisis response': {
        type: 'crisis_analysis',
        operation: 'getCrisisResponseData',
        description: 'Shows immediate crisis response actions needed within 0-30 days'
      },
      'project plan': {
        type: 'project_generation',
        operation: 'queryStrategicActionMatrix',
        description: 'Generates detailed project plans based on strategic priorities'
      },
      'critical cases': {
        type: 'data_analysis',
        operation: 'queryStrategicActionMatrix',
        filters: { priority: 'CRITICAL' },
        description: 'Shows critical priority cases requiring immediate attention'
      },
      'high priority': {
        type: 'data_analysis',
        operation: 'queryStrategicActionMatrix',
        filters: { priority: 'HIGH' },
        description: 'Shows high priority cases for strategic intervention'
      },
      'savings opportunity': {
        type: 'financial_analysis',
        operation: 'queryStrategicActionMatrix',
        description: 'Analyzes potential savings opportunities'
      }
    };
  }

  async processQuery(userQuery) {
    try {
      console.log('Processing query:', userQuery);

      // Step 1: Analyze query intent using AI
      const intent = await this.openaiService.analyzeQueryIntent(userQuery);
      console.log('Query intent:', intent);

      // Step 2: Determine database operation needed
      const queryPlan = this.determineQueryPlan(userQuery, intent);
      console.log('Query plan:', queryPlan);

      // Step 3: Execute database operations
      const databaseResults = await this.executeDatabaseOperation(queryPlan);
      console.log('Database results:', databaseResults);

      // Step 4: Generate AI-powered response
      const aiResponse = await this.generateResponse(userQuery, queryPlan, databaseResults, intent);

      return {
        success: true,
        response: aiResponse.response,
        queryPlan: queryPlan,
        databaseResults: databaseResults,
        intent: intent
      };

    } catch (error) {
      console.error('Query processing error:', error);
      return {
        success: false,
        error: error.message,
        response: 'I apologize, but I encountered an error processing your query. Please try rephrasing your question or contact support if the issue persists.'
      };
    }
  }

  determineQueryPlan(userQuery, intent) {
    const queryLower = userQuery.toLowerCase();
    
    // Check for specific patterns in the query
    for (const [pattern, config] of Object.entries(this.queryPatterns)) {
      if (queryLower.includes(pattern)) {
        return {
          type: config.type,
          operation: config.operation,
          filters: config.filters || {},
          description: config.description,
          matched_pattern: pattern
        };
      }
    }

    // Default based on AI intent analysis
    switch (intent.intent) {
      case 'explanation':
        return {
          type: 'explanation',
          operation: 'getStrategicPrioritySummary',
          filters: {},
          description: 'Provides explanation with supporting data'
        };
      
      case 'crisis_response':
        return {
          type: 'crisis_analysis',
          operation: 'getCrisisResponseData',
          filters: {},
          description: 'Crisis response analysis and action plan'
        };
      
      case 'project_plan':
        return {
          type: 'project_generation',
          operation: 'queryStrategicActionMatrix',
          filters: { priority: 'CRITICAL' },
          description: 'Generates detailed project plan'
        };
      
      case 'data_query':
        return {
          type: 'data_analysis',
          operation: 'queryStrategicActionMatrix',
          filters: {},
          description: 'Data analysis and insights'
        };
      
      default:
        return {
          type: 'general',
          operation: 'getStrategicPrioritySummary',
          filters: {},
          description: 'General strategic procurement assistance'
        };
    }
  }

  async executeDatabaseOperation(queryPlan) {
    try {
      switch (queryPlan.operation) {
        case 'getStrategicPrioritySummary':
          return await this.databaseService.getStrategicPrioritySummary();
        
        case 'getCrisisResponseData':
          return await this.databaseService.getCrisisResponseData();
        
        case 'queryStrategicActionMatrix':
          return await this.databaseService.queryStrategicActionMatrix(queryPlan.filters);
        
        case 'searchVendors':
          const searchTerm = this.extractSearchTerm(queryPlan.userQuery);
          return await this.databaseService.searchVendors(searchTerm);
        
        default:
          return await this.databaseService.getStrategicPrioritySummary();
      }
    } catch (error) {
      console.error('Database operation error:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  async generateResponse(userQuery, queryPlan, databaseResults, intent) {
    const context = {
      databaseResults: databaseResults,
      queryType: queryPlan.type,
      additionalContext: this.buildContextualInformation(queryPlan, databaseResults)
    };

    // Use OpenAI to generate sophisticated response
    const aiResponse = await this.openaiService.generateResponse(userQuery, context);

    if (!aiResponse.success) {
      // Fallback to template-based response if AI fails
      return this.generateFallbackResponse(queryPlan, databaseResults);
    }

    return aiResponse;
  }

  buildContextualInformation(queryPlan, databaseResults) {
    let context = `Query Type: ${queryPlan.type}\n`;
    context += `Operation: ${queryPlan.description}\n`;
    
    if (databaseResults.success && databaseResults.data) {
      context += `Data Records: ${databaseResults.data.length}\n`;
      
      // Add specific context based on query type
      switch (queryPlan.type) {
        case 'crisis_analysis':
          context += 'This is a crisis response query requiring immediate executive attention.\n';
          break;
        case 'project_generation':
          context += 'User is requesting a detailed project plan with specific timelines and actions.\n';
          break;
        case 'explanation':
          context += 'User needs a comprehensive explanation of procurement concepts.\n';
          break;
      }
    }
    
    return context;
  }

  generateFallbackResponse(queryPlan, databaseResults) {
    let response = '';
    
    switch (queryPlan.type) {
      case 'explanation':
        response = `📊 Strategic Action Priority Matrix Overview\n\nThe Strategic Action Priority Matrix is a comprehensive framework that identifies procurement optimization opportunities across our organization. `;
        if (databaseResults.success && databaseResults.data.length > 0) {
          const totalSavings = databaseResults.data.reduce((sum, item) => sum + (item.total_savings_opportunity || 0), 0);
          response += `We've identified ${databaseResults.data.length} priority categories with $${(totalSavings / 1000000).toFixed(1)}M in potential savings.`;
        }
        break;
        
      case 'crisis_analysis':
        response = `🚨 Crisis Response Analysis\n\nImmediate action is required on critical procurement cases. `;
        if (databaseResults.success && databaseResults.data.length > 0) {
          response += `We have ${databaseResults.data.length} critical cases requiring emergency intervention within 30 days.`;
        }
        break;
        
      default:
        response = `I understand you're asking about procurement optimization. Based on our Strategic Action Priority Matrix, we have identified significant opportunities for cost savings and risk reduction across our vendor relationships.`;
    }
    
    return { success: true, response: response };
  }

  extractSearchTerm(query) {
    // Simple extraction - in production, this would be more sophisticated
    const words = query.toLowerCase().split(' ');
    // Remove common words and return potential search terms
    const stopWords = ['show', 'me', 'find', 'search', 'for', 'the', 'a', 'an', 'and', 'or', 'but'];
    return words.filter(word => !stopWords.includes(word) && word.length > 2).join(' ');
  }
}

export default QueryProcessor;