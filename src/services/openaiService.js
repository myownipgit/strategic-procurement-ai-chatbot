// OpenAI Service for Strategic Procurement Chatbot
// Handles AI-powered natural language processing and response generation

class OpenAIService {
  constructor() {
    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    this.baseURL = 'https://api.openai.com/v1/chat/completions';
    this.model = 'gpt-4';
    
    if (!this.apiKey) {
      console.warn('OpenAI API key not found. Please set REACT_APP_OPENAI_API_KEY environment variable.');
    }
  }

  async generateResponse(userQuery, context = {}) {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'OpenAI API key not configured. Please add REACT_APP_OPENAI_API_KEY to your .env file.'
      };
    }

    try {
      const systemPrompt = this.buildSystemPrompt();
      const userPrompt = this.buildUserPrompt(userQuery, context);

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        response: data.choices[0].message.content,
        usage: data.usage
      };

    } catch (error) {
      console.error('OpenAI Service Error:', error);
      return {
        success: false,
        error: error.message || 'Failed to generate AI response'
      };
    }
  }

  buildSystemPrompt() {
    return `You are a Strategic Procurement AI Assistant for C-suite executives. You provide sophisticated analysis and strategic insights based on procurement data.

Key Capabilities:
- Analyze strategic procurement opportunities from real database queries
- Generate executive-level insights and recommendations
- Create detailed project plans for procurement optimization
- Provide crisis response frameworks and timelines
- Explain complex procurement concepts in business terms

Context: You have access to a Strategic Action Priority Matrix that identifies procurement optimization opportunities across a $516M spend with significant price variance issues requiring immediate attention.

Response Style:
- Executive-level language appropriate for C-suite
- Data-driven insights with specific recommendations
- Clear action items with timelines and savings projections
- Strategic context that ties to business objectives
- Professional formatting with clear sections

Always provide actionable insights, not just data summaries.`;
  }

  buildUserPrompt(userQuery, context) {
    let prompt = `User Query: "${userQuery}"\n\n`;
    
    if (context.databaseResults) {
      prompt += `Database Query Results:\n${JSON.stringify(context.databaseResults, null, 2)}\n\n`;
    }
    
    if (context.queryType) {
      prompt += `Query Type: ${context.queryType}\n\n`;
    }
    
    if (context.additionalContext) {
      prompt += `Additional Context: ${context.additionalContext}\n\n`;
    }
    
    prompt += `Please provide a comprehensive, executive-level response with specific insights and actionable recommendations.`;
    
    return prompt;
  }

  async analyzeQueryIntent(userQuery) {
    const intentPrompt = `Analyze the following procurement query and determine the intent and required data:

Query: "${userQuery}"

Respond with a JSON object containing:
{
  "intent": "explanation|analysis|project_plan|data_query|crisis_response",
  "entities": ["key entities mentioned"],
  "data_needed": ["what database views or tables are needed"],
  "urgency": "low|medium|high|critical",
  "response_type": "text|chart|table|project_plan"
}`;

    try {
      const response = await this.generateResponse(intentPrompt);
      if (response.success) {
        try {
          return JSON.parse(response.response);
        } catch (parseError) {
          // Fallback if JSON parsing fails
          return {
            intent: 'explanation',
            entities: [],
            data_needed: ['strategic_action_priority_matrix'],
            urgency: 'medium',
            response_type: 'text'
          };
        }
      }
    } catch (error) {
      console.error('Intent analysis error:', error);
    }

    // Default fallback
    return {
      intent: 'explanation',
      entities: [],
      data_needed: ['strategic_action_priority_matrix'],
      urgency: 'medium',
      response_type: 'text'
    };
  }
}

export default OpenAIService;