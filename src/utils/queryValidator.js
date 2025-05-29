// Query Validation and Security Utilities
// Prevents malicious queries and ensures data security

class QueryValidator {
  constructor() {
    // Dangerous SQL keywords that should be blocked
    this.dangerousKeywords = [
      'DROP', 'DELETE', 'INSERT', 'UPDATE', 'ALTER', 'CREATE', 
      'TRUNCATE', 'EXEC', 'EXECUTE', 'UNION', 'SCRIPT', 'JAVASCRIPT',
      'VBSCRIPT', 'ONLOAD', 'ONERROR', 'ONCLICK'
    ];

    // Maximum query length
    this.maxQueryLength = 1000;
    
    // Rate limiting (queries per minute per session)
    this.rateLimitPerMinute = 30;
    this.queryHistory = new Map();
  }

  // Validate user input query
  validateUserQuery(query, sessionId = 'default') {
    const validation = {
      isValid: true,
      errors: [],
      warnings: [],
      sanitizedQuery: query
    };

    // Check query length
    if (query.length > this.maxQueryLength) {
      validation.isValid = false;
      validation.errors.push(`Query too long. Maximum ${this.maxQueryLength} characters allowed.`);
    }

    // Check for empty query
    if (!query.trim()) {
      validation.isValid = false;
      validation.errors.push('Query cannot be empty.');
    }

    // Check rate limiting
    const rateCheck = this.checkRateLimit(sessionId);
    if (!rateCheck.allowed) {
      validation.isValid = false;
      validation.errors.push(`Rate limit exceeded. Please wait ${rateCheck.waitTime} seconds.`);
    }

    // Check for dangerous keywords
    const dangerousCheck = this.checkDangerousKeywords(query);
    if (!dangerousCheck.safe) {
      validation.isValid = false;
      validation.errors.push(`Query contains potentially dangerous content: ${dangerousCheck.keywords.join(', ')}`);
    }

    // Sanitize query
    validation.sanitizedQuery = this.sanitizeQuery(query);

    // Add warnings for complex queries
    if (query.length > 500) {
      validation.warnings.push('Long query detected. Consider breaking into smaller questions.');
    }

    return validation;
  }

  // Check for dangerous SQL keywords
  checkDangerousKeywords(query) {
    const upperQuery = query.toUpperCase();
    const foundKeywords = this.dangerousKeywords.filter(keyword => 
      upperQuery.includes(keyword)
    );

    return {
      safe: foundKeywords.length === 0,
      keywords: foundKeywords
    };
  }

  // Rate limiting check
  checkRateLimit(sessionId) {
    const now = Date.now();
    const oneMinuteAgo = now - 60000; // 60 seconds

    // Get query history for this session
    if (!this.queryHistory.has(sessionId)) {
      this.queryHistory.set(sessionId, []);
    }

    const sessionHistory = this.queryHistory.get(sessionId);
    
    // Remove queries older than 1 minute
    const recentQueries = sessionHistory.filter(timestamp => timestamp > oneMinuteAgo);
    this.queryHistory.set(sessionId, recentQueries);

    // Check if rate limit exceeded
    if (recentQueries.length >= this.rateLimitPerMinute) {
      const oldestQuery = Math.min(...recentQueries);
      const waitTime = Math.ceil((oldestQuery + 60000 - now) / 1000);
      
      return {
        allowed: false,
        waitTime: waitTime,
        queriesInLastMinute: recentQueries.length
      };
    }

    // Add current query to history
    recentQueries.push(now);
    this.queryHistory.set(sessionId, recentQueries);

    return {
      allowed: true,
      queriesInLastMinute: recentQueries.length
    };
  }

