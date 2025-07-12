#!/usr/bin/env node

/**
 * Claude-Flow Enhanced v3.0 - Advanced Context Memory System
 * Cross-project learning with semantic search and relationship mapping
 */

const fs = require('fs');
const path = require('path');

class EnhancedContextMemory {
  constructor() {
    this.memoryStore = new Map();
    this.relationships = new Map();
    this.semanticIndex = new Map();
    this.projectContexts = new Map();
    this.learningPatterns = new Map();
    this.temporalMemory = new Map();
    this.crossProjectInsights = new Map();
    this.memoryMetrics = {
      totalEntries: 0,
      relationshipCount: 0,
      crossProjectConnections: 0,
      learningEfficiency: 0
    };
  }

  // Enhanced memory storage with semantic analysis
  store(key, value, metadata = {}) {
    const timestamp = Date.now();
    const memoryEntry = {
      key,
      value,
      metadata: {
        ...metadata,
        timestamp,
        accessCount: 0,
        lastAccessed: timestamp,
        projectId: metadata.projectId || 'global',
        category: metadata.category || 'general',
        importance: metadata.importance || 0.5,
        source: metadata.source || 'user',
        tags: metadata.tags || [],
        version: 1
      },
      semanticFeatures: this.extractSemanticFeatures(value),
      contextSignature: this.generateContextSignature(key, value, metadata)
    };

    // Store in main memory
    this.memoryStore.set(key, memoryEntry);
    
    // Update semantic index
    this.updateSemanticIndex(key, memoryEntry);
    
    // Update project context
    this.updateProjectContext(memoryEntry);
    
    // Identify and create relationships
    this.identifyRelationships(key, memoryEntry);
    
    // Check for cross-project patterns
    this.analyzeForCrossProjectPatterns(memoryEntry);
    
    // Update metrics
    this.updateMetrics();
    
    console.log(`💾 Enhanced memory stored: ${key}`);
    console.log(`   Project: ${memoryEntry.metadata.projectId}`);
    console.log(`   Semantic features: ${memoryEntry.semanticFeatures.length}`);
    
    return memoryEntry;
  }

  // Retrieve with enhanced context and learning
  get(key, context = {}) {
    const entry = this.memoryStore.get(key);
    
    if (!entry) {
      // Try semantic search as fallback
      const semanticResults = this.semanticSearch(key, 1);
      if (semanticResults.length > 0) {
        console.log(`🔍 Semantic fallback found for: ${key}`);
        return this.enhanceRetrievalWithContext(semanticResults[0], context);
      }
      return null;
    }

    // Update access patterns
    entry.metadata.accessCount++;
    entry.metadata.lastAccessed = Date.now();
    
    // Enhance retrieval with context
    return this.enhanceRetrievalWithContext(entry, context);
  }

  // Enhance retrieval with contextual information
  enhanceRetrievalWithContext(entry, context) {
    const enhanced = {
      ...entry,
      contextualInsights: this.generateContextualInsights(entry, context),
      relatedMemories: this.getRelatedMemories(entry.key, 5),
      crossProjectLearnings: this.getCrossProjectLearnings(entry),
      usagePatterns: this.getUsagePatterns(entry),
      recommendations: this.generateRecommendations(entry, context)
    };

    // Learn from this retrieval
    this.learnFromRetrieval(entry, context);
    
    return enhanced;
  }

  // Advanced semantic search
  semanticSearch(query, limit = 10, filters = {}) {
    const queryFeatures = this.extractSemanticFeatures(query);
    const results = [];

    for (const [key, entry] of this.memoryStore) {
      // Apply filters
      if (!this.passesFilters(entry, filters)) continue;
      
      // Calculate semantic similarity
      const similarity = this.calculateSemanticSimilarity(queryFeatures, entry.semanticFeatures);
      
      if (similarity > 0.3) { // Threshold for relevance
        results.push({
          key,
          entry,
          similarity,
          relevanceScore: this.calculateRelevanceScore(entry, query, filters)
        });
      }
    }

    // Sort by combined similarity and relevance
    results.sort((a, b) => {
      const scoreA = (a.similarity * 0.7) + (a.relevanceScore * 0.3);
      const scoreB = (b.similarity * 0.7) + (b.relevanceScore * 0.3);
      return scoreB - scoreA;
    });

    return results.slice(0, limit).map(result => ({
      ...result.entry,
      matchScore: result.similarity,
      relevanceScore: result.relevanceScore
    }));
  }

