// AI Prompt Templates for Strategic Procurement Domain
// Provides context-specific prompts for different types of queries

export const promptTemplates = {
  
  // System prompt for procurement domain expertise
  systemPrompt: `You are a Strategic Procurement AI Assistant specializing in C-suite executive decision support. You have deep expertise in:

- Strategic procurement optimization and cost reduction
- Vendor relationship management and consolidation  
- Contract negotiation and compliance
- Risk assessment and mitigation strategies
- Crisis response and emergency procurement procedures
- Financial analysis and ROI calculations
- Project management and implementation planning

Your responses should be:
- Executive-level appropriate for C-suite consumption
- Data-driven with specific insights and recommendations
- Actionable with clear next steps and timelines
- Strategic in scope, tying to broader business objectives
- Professional and confident in tone

You have access to real procurement data including spend analysis, vendor performance, contract details, and strategic action priorities.`,

  // Explanation queries
  explanationPrompts: {
    strategicMatrix: `The user is asking about the Strategic Action Priority Matrix. This is a comprehensive framework that:

1. Analyzes price variance across vendors and commodities
2. Identifies strategic priorities based on financial impact and risk
3. Recommends specific actions with timelines
4. Calculates potential savings opportunities
5. Assesses effort levels and resource requirements

Provide a comprehensive explanation that includes:
- What the matrix is and why it's important
- How it identifies priority cases
- The classification system (Critical, High, Medium, Low)
- Strategic implications for the organization
- Connection to the specific data results provided`,

    crisisResponse: `The user is asking about crisis response procedures. Focus on:

1. Immediate actions required (0-30 days)
2. Emergency contract renegotiation procedures
3. Risk mitigation strategies
4. Executive escalation processes
5. Resource allocation and team formation

Include specific timelines, responsible parties, and success metrics.`
  },

  // Project plan generation
  projectPlanPrompts: {
    crisisResponse: `Generate a detailed crisis response project plan that includes:

PHASE 1: IMMEDIATE RESPONSE (Days 1-7)
- Emergency team formation
- Critical vendor identification and outreach
- Contract review and analysis
- Risk assessment and mitigation planning

PHASE 2: STRATEGIC INTERVENTION (Days 8-30)  
- Contract renegotiation execution
- Vendor consolidation activities
- Process implementation
- Performance monitoring setup

Include specific:
- Action items with owners and deadlines
- Resource requirements and budget estimates
- Success metrics and KPIs
- Risk factors and contingency plans
- Executive reporting and governance structure`,

    implementation: `Create a comprehensive implementation roadmap with:

- Multi-phase approach with clear timelines
- Resource allocation and team structure
- Change management considerations
- Technology and process requirements
- Success metrics and ROI projections
- Risk management and contingency planning`
  },

  // Analysis templates
  analysisPrompts: {
    financial: `Provide detailed financial analysis including:

- Current state assessment with key metrics
- Savings opportunity identification and quantification
- ROI calculations and projections
- Investment requirements and payback periods
- Risk-adjusted returns and scenario analysis
- Competitive benchmarking where relevant`,

    vendor: `Conduct comprehensive vendor analysis covering:

- Performance assessment and scoring
- Strategic value evaluation
- Risk profile and mitigation strategies
- Consolidation opportunities
- Contract optimization recommendations
- Relationship management strategies`
  },

  // Response formatting guidelines
  formatting: {
    executive: `Format responses for executive consumption:

- Lead with key insights and recommendations
- Use clear section headers and bullet points
- Include specific numbers and percentages
- Highlight critical actions and deadlines
- Provide clear next steps and ownership
- Use professional business language`,

    technical: `Format responses with technical depth:

- Include methodology and assumptions
- Show calculations and data sources
- Provide detailed implementation steps
- Include risk factors and dependencies
- Reference specific database queries and results`
  }
};

// Context builders for different query types
export const contextBuilders = {
  
  buildStrategicContext: (databaseResults) => {
    if (!databaseResults?.data) return '';
    
    const data = databaseResults.data;
    const totalCases = data.length;
    const totalSavings = data.reduce((sum, item) => sum + (item.total_savings_opportunity || 0), 0);
    
    return `
Strategic Context:
- ${totalCases} strategic cases identified
- $${(totalSavings / 1000000).toFixed(1)}M in potential savings
- Cases span ${data.map(d => d.strategic_priority).filter((v, i, a) => a.indexOf(v) === i).join(', ')} priorities
- Database query returned comprehensive strategic analysis data
`;
  },

  buildCrisisContext: (databaseResults) => {
    if (!databaseResults?.data) return '';
    
    const criticalCases = databaseResults.data.filter(d => d.strategic_priority === 'CRITICAL');
    const immediateCases = databaseResults.data.filter(d => d.recommended_timeline === '0-30 days');
    
    return `
Crisis Response Context:
- ${criticalCases.length} critical cases requiring immediate attention
- ${immediateCases.length} cases need action within 30 days
- Crisis response procedures should be activated immediately
- Executive intervention required for successful resolution
`;
  }
};

// Query enhancement patterns
export const queryEnhancements = {
  
  addExecutiveContext: (query) => {
    return `${query}

Please provide an executive-level response appropriate for C-suite consumption, including:
- Strategic implications and business impact
- Specific recommendations with timelines
- Resource requirements and investment needed
- Success metrics and expected outcomes
- Risk factors and mitigation strategies`;
  },

  addDataContext: (query, databaseResults) => {
    return `${query}

Based on the following data analysis:
${JSON.stringify(databaseResults, null, 2)}

Please provide insights that:
- Interpret the data in business terms
- Identify key patterns and anomalies
- Recommend specific actions based on findings
- Quantify potential business impact`;
  }
};

export default promptTemplates;