  // Basic query sanitization
  sanitizeQuery(query) {
    return query
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/['"`;]/g, '') // Remove SQL-dangerous characters
      .replace(/\s+/g, ' '); // Normalize whitespace
  }

  // Validate database query parameters
  validateDatabaseFilters(filters) {
    const validation = {
      isValid: true,
      errors: [],
      sanitizedFilters: {}
    };

    // Validate allowed filter keys
    const allowedFilters = [
      'priority', 'timeline', 'riskLevel', 'minSavings', 
      'maxSavings', 'limit', 'vendor', 'commodity'
    ];

    for (const [key, value] of Object.entries(filters)) {
      if (!allowedFilters.includes(key)) {
        validation.errors.push(`Invalid filter: ${key}`);
        continue;
      }

      // Validate filter values
      switch (key) {
        case 'priority':
          if (!['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].includes(value)) {
            validation.errors.push(`Invalid priority value: ${value}`);
          } else {
            validation.sanitizedFilters[key] = value;
          }
          break;

        case 'timeline':
          const validTimelines = ['0-30 days', '30-60 days', '60-90 days', '90+ days'];
          if (!validTimelines.includes(value)) {
            validation.errors.push(`Invalid timeline value: ${value}`);
          } else {
            validation.sanitizedFilters[key] = value;
          }
          break;

        case 'limit':
          const numValue = parseInt(value);
          if (isNaN(numValue) || numValue < 1 || numValue > 100) {
            validation.errors.push('Limit must be between 1 and 100');
          } else {
            validation.sanitizedFilters[key] = numValue;
          }
          break;

        case 'minSavings':
        case 'maxSavings':
          const savingsValue = parseFloat(value);
          if (isNaN(savingsValue) || savingsValue < 0) {
            validation.errors.push(`Invalid savings value: ${value}`);
          } else {
            validation.sanitizedFilters[key] = savingsValue;
          }
          break;

        default:
          // String values - sanitize
          validation.sanitizedFilters[key] = this.sanitizeQuery(String(value));
      }
    }

    validation.isValid = validation.errors.length === 0;
    return validation;
  }

  // Log security events
  logSecurityEvent(event, sessionId, details = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event: event,
      sessionId: sessionId,
      details: details
    };

    console.warn('Security Event:', logEntry);
    
    // In production, this would send to a security monitoring system
    // this.sendToSecurityMonitoring(logEntry);
  }

  // Clear old query history (cleanup)
  cleanup() {
    const oneHourAgo = Date.now() - 3600000; // 1 hour
    
    for (const [sessionId, queries] of this.queryHistory.entries()) {
      const recentQueries = queries.filter(timestamp => timestamp > oneHourAgo);
      
      if (recentQueries.length === 0) {
        this.queryHistory.delete(sessionId);
      } else {
        this.queryHistory.set(sessionId, recentQueries);
      }
    }
  }
}

// Response cache for performance optimization
class ResponseCache {
  constructor() {
    this.cache = new Map();
    this.maxCacheSize = 100;
    this.cacheExpiryTime = 300000; // 5 minutes
  }

  // Generate cache key from query
  generateCacheKey(query, filters = {}) {
    const normalizedQuery = query.toLowerCase().trim();
    const filterString = JSON.stringify(filters);
    return `${normalizedQuery}_${filterString}`;
  }

  // Get cached response
  get(query, filters = {}) {
    const key = this.generateCacheKey(query, filters);
    const cached = this.cache.get(key);

    if (!cached) return null;

    // Check if cache entry has expired
    if (Date.now() - cached.timestamp > this.cacheExpiryTime) {
      this.cache.delete(key);
      return null;
    }

    return cached.response;
  }

  // Set cached response
  set(query, filters = {}, response) {
    const key = this.generateCacheKey(query, filters);

    // Remove oldest entries if cache is full
    if (this.cache.size >= this.maxCacheSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      response: response,
      timestamp: Date.now()
    });
  }

  // Clear expired entries
  cleanup() {
    const now = Date.now();
    
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.cacheExpiryTime) {
        this.cache.delete(key);
      }
    }
  }
}

// Export utilities
export { QueryValidator, ResponseCache };
export default QueryValidator;