  // Create and manage relationships between memories
  relate(key1, key2, relationshipType, strength = 0.5, metadata = {}) {
    const relationshipId = `${key1}:${relationshipType}:${key2}`;
    
    const relationship = {
      id: relationshipId,
      source: key1,
      target: key2,
      type: relationshipType,
      strength,
      metadata: {
        ...metadata,
        created: Date.now(),
        accessCount: 0,
        lastAccessed: null,
        bidirectional: metadata.bidirectional || false
      },
      learningHistory: []
    };

    this.relationships.set(relationshipId, relationship);
    
    // Create reverse relationship if bidirectional
    if (relationship.metadata.bidirectional) {
      const reverseId = `${key2}:${relationshipType}:${key1}`;
      this.relationships.set(reverseId, {
        ...relationship,
        id: reverseId,
        source: key2,
        target: key1
      });
    }

    // Update relationship indexes
    this.updateRelationshipIndexes(relationship);
    
    console.log(`🔗 Relationship created: ${key1} ${relationshipType} ${key2} (${strength})`);
    
    return relationship;
  }

  // Get memories related to a key
  getRelatedMemories(key, limit = 10, minStrength = 0.2) {
    const related = [];
    
    for (const [relId, relationship] of this.relationships) {
      if (relationship.source === key && relationship.strength >= minStrength) {
        const targetEntry = this.memoryStore.get(relationship.target);
        if (targetEntry) {
          related.push({
            memory: targetEntry,
            relationship,
            relevanceScore: this.calculateRelationshipRelevance(relationship)
          });
        }
      }
    }

    // Sort by relevance and strength
    related.sort((a, b) => {
      const scoreA = (a.relationship.strength * 0.6) + (a.relevanceScore * 0.4);
      const scoreB = (b.relationship.strength * 0.6) + (b.relevanceScore * 0.4);
      return scoreB - scoreA;
    });

    return related.slice(0, limit);
  }

  // Analyze for cross-project learning opportunities
  analyzeForCrossProjectPatterns(newEntry) {
    const projectId = newEntry.metadata.projectId;
    const category = newEntry.metadata.category;
    
    // Find similar patterns in other projects
    const crossProjectMatches = [];
    
    for (const [key, entry] of this.memoryStore) {
      if (entry.metadata.projectId !== projectId && 
          entry.metadata.category === category) {
        
        const similarity = this.calculateSemanticSimilarity(
          newEntry.semanticFeatures, 
          entry.semanticFeatures
        );
        
        if (similarity > 0.6) {
          crossProjectMatches.push({
            key,
            entry,
            similarity,
            project: entry.metadata.projectId
          });
        }
      }
    }

    // Create cross-project insights
    if (crossProjectMatches.length > 0) {
      this.createCrossProjectInsight(newEntry, crossProjectMatches);
    }
  }

  // Create cross-project learning insight
  createCrossProjectInsight(sourceEntry, matches) {
    const insightId = `crossproject-${Date.now()}`;
    
    const insight = {
      id: insightId,
      type: 'cross_project_pattern',
      sourceEntry: sourceEntry.key,
      sourceProject: sourceEntry.metadata.projectId,
      matches: matches.map(match => ({
        key: match.key,
        project: match.project,
        similarity: match.similarity
      })),
      pattern: this.extractCommonPattern(sourceEntry, matches),
      confidence: this.calculatePatternConfidence(matches),
      applications: [],
      learningValue: this.calculateLearningValue(sourceEntry, matches),
      created: Date.now()
    };

    this.crossProjectInsights.set(insightId, insight);
    
    console.log(`🌐 Cross-project insight created: ${insightId}`);
    console.log(`   Pattern found across ${matches.length + 1} projects`);
    console.log(`   Confidence: ${(insight.confidence * 100).toFixed(1)}%`);
    
    return insight;
  }

  // Learn from memory access patterns
  learnFromRetrieval(entry, context) {
    const learningKey = `${entry.metadata.category}_${entry.metadata.projectId}`;
    
    if (!this.learningPatterns.has(learningKey)) {
      this.learningPatterns.set(learningKey, {
        accessCount: 0,
        contextPatterns: new Map(),
        temporalPatterns: [],
        effectivenessScores: []
      });
    }

    const learning = this.learningPatterns.get(learningKey);
    learning.accessCount++;
    
    // Track context patterns
    const contextHash = this.hashContext(context);
    const contextPattern = learning.contextPatterns.get(contextHash) || { count: 0, contexts: [] };
    contextPattern.count++;
    contextPattern.contexts.push(context);
    learning.contextPatterns.set(contextHash, contextPattern);
    
    // Track temporal patterns
    learning.temporalPatterns.push({
      timestamp: Date.now(),
      hour: new Date().getHours(),
      dayOfWeek: new Date().getDay(),
      context: contextHash
    });
    
    // Analyze and update learning efficiency
    this.updateLearningEfficiency(learningKey, learning);
  }

  // Get cross-project learnings for a memory
  getCrossProjectLearnings(entry) {
    const learnings = [];
    
    for (const [insightId, insight] of this.crossProjectInsights) {
      if (insight.sourceEntry === entry.key || 
          insight.matches.some(match => match.key === entry.key)) {
        
        learnings.push({
          insight,
          applicability: this.calculateApplicability(entry, insight),
          recommendations: this.generateCrossProjectRecommendations(entry, insight)
        });
      }
    }

    return learnings.sort((a, b) => b.applicability - a.applicability);
  }

  // Generate contextual insights for retrieval
  generateContextualInsights(entry, context) {
    const insights = [];
    
    // Usage pattern insights
    const usageInsights = this.analyzeUsagePatterns(entry);
    insights.push(...usageInsights);
    
    // Temporal insights
    const temporalInsights = this.analyzeTemporalPatterns(entry);
    insights.push(...temporalInsights);
    
    // Relationship insights
    const relationshipInsights = this.analyzeRelationshipPatterns(entry);
    insights.push(...relationshipInsights);
    
    // Context-specific insights
    const contextInsights = this.analyzeContextSpecificPatterns(entry, context);
    insights.push(...contextInsights);
    
    return insights;
  }

  // Generate recommendations based on memory and context
  generateRecommendations(entry, context) {
    const recommendations = [];
    
    // Cross-project application recommendations
    const crossProjectRecs = this.generateCrossProjectApplications(entry);
    recommendations.push(...crossProjectRecs);
    
    // Optimization recommendations
    const optimizationRecs = this.generateOptimizationRecommendations(entry);
    recommendations.push(...optimizationRecs);
    
    // Learning recommendations
    const learningRecs = this.generateLearningRecommendations(entry, context);
    recommendations.push(...learningRecs);
    
    return recommendations.sort((a, b) => b.priority - a.priority);
  }

  // Export enhanced memory for analysis
  export(format = 'json', filters = {}) {
    const exportData = {
      metadata: {
        timestamp: new Date().toISOString(),
        version: '3.0.0',
        totalEntries: this.memoryStore.size,
        relationships: this.relationships.size,
        crossProjectInsights: this.crossProjectInsights.size,
        filters
      },
      memories: [],
      relationships: [],
      insights: [],
      patterns: [],
      metrics: this.memoryMetrics
    };

    // Export filtered memories
    for (const [key, entry] of this.memoryStore) {
      if (this.passesFilters(entry, filters)) {
        exportData.memories.push({
          key,
          ...entry,
          enhancedMetrics: this.calculateEntryMetrics(entry)
        });
      }
    }

    // Export relationships
    for (const [id, relationship] of this.relationships) {
      exportData.relationships.push(relationship);
    }

    // Export cross-project insights
    for (const [id, insight] of this.crossProjectInsights) {
      exportData.insights.push(insight);
    }

    // Export learning patterns
    for (const [pattern, data] of this.learningPatterns) {
      exportData.patterns.push({ pattern, data });
    }

    if (format === 'json') {
      return JSON.stringify(exportData, null, 2);
    }
    
    return exportData;
  }

  // Calculate memory statistics
  getStats() {
    const stats = {
      overview: {
        totalMemories: this.memoryStore.size,
        totalRelationships: this.relationships.size,
        crossProjectInsights: this.crossProjectInsights.size,
        learningPatterns: this.learningPatterns.size,
        averageAccessCount: this.calculateAverageAccessCount()
      },
      projects: this.getProjectStats(),
      categories: this.getCategoryStats(),
      relationships: this.getRelationshipStats(),
      learning: this.getLearningStats(),
      temporal: this.getTemporalStats()
    };

    return stats;
  }

  // Placeholder implementations for complex methods
  extractSemanticFeatures(text) {
    // Simple implementation - in production, use proper NLP
    const words = String(text).toLowerCase().split(/\W+/).filter(w => w.length > 2);
    return [...new Set(words)].slice(0, 20); // Top 20 unique words
  }

  calculateSemanticSimilarity(features1, features2) {
    const set1 = new Set(features1);
    const set2 = new Set(features2);
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return union.size > 0 ? intersection.size / union.size : 0;
  }

  generateContextSignature(key, value, metadata) {
    return `${metadata.projectId || 'global'}_${metadata.category || 'general'}_${typeof value}`;
  }

  updateSemanticIndex(key, entry) {
    entry.semanticFeatures.forEach(feature => {
      if (!this.semanticIndex.has(feature)) {
        this.semanticIndex.set(feature, new Set());
      }
      this.semanticIndex.get(feature).add(key);
    });
  }

  updateProjectContext(entry) {
    const projectId = entry.metadata.projectId;
    if (!this.projectContexts.has(projectId)) {
      this.projectContexts.set(projectId, {
        entries: new Set(),
        categories: new Set(),
        patterns: new Map(),
        metrics: {}
      });
    }
    
    const context = this.projectContexts.get(projectId);
    context.entries.add(entry.key);
    context.categories.add(entry.metadata.category);
  }

  identifyRelationships(key, entry) {
    // Find similar entries and create relationships
    const similarEntries = this.findSimilarEntries(entry, 0.7);
    
    similarEntries.forEach(similar => {
      if (similar.key !== key) {
        this.relate(key, similar.key, 'similar', similar.similarity, {
          autoGenerated: true,
          confidence: similar.similarity
        });
      }
    });
  }

  findSimilarEntries(entry, threshold = 0.5) {
    const similar = [];
    
    for (const [key, otherEntry] of this.memoryStore) {
      if (key === entry.key) continue;
      
      const similarity = this.calculateSemanticSimilarity(
        entry.semanticFeatures,
        otherEntry.semanticFeatures
      );
      
      if (similarity >= threshold) {
        similar.push({ key, entry: otherEntry, similarity });
      }
    }
    
    return similar;
  }

  updateMetrics() {
    this.memoryMetrics.totalEntries = this.memoryStore.size;
    this.memoryMetrics.relationshipCount = this.relationships.size;
    this.memoryMetrics.crossProjectConnections = this.crossProjectInsights.size;
    this.memoryMetrics.learningEfficiency = this.calculateOverallLearningEfficiency();
  }

  // Additional placeholder methods for completeness
  passesFilters(entry, filters) { return true; }
  calculateRelevanceScore(entry, query, filters) { return 0.5; }
  updateRelationshipIndexes(relationship) { }
  calculateRelationshipRelevance(relationship) { return 0.5; }
  extractCommonPattern(sourceEntry, matches) { return { type: 'common_pattern' }; }
  calculatePatternConfidence(matches) { return 0.8; }
  calculateLearningValue(sourceEntry, matches) { return 0.7; }
  hashContext(context) { return JSON.stringify(context); }
  updateLearningEfficiency(key, learning) { }
  calculateApplicability(entry, insight) { return 0.6; }
  generateCrossProjectRecommendations(entry, insight) { return []; }
  analyzeUsagePatterns(entry) { return []; }
  analyzeTemporalPatterns(entry) { return []; }
  analyzeRelationshipPatterns(entry) { return []; }
  analyzeContextSpecificPatterns(entry, context) { return []; }
  generateCrossProjectApplications(entry) { return []; }
  generateOptimizationRecommendations(entry) { return []; }
  generateLearningRecommendations(entry, context) { return []; }
  calculateEntryMetrics(entry) { return {}; }
  calculateAverageAccessCount() { return 0; }
  getProjectStats() { return {}; }
  getCategoryStats() { return {}; }
  getRelationshipStats() { return {}; }
  getLearningStats() { return {}; }
  getTemporalStats() { return {}; }
  calculateOverallLearningEfficiency() { return 0.8; }
  getUsagePatterns(entry) { return []; }

  // Fix cross-project learning method
  getCrossProjectLearnings(entry) {
    const learnings = [];
    
    for (const [insightId, insight] of this.crossProjectInsights) {
      if (insight.sourceEntry === entry.key || 
          insight.matches.some(match => match.key === entry.key)) {
        
        learnings.push({
          insight,
          applicability: this.calculateApplicability(entry, insight),
          recommendations: this.generateCrossProjectRecommendations(entry, insight)
        });
      }
    }

    return learnings.sort((a, b) => b.applicability - a.applicability);
  }
}

// CLI Interface
async function main() {
  const command = process.argv[2];
  const memory = new EnhancedContextMemory();

  switch (command) {
    case 'store':
      const key = process.argv[3];
      const value = process.argv[4];
      const projectId = process.argv[5];
      memory.store(key, value, { projectId, category: 'cli' });
      break;
    
    case 'get':
      const getKey = process.argv[3];
      const result = memory.get(getKey);
      console.log(JSON.stringify(result, null, 2));
      break;
    
    case 'search':
      const query = process.argv.slice(3).join(' ');
      const results = memory.semanticSearch(query);
      console.log('🔍 Search Results:');
      results.forEach((result, index) => {
        console.log(`${index + 1}. ${result.key} (score: ${result.matchScore.toFixed(2)})`);
      });
      break;
    
    case 'relate':
      const key1 = process.argv[3];
      const key2 = process.argv[4];
      const relType = process.argv[5] || 'related';
      memory.relate(key1, key2, relType);
      break;
    
    case 'stats':
      const stats = memory.getStats();
      console.log(JSON.stringify(stats, null, 2));
      break;
    
    case 'export':
      const exportFormat = process.argv[3] || 'json';
      const exported = memory.export(exportFormat);
      console.log(exported);
      break;
    
    default:
      console.log(`
🧠 Enhanced Context Memory System

Commands:
  store <key> <value> [project]  Store memory with metadata
  get <key>                      Retrieve memory with context
  search <query>                 Semantic search
  relate <key1> <key2> [type]    Create relationship
  stats                          Show memory statistics
  export [format]                Export memory data

Example:
  enhanced-context-memory.js store "api_design" "REST with JWT auth" "ecommerce"
  enhanced-context-memory.js search "authentication patterns"
      `);
  }
}

// Export for module usage
module.exports = EnhancedContextMemory;

// Run CLI if called directly
if (require.main === module) {
  main().catch(console.error);
}